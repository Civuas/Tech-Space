import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import styles from "./Room.module.css";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);
  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client) => {
        return (
          <div className={styles.userHead} key={client.id}>
            <audio ref={(instance) => provideRef(instance, client.id)} autoPlay></audio>
            <img className={styles.userAvatar} src={client.avatar} alt="client-avatar" />
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
