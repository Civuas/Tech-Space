import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepOtp.module.css";
import lock from "../../../assets/lock.png";

import Button from "../../../components/shared/Button/Button";

import { sendOtp, verifyOtp } from "../../../http";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setAuth, setOtp } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import OtpInput from "../../../components/Otp/OtpInput";

const StepOtp = () => {
  const [finalOtp, setFinalOtp] = useState("");
  const dispatch = useDispatch();
  const [clearInputs, setClearInputs] = useState(false);
  const { phone, hash, email } = useSelector((state) => state.auth.otp);

  const handleResendClick = async () => {
    try {
      setClearInputs((prev) => !prev);
      let uniqueIdentifier = phone ? { phone } : { email };
      const { data } = await sendOtp(uniqueIdentifier);

      dispatch(setOtp({ phone: data.phone, hash: data.hash, email: data.email }));

      const resolveWithSomeData = new Promise((resolve) => setTimeout(() => resolve(data), 3000));
      toast.promise(resolveWithSomeData, {
        pending: {
          render() {
            return "Please wait a moment resending the otp";
          },
          theme: "dark",
        },
        success: {
          render({ data }) {
            if (data.phone) {
              return `🐦 Your new 4 digit OTP : ${data.otp}`;
            }
            return `🐦 A new OTP has been sent to your email`;
          },
          theme: "dark",
        },
        error: {
          render({ data }) {
            return `Sorry Our servers are down . Please try again later`;
          },
        },
      });
    } catch (error) {
      console.log(" error: ", error);
    }
  };
  const handleSubmit = async () => {
    console.log(finalOtp);
    if (!finalOtp || (!phone && !email) || !hash) {
      return;
    }
    try {
      const { data } = await verifyOtp({ otp: finalOtp, phone, hash, email });
      dispatch(setAuth(data));
    } catch (error) {
      toast.error(`Your OTP expired , try clicking resend OTP `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Otp error", error);
    }
  };
  return (
    <>
      <Card title={`Enter the code we just ${phone ? "texted" : "mailed"} you`} icon={lock}>
        <OtpInput length={4} setFinalOtp={setFinalOtp} clearOtp={clearInputs} />

        <div className={styles.buttonWrapper}>
          <span className={styles.resendOTP} onClick={handleResendClick}>
            Resend OTP
          </span>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={handleSubmit} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </>
  );
};

export default StepOtp;
