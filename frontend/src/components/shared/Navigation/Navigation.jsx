import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";
import arrow from "../../../assets/arrow.png";
import defaultImg from "../../../assets/avatar.png";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
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
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>

          <Link to="/">
            <img src={user.avatar ? user.avatar : defaultImg} className={styles.avatar} alt="avatar" />
          </Link>

          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src={arrow} alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
