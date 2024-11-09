import { Button } from "react-bootstrap"; // Importa el componente de botón de React Bootstrap
import styles from "../../../UI/Administration/Header/AdministrationHeader.module.css"; // Importa los estilos específicos para el encabezado
import { useNavigate } from "react-router-dom"; // Hook de React Router para la navegación

// Enlace a una fuente de íconos de Google (esto no se usa directamente en JSX, debería importarse en el HTML)
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back"
/>;

// Componente de encabezado para la administración
export const AdministrationHeader = () => {
  // Hook para la navegación programática
  const navigate = useNavigate();

  // Función para manejar la navegación hacia atrás en el historial de navegación
  const handleNavigateBack = () => {
    navigate(-1); // Navega hacia la página anterior
  };

  return (
    // Contenedor del encabezado con la clase de estilo aplicada
    <header className={styles.header}>
      {/* Botón con ícono para navegar hacia atrás */}
      <Button className={styles.headerBtn} onClick={handleNavigateBack}>
        <span className="material-symbols-outlined">
          arrow_back {/* Ícono que representa una flecha hacia atrás */}
        </span>
      </Button>
    </header>
  );
};
