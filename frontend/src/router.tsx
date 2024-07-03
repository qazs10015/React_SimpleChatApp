import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";

export const Router = createBrowserRouter([
  {
    path: '/login',
    loader: async () => document.title = 'Login',
    element: <Login />,
  },
  {
    path: '/register',
    loader: async () => document.title = 'Register member',
    element: <Register />,
  },
  {
    path: '/home',
    loader: async () => document.title = 'Home',
    element: <Home />,
  },
  {
    path: '*',
    element: <Login />,
  },
]);
