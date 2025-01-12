import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Cor principal (azul)
    },
    secondary: {
      main: "#ff4081", // Cor secundária (rosa)
    },
    error: {
      main: "#d32f2f", // Cor de erro
    },
    background: {
      default: "#f5f5f5", // Fundo padrão
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  spacing: 8, // Espaçamento padrão em múltiplos de 8px
});

export default appTheme;
