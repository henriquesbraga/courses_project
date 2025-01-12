import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          py: 4,
          px: 3,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          Cadastre-se
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
          {/* Campo Nome */}
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Campo E-mail */}
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Campo Senha com Ícone de Mostrar/Ocultar */}
          <TextField
            fullWidth
            label="Senha"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Botão de Registro */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          >
            Registrar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
