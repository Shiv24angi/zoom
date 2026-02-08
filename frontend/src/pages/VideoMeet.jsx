import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";

import io from "socket.io-client";
import {
  Badge,
  IconButton,
  TextField,
  Button,
  ThemeProvider,
  createTheme
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";

import styles from "../styles/videoComponent.module.css";
import server from "../environment";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff9839" }
  }
});

let connections = {};
const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export default function VideoMeetComponent() {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoref = useRef();
  const videoRef = useRef([]);

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [screenAvailable, setScreenAvailable] = useState(false);

  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [screen, setScreen] = useState(false);

  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");

  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setModal] = useState(false);
  const [newMessages, setNewMessages] = useState(0);

  /* -------------------- PERMISSIONS -------------------- */

  const getPermissions = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      await navigator.mediaDevices.getUserMedia({ audio: true });

      setVideoAvailable(true);
      setAudioAvailable(true);

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  /* -------------------- USER MEDIA -------------------- */

  const getUserMediaSuccess = useCallback((stream) => {
    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].addStream(stream);
    }
  }, []);

  const getUserMedia = useCallback(() => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video, audio })
        .then(getUserMediaSuccess)
        .catch((e) => console.log(e));
    }
  }, [video, audio, videoAvailable, audioAvailable, getUserMediaSuccess]);

  useEffect(() => {
    getUserMedia();
  }, [getUserMedia]);

  /* -------------------- SCREEN SHARE -------------------- */

  const getDisplayMedia = useCallback(() => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
          if (id === socketIdRef.current) continue;
          connections[id].addStream(stream);
        }

        stream.getTracks()[0].onended = () => {
          setScreen(false);
        };
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (screen) {
      getDisplayMedia();
    }
  }, [screen, getDisplayMedia]);

  /* -------------------- SOCKET -------------------- */

  const connectToSocketServer = useCallback(() => {
    socketRef.current = io.connect(server);

    socketRef.current.on("connect", () => {
      socketIdRef.current = socketRef.current.id;
      socketRef.current.emit("join-call", window.location.href);

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((clientId) => {
          if (connections[clientId]) return;

          connections[clientId] = new RTCPeerConnection(
            peerConfigConnections
          );

          connections[clientId].onaddstream = (event) => {
            setVideos((prev) => {
              const updated = [
                ...prev,
                { socketId: clientId, stream: event.stream }
              ];
              videoRef.current = updated;
              return updated;
            });
          };

          if (window.localStream) {
            connections[clientId].addStream(window.localStream);
          }
        });
      });

      socketRef.current.on("chat-message", (msg, sender, senderId) => {
        setMessages((prev) => [...prev, { sender, data: msg }]);
        if (senderId !== socketIdRef.current) {
          setNewMessages((n) => n + 1);
        }
      });
    });
  }, []);

  /* -------------------- ACTIONS -------------------- */

  const connect = () => {
    if (!username) return;
    setAskForUsername(false);
    connectToSocketServer();
    getUserMedia();
  };

  const sendMessage = () => {
    if (!message) return;
    socketRef.current.emit("chat-message", message, username);
    setMessage("");
  };

  /* -------------------- UI -------------------- */

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.pageRoot}>
        {askForUsername ? (
          <div className={styles.lobby}>
            <h2>Welcome</h2>
            <p>Set up your camera and name before joining</p>

            <video
              ref={localVideoref}
              autoPlay
              muted
              className={styles.lobbyVideo}
            />

            <div style={{ display: "flex", gap: "1rem", width: "480px" }}>
              <TextField
                fullWidth
                label="Display Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button variant="contained" onClick={connect}>
                Join
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.meetVideoContainer}>
            <div className={styles.conferenceView}>
              {videos.map((v) => (
                <video
                  key={v.socketId}
                  ref={(ref) => ref && (ref.srcObject = v.stream)}
                  autoPlay
                  className={styles.remoteVideo}
                />
              ))}
            </div>

            <video
              ref={localVideoref}
              autoPlay
              muted
              className={styles.meetUserVideo}
            />

            {showModal && (
              <div className={styles.chatRoom}>
                <h3>
                  Messages
                  <Button onClick={() => setModal(false)}>Close</Button>
                </h3>

                <div className={styles.chattingDisplay}>
                  {messages.map((m, i) => (
                    <div key={i} className={styles.chatBubble}>
                      <strong>{m.sender}</strong>
                      <span>{m.data}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.chattingArea}>
                  <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && sendMessage()
                    }
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </div>
            )}

            <div className={styles.controlBar}>
              <IconButton onClick={() => setVideo(!video)}>
                {video ? <VideocamIcon /> : <VideocamOffIcon color="error" />}
              </IconButton>

              <IconButton onClick={() => setAudio(!audio)}>
                {audio ? <MicIcon /> : <MicOffIcon color="error" />}
              </IconButton>

              {screenAvailable && (
                <IconButton onClick={() => setScreen(!screen)}>
                  {screen ? (
                    <StopScreenShareIcon color="primary" />
                  ) : (
                    <ScreenShareIcon />
                  )}
                </IconButton>
              )}

              <Badge badgeContent={newMessages} color="primary">
                <IconButton
                  onClick={() => {
                    setModal(!showModal);
                    setNewMessages(0);
                  }}
                >
                  <ChatIcon />
                </IconButton>
              </Badge>

              <IconButton
                className={styles.endCall}
                onClick={() => (window.location.href = "/")}
              >
                <CallEndIcon />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
