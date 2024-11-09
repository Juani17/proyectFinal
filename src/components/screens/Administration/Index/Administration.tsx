// Importamos los componentes necesarios para la interfaz de administración
import { AdministrationAside } from "../../../UI/Administration/Aside/AdministrationAside"; // Componente de barra lateral de administración
import { AdministrationHeader } from "../../../UI/Administration/Header/AdministrationHeader"; // Componente de encabezado de administración
import { AdministrationHero } from "../../../UI/Administration/Hero/AdministrationHero"; // Componente que actúa como "hero" o contenido destacado de administración
import styles from "./Administration.module.css"; // Importamos los estilos CSS específicos para este componente

// Definimos el componente funcional 'Administration'
export const Administration = () => {
  return (
    <>
      {/* Componente de encabezado, que muestra el encabezado de la sección de administración */}
      <AdministrationHeader />

      {/* Contenedor principal que usa clases CSS definidas en 'Administration.module.css' */}
      <div className={styles.main}>
        {/* Componente de barra lateral de administración */}
        <AdministrationAside />

        {/* Componente 'hero' o sección destacada de la administración */}
        <AdministrationHero />
      </div>
    </>
  );
};
