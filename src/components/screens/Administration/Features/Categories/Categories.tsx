// Importando los componentes y estilos necesarios
import { AdministrationAside } from "../../../../UI/Administration/Aside/AdministrationAside"; // Componente de la barra lateral para el menú de administración
import ListCategories from "../../../../UI/Administration/Categories/ListCategories/ListCategories"; // Componente para mostrar la lista de categorías
import { AdministrationHeader } from "../../../../UI/Administration/Header/AdministrationHeader"; // Componente de encabezado para la página de administración
import styles from "./Categories.module.css"; // Importando el módulo CSS para los estilos

// Componente funcional para renderizar la página de Categorías
export const Categories = () => {
  return (
    <>
      {/* Renderizar el encabezado de administración en la parte superior de la página */}
      <AdministrationHeader />
      
      {/* Contenedor del contenido principal */}
      <div className={styles.mainContent}>
        
        {/* Renderizar la barra lateral (Aside) con las opciones administrativas */}
        <AdministrationAside />
        
        {/* Componente para mostrar una lista de categorías */}
        <ListCategories />
      </div>
    </>
  );
};
