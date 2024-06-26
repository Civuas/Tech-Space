import React, { useEffect, useState } from "react";
// import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";

import { useSelector, useDispatch } from "react-redux";

import faceWg from "../../../assets/faceWg.png";
import avatarImg from "../../../assets/avatar.png";
import styles from "./StepAvatar.module.css";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../http";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const [image, setImage] = useState(avatarImg);
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state) => state.activate);

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const handleSubmit = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        if (!unMounted) {
          dispatch(setAuth(data));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress" />;

  return (
    <>
      <Card title={`Okay, ${name}`} icon={faceWg}>
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input id="avatarInput" type="file" className={styles.avatarInput} onChange={captureImage} />
          <label htmlFor="avatarInput" className={styles.avatarLabel}>
            Choose a different photo
          </label>
        </div>
        <div>
          <Button text="Next" onClick={handleSubmit} />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
