import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Button,
  IconButton,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff9839" }, // KEEPING YOUR COLOR
  },
});

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* NAVBAR */}
      <div className="navBar">
        <h2 style={{ fontWeight: 800 }}>📹 Apna Video Call</h2>

        <div className="navActions">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>

          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            style={{ borderRadius: "10px" }}
          >
            Logout
          </Button>
        </div>
      </div>



      {/* MAIN SECTION */}
      <div className="meetLikeContainer">
        {/* HERO CONTENT */}
        <div className="heroContent">
          <h1 className="heroTitle">
            Video calls and meetings <br /> for everyone
          </h1>

          <p className="heroSubtitle">
            Connect, collaborate and celebrate from anywhere with Apna Video
            Call
          </p>

          <div className="heroActions">
            <Button
              variant="contained"
              size="large"
              style={{ borderRadius: "14px", padding: "0.8rem 1.6rem" }}
              onClick={() => {
                const code = Math.random().toString(36).substring(2, 8);
                handleJoinVideoCall(code);
              }}
            >
              New meeting
            </Button>

            <TextField
              placeholder="Enter a code"
              variant="filled"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              sx={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: "14px",
                minWidth: "260px",
              }}
            />

            <Button
              variant="text"
              onClick={handleJoinVideoCall}
              sx={{ color: "#ff9839" }}
            >
              Join
            </Button>
          </div>
        </div>

        {/* ILLUSTRATION */}
        <div className="heroImage">
          <img src="/logo3.png" alt="Meeting illustration" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withAuth(HomeComponent);
