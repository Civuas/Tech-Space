import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";

import { sendOtp } from "../../../../http";
import { toast } from "react-toastify";

import { validatePhoneNo } from "../../../../util/validator";

import phone from "../../../../assets/phone.png";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    //server request
    if (phoneNumber.length < 10 || validatePhoneNo(phoneNumber)) {
      return;
    }
    // Send OTP
    sendOtp({ phone: phoneNumber })
      .then(({ data }) => {
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        const resolveWithSomeData = new Promise((resolve) => setTimeout(() => resolve(`${data.otp}`), 3000));
        toast.promise(resolveWithSomeData, {
          pending: {
            render() {
              return "Please wait a moment";
            },
            theme: "dark",
          },
          success: {
            render({ data }) {
              return `🐦 Your 4 digit OTP : ${data}`;
            },
            theme: "dark",
          },
        });
      })
      .catch((error) => {
        toast.error("Sorry, our servers are down. Please try again later.", {
          theme: "dark",
          position: "top-center",
          autoClose: 7000,
        });
      });
    onNext();
  };

  return (
    <Card icon={phone} title="Enter your phone number">
      <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type={"number"} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={handleSubmit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
