import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src={Logo} alt="logo" />
        <span style={logoText}>TechSpace</span>
      </Link>
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;
