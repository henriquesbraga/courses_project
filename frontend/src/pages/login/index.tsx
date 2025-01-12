import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router";
import { api } from "../../config/api";
import { useUserData } from "../../context/user-context";
import { isValidEmail } from "../../utils/validators";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setUserData } = useUserData();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password ) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if(!isValidEmail(email)) {
      setError("Corrija o email!")
      setLoading(false);
      return;
    }


    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.status != 200) {
        setError(response.data.message);
        return;
      }

      const { data } = response;
      console.log(data);
    } catch (err: any) {
      console.log(err)
      setError(err.response.data.message);
    } finally {
      setLoading(false);
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
        minHeight: "100vh", // Altura total da viewport
        backgroundColor: "#f5f5f5", // Fundo claro
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
            loading={loading}
            disabled={password.length < 6}
          >
            Entrar
          </LoadingButton>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" mt={1}>
            Não tem uma conta?{" "}
            <Link to="/register" color="secondary">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
