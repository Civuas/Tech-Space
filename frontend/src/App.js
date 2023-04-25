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
import Room from "./pages/Room/Room";

const GuestRoute = () => {
  const location = useLocation();

  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? (
    <Navigate to={location.state?.from || "/rooms"} replace={true} state={{ from: location.pathname }} />
  ) : (
    <Outlet />
  );
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
          {
            path: "/rooms/:id",
            element: <Room />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // call refresh endpoint

  const { isLoading } = useLoadingWithRefresh();

  return isLoading ? (
    <Loader message="Loading , please wait ..." />
  ) : (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
