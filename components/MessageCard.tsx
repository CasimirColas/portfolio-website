import styles from "../styles/messageCard.module.css";

interface Props {
  from: string;
  title: string;
  message: string;
  date: string;
}

function MessageCard({ from, title, message, date }: Props) {
  return (
    <div className={styles.main}>
      <h4>{title}</h4>
      <p style={{ color: "#00ACFF" }}>from: {from}</p>
      <p>{message}</p>
      <i>Message sent: {date}</i>
    </div>
  );
}

export default MessageCard;
