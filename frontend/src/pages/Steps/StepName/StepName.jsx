import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";

import smiley from "../../../assets/smiley.png";
import styles from "./StepName.module.css";

import { useDispatch } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  // const { name } = useSelector((state) => state.activate);
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();

  const nextStep = () => {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  };

  return (
    <>
      <Card title="What's your name ?" icon={smiley}>
        <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} />
        <div>
          <p className={styles.paragraph}>We recommend using real names at techSpace !</p>
          <Button text="Next" onClick={nextStep} />
        </div>
      </Card>
    </>
  );
};

export default StepName;
