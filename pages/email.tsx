import styles from "../styles/emailPage.module.css";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SendEmailPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className={styles.main}>
        <h2>Send me an Email</h2>
        <div className={styles.inputFields}>
          <TextField
            fullWidth
            value={"casimir.colas@outlook.com"}
            disabled
            InputProps={{
              startAdornment: <p style={{ width: "50px" }}>to :</p>,
            }}
          />
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <p style={{ width: "50px", color: "rgba(0, 0, 0, 0.6)" }}>
                  from :
                </p>
              ),
            }}
          />
          <TextField fullWidth label="Title" />
          <TextField fullWidth multiline rows={7} label="Message" />
        </div>
        <Button variant="contained">Send</Button>
      </main>
    </>
  );
}

export default SendEmailPage;
