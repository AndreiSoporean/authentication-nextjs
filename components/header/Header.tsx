import styles from "../layout/Layout.module.css"
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";

const Header: React.FC = () => {
  const [session, loading] = useSession();

  const logOutHandler = (e: React.SyntheticEvent) => {

    signOut();
  }

  console.log({ session })
  return <div className={styles.header}>
    <p className={styles.title}>Next JS - Authentication</p>
    <ul className={styles.navigation}>
      <li className={styles.menuBtn}><Link href={"/"}>Home</Link></li>
      {!session && !loading && (
        <li className={styles.menuBtn}><Link href={"/auth"}>Login</Link></li>
      )}
      {session && (
        <li className={styles.menuBtn}><Link href={"/profile"}>Profile</Link></li>
      )}
      {session && (
        <li className={styles.menuBtn}><button onClick={logOutHandler}>Log Out</button></li>
      )}
    </ul>
  </div>
}

export default Header;