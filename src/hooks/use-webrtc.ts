import { useEffect, useRef, useCallback } from "react";
import { mediaDevices, MediaStream, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import freeice from "freeice";
import useStateWithCallback from "./use-state-with-callback";
import socket from "../socket";
import ACTIONS from "../socket/actions";

export const LOCAL_VIDEO = "LOCAL_VIDEO";

type Client = string;

interface PeerConnections {
  [key: string]: RTCPeerConnection;
}

interface MediaElements {
  [key: string]: any;
}

interface AddPeerPayload {
  peerID: string;
  createOffer: boolean;
}

interface SessionDescriptionPayload {
  peerID: string;
  sessionDescription: RTCSessionDescriptionInit;
}

interface IceCandidatePayload {
  peerID: string;
  iceCandidate: RTCIceCandidateInit;
}

interface RemovePeerPayload {
  peerID: string;
}

export default function useWebRTC(roomID: string) {
  const [clients, setClients] = useStateWithCallback([]);

  const addNewClient = useCallback((newClient: Client, cb: () => void) => {
    setClients((list) => {
      if (!list.includes(newClient)) {
        return [...list, newClient];
      }
      return list;
    }, cb);
  }, []);

  const peerConnections = useRef<PeerConnections>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const peerMediaElements = useRef<MediaElements>({
    [LOCAL_VIDEO]: null,
  });

  useEffect(() => {
    async function handleNewPeer({ peerID, createOffer }: AddPeerPayload) {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      const pc: any = new RTCPeerConnection({ iceServers: freeice() });

      peerConnections.current[peerID] = pc;


      pc.onicecandidate = (event) => {

        if (event.candidate) {
          socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: event.candidate,
          });
        }
      };

      let tracksNumber = 0;
      pc.ontrack = ({ streams: [remoteStream] }) => {
        tracksNumber++;

        if (tracksNumber === 2) {
          tracksNumber = 0;
          addNewClient(peerID, () => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
            } else {
              const interval = setInterval(() => {
                if (peerMediaElements.current[peerID]) {
                  peerMediaElements.current[peerID].srcObject = remoteStream;
                  clearInterval(interval);
                }
              }, 1000);
            }
          });
        }
      };

      localMediaStream.current?.getTracks().forEach((track) => {
        pc.addTrack(track, localMediaStream.current as MediaStream);
      });

      if (createOffer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        });
      }
    }

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER, handleNewPeer);
    };
  }, []);

  useEffect(() => {
    async function setRemoteMedia({ peerID, sessionDescription }: SessionDescriptionPayload) {
      const pc = peerConnections.current[peerID];
      if (!pc) return;

      await pc.setRemoteDescription(new RTCSessionDescription(sessionDescription));

      if (sessionDescription.type === "offer") {
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: answer,
        });
      }
    }

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
    };
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }: IceCandidatePayload) => {
      const pc = peerConnections.current[peerID];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
      }
    });

    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  useEffect(() => {
    const handleRemovePeer = ({ peerID }: RemovePeerPayload) => {
      if (peerConnections.current[peerID]) {
        peerConnections.current[peerID].close();
      }

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      setClients((list) => list.filter((client) => client !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.off(ACTIONS.REMOVE_PEER, handleRemovePeer);
    };
  }, []);

  useEffect(() => {
    async function startCapture() {
      try {
        localMediaStream.current = await mediaDevices.getUserMedia({
          audio: true,
          video: { width: 1280, height: 720 },
        });

        addNewClient(LOCAL_VIDEO, () => {
          const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
          if (localVideoElement) {
            localVideoElement.volume = 0;
            localVideoElement.srcObject = localMediaStream.current;
          }
        });

        socket.emit(ACTIONS.JOIN, { room: roomID });
      } catch (e) {
        console.error("Error getting userMedia:", e);
      }
    }

    startCapture();

    return () => {
      localMediaStream.current?.getTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID]);

  const provideMediaRef = useCallback((id: string, node: any) => {
    peerMediaElements.current[id] = node;
  }, []);

  return {
    clients,
    provideMediaRef,
    peerMediaElements,
  };
}