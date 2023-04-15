import React, { useState } from "react";
import styles from "./StepPhoneEmail.module.css";

import Email from "./Email/Email";
import Phone from "./Phone/Phone";

import phone from "../../../assets/phone-white.png";
import email from "../../../assets/email-white.png";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.tabButton} ${type === "phone" ? styles.active : ""}`}
              onClick={() => setType("phone")}
            >
              <img src={phone} alt="phone" />
            </button>
            <button
              className={`${styles.tabButton} ${type === "email" ? styles.active : ""}`}
              onClick={() => setType("email")}
            >
              <img src={email} alt="email" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
