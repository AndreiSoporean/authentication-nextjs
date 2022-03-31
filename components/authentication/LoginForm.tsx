import styles from "./AuthForm.module.css";
import { signIn } from "next-auth/client";
import React, { MutableRefObject, useRef, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm: React.FC = () => {
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const router = useRouter();

  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");

  const loginHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: email.current.value,
      password: password.current.value,
    });

    if (!result?.error) {
      router.replace("/profile");
    } else {
      setSnackOpen(true);
      setSnackMessage(result.error);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.labelAndInput}>
          <label className={styles.inputLabel}>Email:</label>
          <input
            className={styles.textfield}
            type="text"
            required
            ref={email}
          />
        </div>
        <div className={styles.labelAndInput}>
          <label className={styles.inputLabel}>Password:</label>
          <input
            className={styles.textfield}
            type="password"
            required
            ref={password}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
