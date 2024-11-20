import styles from "./Header.module.css";
import logo from "../../../../assets/logo.png"
export const Header = () => {



  return (
    <header className={styles.header}>
      <img 
        src={logo}
        alt="Logo de JavaChispas"
        className={styles.header__logoImg}
      />
      <h1 className={styles.header__logo}>JavaChispas</h1>
    </header>
  )
}
