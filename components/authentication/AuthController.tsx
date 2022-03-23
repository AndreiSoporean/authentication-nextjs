import { useState } from "react";
import styles from "./AuthController.module.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthController: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = (): void => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={styles.main}>
      {isLogin ? (
        <>
          <div className={styles.formTitle}>Login</div>
          <LoginForm />
          <div onClick={toggleForm} className={styles.formToggle}>
            Create new account
          </div>
        </>
      ) : (
        <>
          <div className={styles.formTitle}>Sign up</div>
          <SignupForm />
          <div onClick={toggleForm} className={styles.formToggle}>
            Login into your account
          </div>
        </>
      )}
    </div>
  );
};

export default AuthController;
