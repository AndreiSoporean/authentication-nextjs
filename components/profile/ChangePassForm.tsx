import { MutableRefObject, useRef } from "react";
import styles from "../authentication/AuthForm.module.css";

const ChangePasswordForm: React.FC = () => {
  const newPassword = useRef() as MutableRefObject<HTMLInputElement>;
  const oldPassword = useRef() as MutableRefObject<HTMLInputElement>;

  const onChangePassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const inputOldPass = oldPassword.current.value;
    const inputNewPass = newPassword.current.value;

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: inputOldPass,
        newPassword: inputNewPass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log({ data });
  };

  return (
    <form className={styles.form} onSubmit={onChangePassword}>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>New Password:</label>
        <input
          className={styles.textfield}
          type="password"
          required
          ref={newPassword}
        />
      </div>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>Old Password:</label>
        <input
          className={styles.textfield}
          type="password"
          required
          ref={oldPassword}
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
