import React from "react";
import hand from "../../assets/hand.png";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
const Home = () => {
  const navigate = useNavigate();

  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  const startRegister = () => {
    navigate("/register");
  };
  return (
    <div className={styles.cardWrapper}>
      <Card icon={hand} title="Welcome to TechSpace !!!">
        <p className={styles.text}>
          We're working hard to get TechSpace ready for everyone! While we wrap up the finishing touches, we're adding
          people gradually to make sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text="Get your username" />
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Existing user ?</span>
          <Link style={signInLinkStyle} to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
