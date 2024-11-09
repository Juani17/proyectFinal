// Importamos los componentes necesarios para la interfaz de administración
import { AdministrationAside } from "../../../../UI/Administration/Aside/AdministrationAside" // Componente de barra lateral
import { AdministrationHeader } from "../../../../UI/Administration/Header/AdministrationHeader" // Componente del encabezado
import styles from "./Products.module.css"; // Importamos los estilos CSS específicos para este componente
import { ListProducts } from "../../../../UI/Administration/Products/ListProducts/ListProducts"; // Componente para listar productos

// Definimos el componente funcional 'Products'
export const Products = () => {
  return (
    <>
      {/* Componente de encabezado, que muestra el encabezado de la sección de administración */}
      <AdministrationHeader />
      
      {/* Contenedor principal que usa clases CSS definidas en 'Products.module.css' */}
      <div className={styles.mainContent}>
        
        {/* Componente de barra lateral */}
        <AdministrationAside />
        
        {/* Contenedor específico para el contenido relacionado con productos */}
        <div className={styles.contentHero}>
          
          {/* Componente que lista los productos */}
          <ListProducts/>          
        </div>
      </div>
    </>
  )
}
