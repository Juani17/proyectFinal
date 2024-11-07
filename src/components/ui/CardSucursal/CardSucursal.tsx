import styles from "./CardSucursal.module.css";

interface CardSucursalProps {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  imagen: string;
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const CardSucursal: React.FC<CardSucursalProps> = ({
  nombre,
  horarioApertura,
  horarioCierre,
  imagen,
  onView,
  onDelete,
  onEdit,
}) => {
  return (
    <div className={styles.ContainerCardPrincipal}>
      <h2>{nombre}</h2>
      <p>
        Horario: {horarioApertura} - {horarioCierre}
      </p>
      <div className={styles.ContainerImage}>
        <img src={imagen} alt={nombre} />
      </div>
      <div className={styles.ContainersIcons}>
        <i
          className="fa-solid fa-eye"
          style={{ color: "#086A87", cursor: "pointer" }}
          onClick={onView}
        ></i>
        <i
          className="fa-solid fa-trash"
          style={{ color: "#c9410b", cursor: "pointer" }}
          onClick={onDelete}
        ></i>
        <i
          className="fa-solid fa-pencil"
          style={{ color: "#17985A", cursor: "pointer" }}
          onClick={onEdit}
        ></i>
      </div>
    </div>
  );
};
