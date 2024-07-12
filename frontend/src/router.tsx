import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SetAvatar from "./pages/SetAvatar/SetAvatar";

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
    path: '/setAvatar',
    loader: async () => document.title = 'Select Avatar',
    element: <SetAvatar />,
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
