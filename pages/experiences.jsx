import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import styles from "../styles/experiences.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useRef } from "react";
import useOnScreen from "@/hooks/OnScreen";

function ExperiencesPage() {
  const myRefcard1 = useRef(null);
  const myRefcard2 = useRef(null);
  const isCard1Visible = useOnScreen(myRefcard1);
  const isCard2Visible = useOnScreen(myRefcard2);
  const scrollToCard1 = () => myRefcard1.current.scrollIntoView();
  const scrollToCard2 = () => myRefcard2.current.scrollIntoView();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Background />
      <Navbar />
      <main className={styles.main}>
        <Card className={styles.card} ref={myRefcard1}>
          <CardHeader
            title="Ircad"
            subheader="from May to June 2021"
            sx={{ textAlign: "left" }}
          />
          <CardMedia>
            <ImageListItem>
              <img src="/images/exp/ircadBanner.jpg" alt="banner image" />
              <ImageListItemBar
                sx={{
                  background: "rgba(0, 0, 0, 0)",
                }}
                position="top"
                actionPosition="left"
                actionIcon={
                  <img
                    src="/images/exp/ircadLogo.png"
                    style={{
                      width: "150px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      marginTop: "15px",
                      marginLeft: "15px",
                    }}
                    alt="logo image"
                  />
                }
              ></ImageListItemBar>
            </ImageListItem>
          </CardMedia>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              sunt, illo, vero adipisci officia distinctio culpa blanditiis
              dolorem numquam id quae maxime neque at impedit. Soluta quo
              blanditiis obcaecati quis!
            </p>
            <Accordion sx={{ backgroundColor: "#f5f5f5" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#1976D2" }} />}
              >
                <Typography sx={{ color: "#1976D2" }}>
                  Learn more about this experience...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
        <Card className={styles.card} ref={myRefcard2}>
          <CardHeader
            title="Karl Storz"
            subheader="from May to June 2020"
            sx={{ textAlign: "left" }}
          />
          <CardMedia>
            <ImageListItem>
              <img src="/images/exp/ksBanner.jpg" alt="banner image" />
              <ImageListItemBar
                sx={{
                  background: "rgba(0, 0, 0, 0)",
                }}
                position="top"
                actionPosition="left"
                actionIcon={
                  <img
                    src="/images/exp/ksLogo.png"
                    style={{
                      width: "150px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      marginTop: "15px",
                      marginLeft: "15px",
                    }}
                    alt="logo image"
                  />
                }
              ></ImageListItemBar>
            </ImageListItem>
          </CardMedia>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              sunt, illo, vero adipisci officia distinctio culpa blanditiis
              dolorem numquam id quae maxime neque at impedit. Soluta quo
              blanditiis obcaecati quis!
            </p>
            <Accordion sx={{ backgroundColor: "#f5f5f5" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#1976D2" }} />}
              >
                <Typography sx={{ color: "#1976D2" }}>
                  Learn more about this experience...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <RadioGroup row>
        <Radio checked={isCard1Visible} onClick={scrollToCard1} />
        <Radio checked={isCard2Visible} onClick={scrollToCard2} />
      </RadioGroup>
    </div>
  );
}

export default ExperiencesPage;
