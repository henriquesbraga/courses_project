import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface CourseApiResponse {
  title: string;
  description: string;
  hours: number;
  image?: string; // Opcional: imagem do curso
}

interface CourseCardProps {
  course: CourseApiResponse;
  renderButton: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, renderButton }) => (
  <Card
    variant="outlined"
    sx={{
      maxWidth: { xs: "100%", sm: 350 },
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
      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        {course.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: 14, color: "text.secondary" }}
        >
          Carga horária: {course.hours} hora(s)
        </Typography>
      </Box>
    </CardContent>

    {renderButton && (
      <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Matricular
        </Button>
      </CardActions>
    )}
  </Card>
);

export default CourseCard;
