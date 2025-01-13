import { useEffect, useState } from "react";
import { useUserData } from "../../context/user-context";
import {
  enrollUserToACourse,
  getAllCourses,
} from "../../repositories/course-repository";
import { Shimmer } from "react-shimmer";
import { Box, Container, Fab, Modal } from "@mui/material";
import CourseCard from "../../components/course-card";
import { Add } from "@mui/icons-material";
import RegisterCourseModal from "./register-course-modal";
import { toast } from "sonner";

const AvailableCourses = () => {
  const { userData } = useUserData();
  const [availableCourses, setAvailableCourses] =
    useState<CourseApiResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function fetchCourses() {
    try {
      setLoading(true);
      const data = await getAllCourses(userData.token!);
      setAvailableCourses(data);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      if (userData.token) await fetchCourses();
    })();
  }, []);

  async function enrollUser(courseId: number) {
    try {
      const result = await enrollUserToACourse(userData.token!, {
        userId: userData.id!,
        courseId,
      });

      toast.success(result);
    } catch (err: any) {
      console.log("err123", err);
      toast.error(err);
    }
  }

  return (
    <Container>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <RegisterCourseModal
          onClose={(data: CourseApiResponse) => {
            setOpen(false);
            setAvailableCourses((prev) => [...prev!, data]);
            toast.success("Curso criado com sucesso!");
          }}
        />
      </Modal>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center", // Centraliza os itens no eixo principal
          gap: 3, // Adiciona padding ao contêiner
        }}
      >
        {loading ? (
          <Box>
            <Shimmer width={300} height={200} />
            <Shimmer width={300} height={200} />
            <Shimmer width={300} height={200} />
          </Box>
        ) : (
          <>
            {availableCourses?.map((e, i) => (
              <CourseCard
                course={e}
                renderButton={true}
                key={i}
                onButtonPress={(courseId: number) => enrollUser(courseId)}
              />
            ))}
          </>
        )}
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default AvailableCourses;
