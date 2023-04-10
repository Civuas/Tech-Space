import React from "react";
import styles from "./Button.module.css";
import arrow from "../../../assets/arrow.png";
const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{text}</span>
      <img className={styles.arrow} src={arrow} alt="arrow" />
    </button>
  );
};
export default Button;
