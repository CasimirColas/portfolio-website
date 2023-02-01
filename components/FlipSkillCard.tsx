import styles from "../styles/flipCard.module.css";
import Card from "@mui/material/Card";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";

interface Props {
  image: string;
  name: string;
}

function FlipSkillCard({ name, image }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <Card className={styles.front}>
          <img src={image} alt="skill image" />
          <p className={styles.skillname}>{name}</p>
        </Card>
        <Card className={styles.back}>
          <p>More Info here</p>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Card>
      </div>
    </div>
  );
}

export default FlipSkillCard;
