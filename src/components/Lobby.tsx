import { ChangeEvent, FormEvent } from "react";

interface LobbyProps {
  userName: string;
  handleUserNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  roomName: string;
  handleRoomNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Lobby: React.FC<LobbyProps> = ({
  userName,
  roomName,
  handleRoomNameChange,
  handleUserNameChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
