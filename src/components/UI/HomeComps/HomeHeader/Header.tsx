import styles from "./Header.module.css";

export const Header = () => {



    // Me gustaría que al apretar adminEmpresas.com vuelva al inicio.
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>adminEmpresas.com</h1>
      
    </header>
  )
}
