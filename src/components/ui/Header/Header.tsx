import { Container, Navbar } from "react-bootstrap"; // Asegúrate de que tienes bootstrap instalado
import styles from "./Header.module.css"; // Asegúrate de que la ruta sea correcta
import { useModalContext } from "../../../context/ModalContext";

export const Header = () => {
  const { isOpenModal, isOpenSucursalModal } = useModalContext();

  return (
    <Navbar
      bg="light"
      className={`${styles.principal} ${
        isOpenModal || isOpenSucursalModal ? styles.blurredBackground : ""
      }`}
    >
      <Container className={styles.container}>
        <div className={styles.titleContainer}>
          <Navbar.Brand href="" className={styles.Titulo}>
            MODO ADMINISTRADOR
          </Navbar.Brand>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonLogOut}>LOGOUT</button>
        </div>
      </Container>
    </Navbar>
  );
};
