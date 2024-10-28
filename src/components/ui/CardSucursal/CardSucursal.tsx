import styles from "./CardSucursal.module.css";

interface CardSucursalProps {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  imagen: string; 
}

export const CardSucursal: React.FC<CardSucursalProps> = ({ nombre, horarioApertura, horarioCierre, imagen }) => {
  return (
      <div className={styles.ContainerCardPrincipal}>
          <h2>{nombre}</h2> {/* Cambiado para mostrar el nombre de la sucursal */}
          <p>Horario: {horarioApertura} - {horarioCierre}</p>
          <div className={styles.ContainerImage}>
              <img src={imagen} alt={nombre} />
          </div>
          <div className={styles.ContainersIcons}>
              <span className="material-symbols-outlined">edit</span>
              <span className="material-symbols-outlined">delete</span>
              <span className="material-symbols-outlined">visibility</span>
          </div>
      </div>
  );
};

