import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { setOtp } from "../../../../store/authSlice";
import email from "../../../../assets/email.png";
import styles from "../StepPhoneEmail.module.css";
import { toast } from "react-toastify";
import { validateEmail } from "../../../../util/validator";
import { sendOtp } from "../../../../http";

const Email = ({ onNext }) => {
  const [emailId, setEmailId] = useState("");
  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const notify = (error) => {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Sorry! Our Servers are busy , Please try again later";
    }

    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleNextClick = async () => {
    try {
      if (!validateEmail(emailId)) {
        throw new Error("Please enter a valid email");
      }
      const { data } = await sendOtp({ phone: null, email: emailId });
      dispatch(setOtp({ phone: null, hash: data.hash, email: data.email }));
      toast.success(`OTP has been sent to your email`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onNext();
    } catch (error) {
      notify(error);
    }
  };

  return (
    <>
      <Card icon={email} title="Enter your email">
        <TextInput value={emailId} onChange={(e) => setEmailId(e.target.value)} type="email" />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={handleNextClick} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your email, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </>
  );
};

export default Email;
