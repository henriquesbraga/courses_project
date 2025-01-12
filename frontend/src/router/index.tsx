import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/register" index element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
