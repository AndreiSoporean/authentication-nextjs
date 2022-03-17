import styles from "./AuthForm.module.css";
import { signIn } from "next-auth/client";
import { MutableRefObject, useRef } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const router = useRouter();

  const loginHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: email.current.value,
      password: password.current.value,
    });

    if (!result?.error) {
      router.replace("/profile");
    }
  };

  return (
    <form className={styles.form} onSubmit={loginHandler}>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>Email:</label>
        <input className={styles.textfield} type="text" required ref={email} />
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
  );
};

export default LoginForm;
