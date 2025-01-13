import { useEffect, useState } from "react";
import { useUserData } from "../../context/user-context";
import { getUserCourses } from "../../repositories/course-repository";
import { Shimmer } from "react-shimmer";
import { Box, Container } from "@mui/material";
import CourseCard from "../../components/course-card";

const MyCourses = () => {
  const { userData } = useUserData();
  const [userCourses, setUserCourses] = useState<CourseApiResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setError] = useState<string>("");

  async function fetchCourses() {
    try {
      setLoading(true);
      const data = await getUserCourses(userData.token!, userData.id!);
      setUserCourses(data);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      if (userData.id && userData.token) await fetchCourses();
    })();
  }, []);

  return (
    <Container>
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
            {userCourses?.map((e, i) => (
              <CourseCard course={e} renderButton={false} key={i} />
            ))}
          </>
        )}
      </Box>
    </Container>
  );
};

export default MyCourses;
