import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);

  const Component = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <div className="cardWrapper">
      <Component onNext={onNext} />
    </div>
  );
};

export default Activate;
