import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  createCourse
} from "../../repositories/course-repository";
import { useUserData } from "../../context/user-context";

interface RegisterCourseModalProps {
  onClose: (data: CourseApiResponse) => void;
}

const RegisterCourseModal = ({ onClose }: RegisterCourseModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "30%" },
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 2,
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    hours: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    hours: false,
  });

  const { userData } = useUserData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors = {
      title: !form.title.trim(),
      description: !form.description.trim(),
      hours: !/^\d+$/.test(form.hours), // Verifica se é um número inteiro não negativo
    };

    setErrors(newErrors);

    // Verifica se há algum erro antes de enviar
    if (!Object.values(newErrors).some((err) => err)) {
      try {
        const data = await createCourse(userData.token!, {
          title: form.title,
          description: form.description,
          hours: Number(form.hours),
        });

        if (data) {
          onClose(data);
        }
      } catch (err: any) {
        setErrors(err);
      }
    }
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cadastro de Curso
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Preencha os dados abaixo para cadastrar um novo curso.
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          helperText={errors.title && "O título é obrigatório."}
          fullWidth
        />
        <TextField
          label="Descrição"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          helperText={errors.description && "A descrição é obrigatória."}
          fullWidth
          multiline
          rows={3} // Permite múltiplas linhas
        />
        <TextField
          label="Carga Horária"
          name="hours"
          value={form.hours}
          onChange={handleChange}
          error={errors.hours}
          helperText={errors.hours && "Informe um número"}
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cadastrar Curso
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterCourseModal;
