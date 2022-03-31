import { Alert, Snackbar } from "@mui/material";
import { MutableRefObject, useRef, useState } from "react";
import { CreateUser } from "../../models/users";
import styles from "./AuthForm.module.css";

const createUser = async (formData: CreateUser) => {
  const result = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();

  return data;
};

const SignupForm: React.FC = () => {
  const username = useRef() as MutableRefObject<HTMLInputElement>;
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    const result = await createUser(formData);

    if (!result?.error) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setSnackOpen(true);
    setSnackMessage(result.message);
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
          severity={isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.labelAndInput}>
          <label className={styles.inputLabel}>Name:</label>
          <input
            className={styles.textfield}
            type="text"
            required
            ref={username}
          />
        </div>
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
          Create Account
        </button>
      </form>
    </>
  );
};

export default SignupForm;
