import React, { useState } from "react";

import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";

import email from "../../../../assets/email.png";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
  const [emailId, setEmailId] = useState("");
  return (
    <Card icon={email} title="Enter your email id">
      <TextInput value={emailId} onChange={(e) => setEmailId(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
