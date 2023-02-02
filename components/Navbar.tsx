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
import WriteMessage from "./WriteMessage";
import CottageIcon from "@mui/icons-material/Cottage";
import MenuIcon from "@mui/icons-material/Menu";

interface MessageTypes {
  _id: string;
  from: string;
  title: string;
  content: string;
  sendingDate: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Navbar() {
  const router = useRouter();
  const [currentWindow, setcurrentWindow] = useState("");
  const [windowWidth, setwindowWidth] = useState<number>();
  const [responsiveNav, setresponsiveNav] = useState(false);
  useEffect(() => {
    setcurrentWindow(window.location.href);
    setwindowWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [msgDialogOpen, setmsgDialogOpen] = useState(false);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [projectMenuAnchor, setprojectMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [msgMenuAnchor, setmsgMenuAnchor] = useState<null | HTMLElement>(null);
  const { data, error, mutate, isValidating } = useSWR(
    "http://localhost:3000/api/messages",
    fetcher
  );
  const ProjectMenuState = Boolean(projectMenuAnchor);
  function handleOpenPMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setprojectMenuAnchor(e.currentTarget);
  }
  function handleClosePMenu() {
    setprojectMenuAnchor(null);
  }
  const MsgMenuState = Boolean(msgMenuAnchor);
  function handleOpenMsgMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setmsgMenuAnchor(e.currentTarget);
  }
  function handleCloseMsgMenu() {
    setmsgMenuAnchor(null);
  }
  return (
    <>
      <AppBar sx={{ backgroundColor: "white" }}>
        {windowWidth && windowWidth > 835 ? (
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton
              onClick={() => router.push("/")}
              sx={{ border: "#1976D2 solid 2px" }}
            >
              <CottageIcon sx={{ color: "#1976D2" }} />
            </IconButton>
            <Button
              startIcon={<ScienceIcon />}
              onClick={() => router.push("/experiences")}
            >
              My work Expiriences
            </Button>
            <Button
              startIcon={<HandymanIcon />}
              onClick={(e) => {
                handleOpenPMenu(e);
              }}
            >
              My projects
            </Button>
            <Menu
              anchorEl={projectMenuAnchor}
              open={ProjectMenuState}
              onClose={() => {
                handleClosePMenu();
              }}
            >
              <MenuItem onClick={() => router.push("/projects")}>Menu</MenuItem>
              <Divider />
              <MenuItem>Project 1</MenuItem>
              <MenuItem>Project 2</MenuItem>
              <MenuItem>Project 3</MenuItem>
            </Menu>
            <Button
              startIcon={<SendIcon />}
              onClick={(e) => handleOpenMsgMenu(e)}
            >
              Send me a Message
            </Button>
            <Menu
              open={MsgMenuState}
              onClose={() => {
                handleCloseMsgMenu();
              }}
              anchorEl={msgMenuAnchor}
            >
              <MenuItem onClick={() => router.push("/email")}>
                <ListItemIcon>
                  <ForwardToInboxIcon />
                </ListItemIcon>
                Send an email
              </MenuItem>
              <MenuItem onClick={() => setmsgDialogOpen(true)}>
                <ListItemIcon>
                  <SendTimeExtensionIcon />
                </ListItemIcon>
                Send a message through the database
              </MenuItem>
            </Menu>
            <a
              href="/CV/cvCasimirColas2023.pdf"
              download
              style={{ textDecoration: "none" }}
            >
              <Button startIcon={<DownloadIcon />}>Download my CV</Button>
            </a>
            <IconButton
              size="large"
              onClick={() => {
                setisDrawerOpen(true);
                mutate();
              }}
            >
              <Badge badgeContent={data?.data.length} color="error">
                <EmailIcon sx={{ color: "#1976D2" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        ) : (
          <Toolbar>
            <Button
              onClick={() => setresponsiveNav(true)}
              startIcon={<MenuIcon sx={{ color: "#1976D2" }} />}
            >
              Navigation Menu
            </Button>
          </Toolbar>
        )}
      </AppBar>
      <Drawer
        anchor="top"
        open={responsiveNav}
        onClose={() => setresponsiveNav(false)}
      >
        <div className={styles.topDrawer}>
          <Button
            startIcon={<ScienceIcon />}
            onClick={() => router.push("/experiences")}
          >
            My work Expiriences
          </Button>
          <Button
            startIcon={<HandymanIcon />}
            onClick={(e) => {
              handleOpenPMenu(e);
            }}
          >
            My projects
          </Button>
          <Menu
            open={ProjectMenuState}
            onClose={() => {
              handleClosePMenu();
            }}
            anchorEl={projectMenuAnchor}
          >
            <MenuItem onClick={() => router.push("/projects")}>Menu</MenuItem>
            <Divider />
            <MenuItem>Project 1</MenuItem>
            <MenuItem>Project 2</MenuItem>
            <MenuItem>Project 3</MenuItem>
          </Menu>
          <Button
            startIcon={<SendIcon />}
            onClick={(e) => handleOpenMsgMenu(e)}
          >
            Send me a Message
          </Button>
          <Menu
            open={MsgMenuState}
            onClose={() => {
              handleCloseMsgMenu();
            }}
            anchorEl={msgMenuAnchor}
          >
            <MenuItem onClick={() => router.push("/email")}>
              <ListItemIcon>
                <ForwardToInboxIcon />
              </ListItemIcon>
              Send an email
            </MenuItem>
            <MenuItem onClick={() => setmsgDialogOpen(true)}>
              <ListItemIcon>
                <SendTimeExtensionIcon />
              </ListItemIcon>
              Send a message through the database
            </MenuItem>
          </Menu>
          <a
            href="/CV/cvCasimirColas2023.pdf"
            download
            style={{ textDecoration: "none" }}
          >
            <Button startIcon={<DownloadIcon />}>Download my CV</Button>
          </a>
          <IconButton
            size="large"
            onClick={() => {
              setisDrawerOpen(true);
              mutate();
            }}
          >
            <Badge badgeContent={data?.data.length} color="error">
              <EmailIcon sx={{ color: "#1976D2" }} />
            </Badge>
          </IconButton>
        </div>
      </Drawer>
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
            . I will make sure to read it if you send in a private one ;{")"}
          </p>
          <div className={styles.messageContainer}>
            {data ? (
              data?.data.map((e: MessageTypes, index: number) => (
                <MessageCard
                  key={index}
                  _id={e._id}
                  from={e.from}
                  title={e.title}
                  message={e.content}
                  date={e.sendingDate}
                  window={currentWindow}
                  mutate={() => mutate()}
                />
              ))
            ) : (
              <p>No messages were found how strange... &#129300;</p>
            )}
          </div>
          <div className={styles.contactButtons}>
            <Button
              startIcon={<SendIcon />}
              onClick={() => setmsgDialogOpen(true)}
            >
              Send your own message
            </Button>
            <Button
              startIcon={<ForwardToInboxIcon />}
              onClick={() => router.push("/email")}
            >
              Send me an email directly
            </Button>
          </div>
        </div>
      </Drawer>
      <WriteMessage
        open={msgDialogOpen}
        closeDialog={() => setmsgDialogOpen(false)}
        mutate={() => mutate()}
      />
      {windowWidth && windowWidth < 835 ? (
        <IconButton
          onClick={() => router.push("/")}
          style={{
            backgroundColor: "#1976D2",
            position: "fixed",
            bottom: "25px",
            right: "25px",
            zIndex: "3",
          }}
        >
          <CottageIcon sx={{ color: "white" }} />
        </IconButton>
      ) : null}
    </>
  );
}

export default Navbar;
