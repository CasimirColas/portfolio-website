import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SailingIcon from "@mui/icons-material/Sailing";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  closeDialog: () => void;
  mutate: () => void;
}

function WriteMessage({ open, closeDialog, mutate }: Props) {
  const [from, setfrom] = useState("");
  const [title, settitle] = useState("");
  const [msgContent, setmsgContent] = useState("");
  const [msgType, setmsgType] = useState("public");
  const [dCode, setdCode] = useState("");
  const [currentWindow, setcurrentWindow] = useState("");
  useEffect(() => {
    setcurrentWindow(window.location.href);
  }, []);

  function resetInputs() {
    setfrom("");
    settitle("");
    setmsgContent("");
    setdCode("");
  }
  async function sendMessage() {
    const msgBody = {
      from: from,
      title: title,
      content: msgContent,
      type: msgType,
      deletionCode: dCode,
    };
    await axios
      .post(`${currentWindow}api/messages`, msgBody)
      .catch((e) => console.error(e));
  }

  return (
    <Dialog open={open} onClose={() => closeDialog()}>
      <DialogTitle>Send a Message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The message you are about to send will apear in my Mongo database and
          if you set {"it's"} visibility to public it will show on the public
          message board. Make sure to remember your{" "}
          <b style={{ color: "red" }}>deletion code</b> if you want to remove it
          from the board later.
        </DialogContentText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your name"
            type="text"
            fullWidth
            variant="outlined"
            value={from}
            onChange={(e) => setfrom(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Message Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Message"
            type="text"
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 255 }}
            InputProps={{
              endAdornment: (
                <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  {msgContent.length}/255
                </p>
              ),
            }}
            value={msgContent}
            onChange={(e) => setmsgContent(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              gap: "30px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "4px",
              }}
            >
              <InputLabel>Visibility</InputLabel>
              <Select
                value={msgType}
                onChange={(e) => setmsgType(e.target.value)}
              >
                <MenuItem value={"public"}>public</MenuItem>
                <MenuItem value={"private"}>private</MenuItem>
              </Select>
            </div>
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
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()}>Cancel</Button>
        <Button
          onClick={() => {
            closeDialog();
            sendMessage();
            resetInputs();
            mutate();
          }}
          startIcon={<SailingIcon />}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WriteMessage;
