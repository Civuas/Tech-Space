import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import styles from "./Room.module.css";
import arrowBack from "../../assets/arrowback.png";
import palm from "../../assets/palm.png";
import peace from "../../assets/peaceSign.png";
import micmute from "../../assets/mic-mute.png";
import { getRoom } from "../../http";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prev) => data);
    };
    fetchRoom();
  }, [roomId]);
  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src={arrowBack} alt="back-arrow-button" />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src={palm} alt="say-hi-button" />
            </button>
            <button className={styles.actionBtn} onClick={handleManualLeave}>
              <img src={peace} alt="leave-quitely" />
              <span>Leave quitely</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio ref={(instance) => provideRef(instance, client.id)} autoPlay></audio>
                  <img className={styles.userAvatar} src={client.avatar} alt="client-avatar" />
                  <button className={styles.micBtn}>
                    <img src={micmute} alt="mute-mic-icon" />
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
