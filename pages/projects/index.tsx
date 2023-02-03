import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import styles from "../../styles/projectsPage.module.css";
import { Button } from "@mui/material";

function ProjectsPage() {
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
        <h1>Welcome to my projects summary</h1>
        <div className={styles.projectImageContainer}>
          <div className={styles.hoverContent}>
            <img src="/images/projectsPreview/gol.png" />
            <div className={styles.buttonLine}>
              <Button variant="outlined" sx={{ width: "200px" }}>
                More Details
              </Button>
              <a
                href="https://casimircolas.github.io/Conway-Game-of-Life/"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" sx={{ width: "200px" }}>
                  Consult the webpage
                </Button>
              </a>
            </div>
          </div>
          <div className={styles.hoverContent}>
            <img src="/images/projectsPreview/pokezone.png" />
            <div className={styles.buttonLine}>
              <Button variant="outlined" sx={{ width: "200px" }}>
                More Details
              </Button>
              <a
                href="https://pokezone-project.netlify.app/"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" sx={{ width: "200px" }}>
                  Consult the webpage
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectsPage;
