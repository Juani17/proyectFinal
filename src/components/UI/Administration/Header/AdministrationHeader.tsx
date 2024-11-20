import { Button } from "react-bootstrap"; // Importa el componente de botón de React Bootstrap
import styles from "../../../UI/Administration/Header/AdministrationHeader.module.css"; // Importa los estilos específicos para el encabezado
import { useNavigate } from "react-router-dom"; // Hook de React Router para la navegación
import { AnimatedButton } from "../../AnimatedButtons/AnimatedButton";

export const AdministrationHeader = () => {
  const navigate = useNavigate();

  // Función para manejar la navegación al inicio
  const handleNavigateHome = () => {
    navigate("/"); // Navega hacia la ruta principal
  };

  return (
    <header className={styles.header}>
      {/* Botón para navegar hacia atrás */}
      <AnimatedButton />
      {/* Botón para ir al inicio */}
      <Button className={styles.headerBtn} onClick={handleNavigateHome}>
        <span className="material-symbols-outlined">home</span>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Button>
    </header>
  );
};
