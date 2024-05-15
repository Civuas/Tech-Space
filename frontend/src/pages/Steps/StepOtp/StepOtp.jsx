import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepOtp.module.css";
import lock from "../../../assets/lock.png";

import Button from "../../../components/shared/Button/Button";

import { verifyOtp } from "../../../http";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import OtpInput from "../../../components/Otp/OtpInput";

const StepOtp = () => {
  const [finalOtp, setFinalOtp] = useState([]);
  const dispatch = useDispatch();

  const { phone, hash, email } = useSelector((state) => state.auth.otp);

  const handleSubmit = async () => {
    if (!finalOtp || (!phone && !email) || !hash) {
      return;
    }
    try {
      const { data } = await verifyOtp({ otp: finalOtp, phone, hash, email });
      dispatch(setAuth(data));
    } catch (error) {
      toast.error(`OTP expired, Please refresh the page`, {
        position: "top-center",
        autoClose: 7000,
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
        {/* <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} /> */}
        <OtpInput length={4} onOtpSubmit={handleSubmit} setFinalOtp={setFinalOtp} />
        <div>
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
