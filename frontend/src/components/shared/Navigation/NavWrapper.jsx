import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function NavbarWrapper() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
