import React, {
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";

import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  /* -------------------- FETCH HISTORY -------------------- */

  const fetchHistory = useCallback(async () => {
    try {
      const history = await getHistoryOfUser();
      setMeetings(history);
    } catch (err) {
      console.log(err);
      // TODO: snackbar error handling
    }
  }, [getHistoryOfUser]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  /* -------------------- HELPERS -------------------- */

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  /* -------------------- UI -------------------- */

  return (
    <div>
      <IconButton onClick={() => navigate("/home")}>
        <HomeIcon />
      </IconButton>

      {meetings.length > 0 &&
        meetings.map((e, i) => (
          <Card key={i} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Code: {e.meetingCode}
              </Typography>

              <Typography sx={{ mt: 1 }} color="text.secondary">
                Date: {formatDate(e.date)}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
