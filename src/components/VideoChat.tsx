import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = () => {
  const [userName, setUserName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const handleUserNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    []
  );

  const handleRoomNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRoomName(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = await fetch("http://localhost:3001/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: userName,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      setToken(data.token);
    },
    [userName, roomName]
  );

  const handleLogout = () => {
    setToken(null);
  };

  let render;

  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        userName={userName}
        roomName={roomName}
        handleUserNameChange={handleUserNameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }

  return render;
};

export default VideoChat;
