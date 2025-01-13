import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface CourseCardProps {
  course: CourseApiResponse;
  renderButton: boolean;
  onButtonPress?: (courseId: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  renderButton,
  onButtonPress,
}) => (
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

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
        {course.description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Transforma em coluna
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: 14, color: "text.secondary" }}
        >
          Carga horária: {course.hours} hora(s)
        </Typography>

        {course.enrolled_at && (
          <Typography
            variant="caption"
            sx={{ fontSize: 14, color: "text.secondary" }}
          >
            Data da matrícula: {course.enrolled_at}
          </Typography>
        )}
      </Box>
    </CardContent>

    {renderButton && (
      <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", width: "100%" }}
          onClick={() => {
            onButtonPress!(course.id!);
          }}
        >
          Matricular
        </Button>
      </CardActions>
    )}
  </Card>
);

export default CourseCard;
