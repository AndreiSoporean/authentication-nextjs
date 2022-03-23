import { User } from "../../models/users";
import styles from "./UserWelcome.module.css";

const UserWelcome: React.FC<User> = ({ user }: User) => {
  return <div className={styles.username}>{`Welcome, ${user.name}`}</div>;
};

export default UserWelcome;
