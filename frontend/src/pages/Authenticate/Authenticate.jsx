import React, { useState } from "react";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import { ToastContainer } from "react-toastify";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div className="cardWrapper">
      <ToastContainer
        position="top-right"
        autoClose={15 * 1000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        style={{ width: "fit-content" }}
      />
      <Step onNext={onNext} />
    </div>
  );
};

export default Authenticate;
