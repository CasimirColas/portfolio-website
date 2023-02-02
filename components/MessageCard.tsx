import styles from "../styles/messageCard.module.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

interface Props {
  _id: string;
  from: string;
  title: string;
  message: string;
  date: string;
  window: string;
  mutate: () => void;
}

function MessageCard({
  _id,
  from,
  title,
  message,
  date,
  window,
  mutate,
}: Props) {
  const [deleteDialogOpen, setdeleteDialogOpen] = useState(false);
  const [dCode, setdCode] = useState("");

  async function deleteReq() {
    const body = {
      request: "delete",
      deletionCode: dCode,
    };
    await axios
      .put(`${window}api/messages/${_id}`, body)
      .then((e) => console.log(e.data))
      .catch((e) => console.error(e));
  }

  return (
    <div className={styles.main}>
      <div className={styles.titleLine}>
        <h4>{title}</h4>
        <IconButton
          sx={{ position: "relative" }}
          onClick={() => setdeleteDialogOpen(true)}
        >
          <DeleteForeverOutlinedIcon sx={{ color: "#cc0000" }} />
        </IconButton>
      </div>
      <p style={{ color: "#00ACFF" }}>from: {from}</p>
      <p>{message}</p>
      <i>Message sent: {date}</i>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setdeleteDialogOpen(false)}
      >
        <DialogTitle>
          To Delete this message enter its deletion code
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="deleteCode"
            label="Your deletion code"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 6 }}
            InputProps={{
              endAdornment: <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>/6</p>,
            }}
            value={dCode}
            onChange={(e) => setdCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setdeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setdeleteDialogOpen(false);
              deleteReq();
              mutate();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MessageCard;
