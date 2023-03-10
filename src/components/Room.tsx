import { useEffect, useState } from "react";
import Video from "twilio-video";
import Participant from "./Participant";

interface RoomProps {
  roomName: string;
  token: string;
  handleLogout: () => void;
}

const Room: React.FC<RoomProps> = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState<Video.Room | null>(null);
  const [participants, setParticipants] = useState<Video.Participant[]>([]);

  const remoteParticipants = participants.map(
    (participant: Video.Participant) => (
      <p key={participant.sid}>{participant.identity}</p>
    )
  );

  useEffect(() => {
    const participantConnected = (participant: Video.Participant) => {
      setParticipants((prevParticipant) => [...prevParticipant, participant]);
    };
    const participantDisconnected = (participant: Video.Participant) => {
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
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
            trackPublication.track.removeAllListeners();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
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
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
