import { Container, Navbar } from "react-bootstrap"; // Asegúrate de tener Bootstrap instalado
import styles from "./Header.module.css"; // Asegúrate de que la ruta sea correcta
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

export const Header = () => {
  // Extrae los valores 'isOpenModal' e 'isOpenSucursalModal' del estado de Redux
  const isOpenModal = useSelector((state: RootState) => state.modal.isOpenModal);
  const isOpenSucursalModal = useSelector((state: RootState) => state.modal.isOpenSucursalModal);

  return (
    // Define una barra de navegación (Navbar) con un color de fondo claro (light)
    <Navbar
      bg="light"
      // Aplica las clases de estilo 'principal' y 'blurredBackground' si algún modal está abierto
      className={`${styles.principal} ${
        isOpenModal || isOpenSucursalModal ? styles.blurredBackground : ""
      }`}
    >
      {/* Container para organizar el contenido de la Navbar */}
      <Container className={styles.container}>
        
        {/* Contenedor para el título de la aplicación */}
        <div className={styles.titleContainer}>
          {/* Componente de marca de la Navbar, muestra el título en modo administrador */}
          <Navbar.Brand href="" className={styles.Titulo}>
            MODO ADMINISTRADOR
          </Navbar.Brand>
        </div>

        {/* Contenedor para el botón de cerrar sesión */}
        <div className={styles.buttonContainer}>
          {/* Botón de logout con estilo personalizado */}
          <button className={styles.buttonLogOut}>LOGOUT</button>
        </div>
      </Container>
    </Navbar>
  );
};
