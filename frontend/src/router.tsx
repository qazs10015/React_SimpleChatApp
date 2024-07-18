import { createBrowserRouter, isRouteErrorResponse, Navigate, useRouteError } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SetAvatar from "./pages/SetAvatar/SetAvatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setUser } from "./slices/userSlice";
import ChatView from "./pages/ChatView/ChatView";

// check login status
function AuthenticatedRoute() {
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // checking user is logged in or not 
  const isAuth = !!userInfo.userName || !!sessionStorage.getItem('user');

  if (!userInfo.userName && isAuth) dispatch(setUser(JSON.parse(sessionStorage.getItem('user')!)));

  if (!isAuth) alert('請先登入');
  return (
    <div>
      {isAuth ? <Home /> : <Login />}
    </div>
  );

}

// handle error message
function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);
  // throw error;
  // 透過 isRouteErrorResponse 判斷錯誤訊息來源是不是來自 Router，如果不是就交給外層的 ErrorBoundary 處理
  if (!isRouteErrorResponse(error)) throw error;

  return (
    <div id="error-page">
      <h1 className="text-error">Router Error</h1>
      <p className="text-info">
        {error?.message}
      </p>
    </div>
  );
}

const routes = [
  {
    path: '/login',
    index: true,
    loader: async () => document.title = 'Login',
    element: <Login />,
  },
  {
    path: '/register',
    loader: async () => document.title = 'Register member',
    element: <Register />,
  },

  {
    path: '/',
    loader: async () => document.title = 'Home',
    element: <AuthenticatedRoute />,
    children: [
      {
        path: 'setAvatar',
        loader: async () => document.title = 'Select Avatar',
        element: <SetAvatar />,
      },
      {
        path: 'chat',
        loader: async () => document.title = 'Start Chat',
        element: <ChatView />,
      },
    ]
  },
  {
    path: '*',
    element: <Login />,
  },
].map(route => ({ ...route, errorElement: <ErrorPage /> }));

export const Routers = createBrowserRouter(routes);