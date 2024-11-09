import { useSelector } from 'react-redux'; // Hook para acceder al estado de Redux
import styles from '../../../UI/Administration/Hero/AdministrationHero.module.css'; // Importa los estilos específicos para el componente
import { RootState } from '../../../../redux/store/store'; // Importa el tipo de estado raíz de Redux

// Componente para mostrar el encabezado de administración de la sucursal
export const AdministrationHero = () => {

  // Selecciona la sucursal actualmente seleccionada del estado de Redux
  const selectedSucursal = useSelector(
    (state: RootState) => state.sucursal.selectedSucursal // Accede al estado `selectedSucursal` en el slice `sucursal`
  );

  return (
    // Contenedor principal del héroe con la clase de estilo aplicada
    <div className={styles.hero}>
      {/* Muestra el nombre de la sucursal seleccionada en un encabezado */}
      <h3>Administracion de la sucursal: {selectedSucursal?.nombre}</h3>
    </div>
  );
};
