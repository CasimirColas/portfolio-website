import styles from "../styles/background.module.css";

function Background() {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        <li style={{ backgroundColor: "#00ACFF" }}></li>
        <li style={{ backgroundColor: "#00C7FE" }}></li>
        <li style={{ backgroundColor: "#00DDE3" }}></li>
        <li style={{ backgroundColor: "#1CEDB7" }}></li>
        <li style={{ backgroundColor: "#A1F68B" }}></li>
        <li style={{ backgroundColor: "#F9F871" }}></li>
        <li style={{ backgroundColor: "#00ACFF" }}></li>
        <li style={{ backgroundColor: "#00C7FE" }}></li>
        <li style={{ backgroundColor: "#00DDE3" }}></li>
        <li style={{ backgroundColor: "#1CEDB7" }}></li>
      </ul>
    </div>
  );
}

export default Background;
