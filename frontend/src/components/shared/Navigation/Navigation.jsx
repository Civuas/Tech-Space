import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src={Logo} alt="logo" />
        <span style={logoText}>TechSpace</span>
      </Link>
    </nav>
  );
};

export default Navigation;
