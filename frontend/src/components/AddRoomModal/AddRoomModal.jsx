import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../shared/TextInput/TextInput";
import styles from "./AddRoomModal.module.css";
import globe from "../../assets/Globe.png";
import closed from "../../assets/closed.png";
import social from "../../assets/Users.png";
import close from "../../assets/close.png";
import celebration from "../../assets/celebrate-icon.png";
import { createRoom as create } from "../../http";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  const createRoom = async () => {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      navigate(`/rooms/${data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src={close} alt="close-icon" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput fullwidth="true" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <h2 className={styles.subHeading}>Room typs</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${roomType === "open" ? styles.active : ""}`}
            >
              <img src={globe} alt="open-globe-img" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${roomType === "social" ? styles.active : ""}`}
            >
              <img src={social} alt="social-img" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${roomType === "private" ? styles.active : ""}`}
            >
              <img src={closed} alt="lock-img" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room , open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src={celebration} alt="celebration-img" />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
