import React from "react";

function Lobby(props) {
  const username = props.username;
  const userNameChangeHandler = props.userNameChangeHandler;
  const roomName = props.roomName;
  const roomNameChangeHandler = props.roomNameChangeHandler;
  const submitHandler = props.submitHandler;
  return (
    <form onSubmit={submitHandler}>
      <h2>Enter a room</h2>
      <div>
        <input
          placeholder="Enter Name"
          type="text"
          id="field"
          value={username}
          onChange={userNameChangeHandler}
          resolve
        />
      </div>

      <div>
        <input
          placeholder="Enter Room Name"
          type="text"
          id="room"
          value={roomName}
          onChange={roomNameChangeHandler}
          resolve
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Lobby;