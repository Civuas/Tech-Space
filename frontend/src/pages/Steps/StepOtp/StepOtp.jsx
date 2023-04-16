import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepOtp.module.css";
import lock from "../../../assets/lock.png";

import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

const StepOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { phone, hash } = useSelector((state) => state.auth.otp);
  const handleSubmit = async () => {
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log("data after verifying==> ", data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log("Otp error", error);
    }
  };
  return (
    <>
      <Card title="Enter the code we just texted you" icon={lock}>
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
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
