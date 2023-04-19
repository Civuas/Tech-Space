import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RoomCard.module.css";
import msgIcon from "../../assets/msg-icon.png";
import userIcon from "../../assets/user-icon.png";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/rooms/${room.id}`);
        }}
        className={styles.card}
      >
        <h3 className={styles.topic}>{room.topic}</h3>
        <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.singleSpeaker : ""}`}>
          <div className={styles.avatars}>
            {room.speakers.map((speaker) => (
              <img src={speaker.avatar} alt="speakers-avatar" key={speaker.id} />
            ))}
          </div>
          <div className={styles.names}>
            {room.speakers.map((speaker) => (
              <div className={styles.nameWrapper} key={speaker.id}>
                <span>{speaker.name}</span>
                <img src={msgIcon} alt="msg-icon" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.peopleCount}>
          <span>{room.totalPeople}</span>
          <img src={userIcon} alt="user-icon" />
        </div>
      </div>
    </>
  );
};

export default RoomCard;
