import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";



interface UserWithCourseCardProps {
  user: UserWithCourse;
}

const UserWithCourseCard: React.FC<UserWithCourseCardProps> = ({ user }) => (
  <Card
    variant="outlined"
    sx={{
      maxWidth: { xs: "100%", sm: 400 },
      width: "100%",
      borderRadius: 2,
      boxShadow: 1,
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: 3,
      },
    }}
  >
    <CardContent>
      {/* User Information */}
      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {user.name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, mb: 1 }}
      >
        Email: {user.email}
      </Typography>

      <Typography
        variant="caption"
        sx={{ fontSize: 14, color: "text.secondary" }}
      >
        Usuário desde: {user.created_at}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Courses Section */}
      {user.courses.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {user.courses.map((course) => (
            <Box
              key={course.id}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {course.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>

              <Typography
                variant="caption"
                sx={{ fontSize: 14, color: "text.secondary" }}
              >
                Data da matrícula: {course.enrolled_at}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 2 }}
        >
          Nenhum curso matriculado.
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default UserWithCourseCard;
