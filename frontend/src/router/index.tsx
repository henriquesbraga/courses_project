import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import MyCourses from "../pages/my-courses";
import AvailableCourses from "../pages/available-courses";

const Router = () => (
  <BrowserRouter>
    <Routes>
      {/* Rotas principais */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota pai: Dashboard */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Rota padrão (index) */}
        <Route index element={<MyCourses />} />
        {/* Outras rotas filhas */}
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="available-courses" element={<AvailableCourses />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
