import React, { useState, useEffect, createRef } from "react";
import Video from "twilio-video";
import Participant from "./Participant";
import { useScreenshot } from "use-react-screenshot";
import "./Styling/Room.css";

function Room(props) {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const roomName = props.roomName;
  const token = props.token;
  const logoutHandler = props.logoutHandler;

  var isTutor = false;

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  function getImage() {
    takeScreenshot(ref.current);
  }

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  if (
    room?.localParticipant.identity &&
    room?.localParticipant?.identity.split(":")[0] === "Tutor "
  ) {
    isTutor = true;
  }

  return (
    <div className="room">
      <button onClick={logoutHandler}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      {remoteParticipants.length !== 0 ? (
        <div>
          <div ref={ref}>{remoteParticipants}</div>
          {isTutor ? (
            <div>
              <button className="screenshot" onClick={getImage}>Take Phoot</button>
              <img src={image}></img>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Room;
