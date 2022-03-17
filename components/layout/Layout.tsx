import Header from "../header/Header"
import styles from "./Layout.module.css"

const Layout: React.FC = ({ children }) => {
  return (
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  )
}

export default Layout