import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import useSWR from "swr";
import MessageCard from "./MessageCard";
import styles from "../styles/navbar.module.css";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import HandymanIcon from "@mui/icons-material/Handyman";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import ScienceIcon from "@mui/icons-material/Science";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";

interface MessageTypes {
  from: string;
  title: string;
  content: string;
  sendingDate: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Navbar() {
  const router = useRouter();
  const [currentWindow, setcurrentWindow] = useState("");
  useEffect(() => {
    setcurrentWindow(window.location.href);
  }, []);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [isProjectMenuOpen, setisProjectMenuOpen] = useState(false);
  const [sendMessageMenuOpen, setsendMessageMenuOpen] = useState(false);
  const { data, error, mutate, isValidating } = useSWR(
    "http://localhost:3000/api/messages",
    fetcher
  );
  return (
    <>
      <AppBar sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Button
            startIcon={<ScienceIcon />}
            onClick={() => router.push("/experiences")}
          >
            My work Expiriences
          </Button>
          <Button
            startIcon={<HandymanIcon />}
            onClick={() => {
              setisProjectMenuOpen(true);
            }}
          >
            My projects
          </Button>
          <Menu
            open={isProjectMenuOpen}
            onClose={() => {
              setisProjectMenuOpen(false);
            }}
            sx={{ marginTop: "64px" }}
          >
            <MenuItem onClick={() => router.push("/projects")}>Menu</MenuItem>
            <Divider />
            <MenuItem>Project 1</MenuItem>
            <MenuItem>Project 2</MenuItem>
            <MenuItem>Project 3</MenuItem>
          </Menu>
          <Button
            startIcon={<SendIcon />}
            onClick={() => setsendMessageMenuOpen(true)}
          >
            Send me a Message
          </Button>
          <Menu
            open={sendMessageMenuOpen}
            onClose={() => {
              setsendMessageMenuOpen(false);
            }}
            sx={{ marginTop: "64px" }}
          >
            <MenuItem>
              <ListItemIcon>
                <ForwardToInboxIcon />
              </ListItemIcon>
              Send an email
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SendTimeExtensionIcon />
              </ListItemIcon>
              Send a message through the database
            </MenuItem>
          </Menu>
          <Button startIcon={<DownloadIcon />}>Download my CV</Button>
          <IconButton size="large" onClick={() => setisDrawerOpen(true)}>
            <Badge badgeContent={data?.data.length} color="error">
              <EmailIcon sx={{ color: "#1976D2" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        <div className={styles.drawerContent}>
          <div className={styles.drawerTitle}>
            <IconButton
              className={styles.backButton}
              onClick={() => setisDrawerOpen(false)}
            >
              <ArrowBackIcon sx={{ color: "#1976D2" }} />
            </IconButton>
            <h2>Welcome to the message board</h2>
          </div>

          <p className={styles.drawerDesc}>
            Here are displayed all the <b>public</b> messages sent to my data
            base. You can scroll through those messages as you like and even
            send one by clicking the button below. You can also get all public
            messages from the api at{" "}
            <a
              className={styles.apiref}
              onClick={() => router.push("/api/messages")}
            >
              {currentWindow}api/messages
            </a>
            . I will make sure to read it if it is a private one ;{")"}
          </p>
          <div className={styles.messageContainer}>
            {data ? (
              data?.data.map((e: MessageTypes, index: number) => (
                <MessageCard
                  key={index}
                  from={e.from}
                  title={e.title}
                  message={e.content}
                  date={e.sendingDate}
                />
              ))
            ) : (
              <p>No messages were found how strange... &#129300;</p>
            )}
          </div>
          <div className={styles.contactButtons}>
            <Button startIcon={<SendIcon />}>Send your own message</Button>
            <Button startIcon={<ForwardToInboxIcon />}>
              Send me an email directly
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
