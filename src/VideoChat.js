import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import Room from "./Room";

function VideoChat() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const userNameChangeHandler = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const roomNameChangeHandler = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  const logoutHandler = useCallback((event) => {
    setToken(null);
  }, []);

  return (
    <>
      {token ? (
        <Room roomName={roomName} token={token} logoutHandler={logoutHandler} />
        ) : (
        <Lobby
          username={username}
          roomName={roomName}
          userNameChangeHandler={userNameChangeHandler}
          roomNameChangeHandler={roomNameChangeHandler}
          submitHandler={submitHandler}
        />
      )}
    </>
  ); // we'll build up our response later
}

export default VideoChat;
