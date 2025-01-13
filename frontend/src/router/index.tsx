import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import MyCourses from "../pages/my-courses";
import AvailableCourses from "../pages/available-courses";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <div>Error Page</div>,
      children: [
        {
          path: "my-courses",
          element: <MyCourses />,
        },
        {
          path: "available-courses",
          element: <AvailableCourses />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Router;
