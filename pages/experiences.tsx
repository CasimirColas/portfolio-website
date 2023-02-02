import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import styles from "../styles/experiences.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

function ExperiencesPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Background />
      <Navbar />
      <main className={styles.main}>
        <Card>
          <CardHeader title="Ircad" />
          <CardMedia component="img" src="/images/exp/ircadBanner.jpg" />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              sunt, illo, vero adipisci officia distinctio culpa blanditiis
              dolorem numquam id quae maxime neque at impedit. Soluta quo
              blanditiis obcaecati quis!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default ExperiencesPage;
