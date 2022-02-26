import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

function Lobby(props) {
  const username = props.username;
  const userNameChangeHandler = props.userNameChangeHandler;
  const roomName = props.roomName;
  const roomNameChangeHandler = props.roomNameChangeHandler;
  const submitHandler = props.submitHandler;
  const student_tutor = props.student_tutor;
  const set_student_tutor = props.student_tutor_ChangeHandler;
  return (
    <div>
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

        <Form>
          <Form.Field>
            Selected value: <b>{student_tutor}</b>
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label=" Student"
              name="checkboxRadioGroup"
              value="Student"
              checked={student_tutor === "Student"}
              onChange={(e, data) => set_student_tutor(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label=" Tutor"
              name="checkboxRadioGroup"
              value="Tutor"
              checked={student_tutor === "Tutor"}
              onChange={(e, data) => set_student_tutor(data.value)}
            />
          </Form.Field>
        </Form>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Lobby;
