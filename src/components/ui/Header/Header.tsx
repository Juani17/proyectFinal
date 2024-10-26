import { Container, Navbar } from "react-bootstrap";
import styles from'./Header.module.css';

export const Header = () => {
  return (
    <Navbar bg="light" className={styles.principal}>
      <Container className={styles.container}>
        <div className={styles.titleContainer}>
          <Navbar.Brand href="" className={styles.Titulo}>
            MODO ADMINISTRADOR
          </Navbar.Brand>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonLogOut}>
            LOGOUT <span className="material-symbols-outlined"></span>
          </button>
        </div>
      </Container>
    </Navbar>
  );
};