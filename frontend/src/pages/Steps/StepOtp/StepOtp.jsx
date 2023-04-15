import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepOtp.module.css";
import lock from "../../../assets/lock.png";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  function next() {}
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon={lock}>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button text="Next" onClick={next} />
            </div>
            <p className={styles.bottomParagraph}>
              By entering your number, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
