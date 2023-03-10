import { useEffect, useRef, useState } from "react";
import {
  LocalAudioTrack,
  LocalVideoTrack,
  LocalParticipant,
  LocalVideoTrackPublication,
  LocalAudioTrackPublication,
} from "twilio-video";

const Participant = ({ participant }: { participant: LocalParticipant }) => {
  const [videoTracks, setVideoTracks] = useState<(LocalVideoTrack | null)[]>(
    []
  );
  const [audioTracks, setAudioTracks] = useState<LocalAudioTrack[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trackpubsToTracks = (
    trackMap: Map<
      string,
      LocalVideoTrackPublication | LocalAudioTrackPublication
    >
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const trackSubscribed = (track: LocalVideoTrack | LocalAudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: LocalVideoTrack | LocalAudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    setVideoTracks(
      trackpubsToTracks(participant.videoTracks) as LocalVideoTrack[]
    );
    setAudioTracks(
      trackpubsToTracks(participant.audioTracks) as LocalAudioTrack[]
    );

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnpublished", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoRef.current && videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioRef.current && audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );
};

export default Participant;
