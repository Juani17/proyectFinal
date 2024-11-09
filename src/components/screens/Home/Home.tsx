import { Aside } from "../../UI/HomeComps/Aside/Aside";
import { Header } from "../../UI/HomeComps/HomeHeader/Header";
import { ViewSucursals } from "../../UI/HomeComps/Modals/ViewSucursals/ViewSucursals";
import styles from "./Home.module.css";

export const Home = () => {
  // Limpia el almacenamiento local al cargar la pantalla de inicio
  localStorage.clear();

  return (
    <>
      {/* Header: Encabezado principal de la pantalla */}
      <Header />

      <div className={styles.mainContainer}>
        {/* Aside: Barra lateral con opciones de navegación adicional */}
        <Aside />

        {/* ViewSucursals: Componente para visualizar sucursales en un modal */}
        <ViewSucursals />
      </div>
    </>
  );
};
