import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Shimmer } from "react-shimmer";
import { useUserData } from "../../context/user-context";
import { getAllUsersWithHisCourses } from "../../repositories/course-repository";
import UserWithCourseCard from "../../components/user-with-course-card";

const AllUsers = () => {
  const { userData } = useUserData();
  const [usersWithCourses, setUsersWithCourses] = useState<UserWithCourse[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const [_, setError] = useState<string>("");

  async function fetchCourses() {
    try {
      setLoading(true);
      const data = await getAllUsersWithHisCourses(userData.token!);
      setUsersWithCourses(data);
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
            {usersWithCourses?.map((e, i) => (
              <UserWithCourseCard user={e} key={i} />
            ))}
          </>
        )}
      </Box>
    </Container>
  );
};

export default AllUsers;
