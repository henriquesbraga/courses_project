import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { Menu, Home, Article, Logout, SupervisorAccount } from "@mui/icons-material";
import { useUserData } from "../../context/user-context";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";


const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userData, clearUserData } = useUserData();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Obter o caminho atual
  const [title, setTitle] = useState<string>("Cursos");

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };


  const handleNavigation = (path: string, newTitle: string) => {
    navigate(path);
    setTitle(newTitle);
    toggleDrawer(false);
  };

  // Atualiza o título com base na rota atual
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/my-courses":
        setTitle("Meus Cursos");
        break;
      case "/dashboard/available-courses":
        setTitle("Cursos Disponíveis");
        break;
      default:
        setTitle("Cursos");
    }
  }, [location.pathname]);

  return (
    <>
      <CssBaseline />
      {/* Top Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <Box sx={{ bgcolor: palette.primary.main, padding: 2 }}>
            <Typography variant="h6" sx={{ color: "#FFF" }}>
              {userData.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#FFF" }}
              color="textSecondary"
            >
              {userData.email}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#FFF" }}
              color="textSecondary"
            >
              Registrado em:<br />{userData.created_at}
            </Typography>
          </Box>

          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigation("my-courses", "Meus Cursos")}
              >
                <ListItemIcon>{<Home />}</ListItemIcon>
                <ListItemText primary={"Meus cursos"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigation("available-courses", "Cursos Disponíveis")
                }
              >
                <ListItemIcon>{<Article />}</ListItemIcon>
                <ListItemText primary={"Cursos Disponíveis "} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigation("users", "Alunos matriculados")
                }
              >
                <ListItemIcon>{<SupervisorAccount />}</ListItemIcon>
                <ListItemText primary={"Alunos"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  console.log("sair")
                  navigate("/", {replace: true});
                  clearUserData();
                  toast.success("Até a próxima")
                }}
              >
                <ListItemIcon>{<Logout />}</ListItemIcon>
                <ListItemText primary={"Sair"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box sx={{ 
        pt: { xs: 8, sm: 10 }, 
        pb: { xs: 2, sm: 0 }
      }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Dashboard;
