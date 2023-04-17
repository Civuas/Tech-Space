import "./App.css";
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavbarWrapper from "./components/shared/Navigation/NavWrapper";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";

const GuestRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" replace={true} /> : <Outlet />;
};

const SemiProtected = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const location = useLocation();
  return !isAuth ? (
    <Navigate to="/" replace={true} state={{ from: location.pathname }} />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to="/rooms" replace={true} state={{ from: location.pathname }} />
  );
};

const Protected = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const location = useLocation();
  return !isAuth ? (
    <Navigate to="/" replace={true} state={{ from: location.pathname }} />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" replace={true} state={{ from: location.pathname }} />
  ) : (
    <Outlet />
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <GuestRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/authenticate",
            element: <Authenticate />,
          },
        ],
      },
      {
        path: "/activate",
        element: <SemiProtected />,
        children: [
          {
            path: "/activate",
            element: <Activate />,
          },
        ],
      },
      {
        path: "/rooms",
        element: <Protected />,
        children: [
          {
            path: "/rooms",
            element: <Rooms />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // call refresh endpoint

  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading , please wait ..." />
  ) : (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
