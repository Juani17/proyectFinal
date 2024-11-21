import { FC, useState } from "react";
import { ISucursal } from "../../../../../endPoints/types/dtos/sucursal/ISucursal";
import { Button, Card } from "react-bootstrap";
import styles from "../CardSucursals/CardSucursal.module.css";
import { useDispatch } from "react-redux";
import { setSelectedSucursal } from "../../../../../redux/slices/sucursalSlice";
import ModalViewSucursal from "../../Modals/ModalViewSucursal/ModalViewSucursal";
import ModalEditSucursal from "../../Modals/ModalEditSucursal/ModalEditSucursal";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

interface ICardSucursal {
  sucursal: ISucursal;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal }) => {
  const [activeModal, setActiveModal] = useState<"view" | "edit" | null>(null); // Estado unificado para los modales
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectSucursal = () => {
    if (sucursal) {
      localStorage.setItem("sucursal", JSON.stringify(sucursal));
      dispatch(setSelectedSucursal(sucursal));
      navigate(`/administracion`);
    }
  };

  const handleButtonShow = () => setActiveModal("view");
  const handleButtonEdit = () => setActiveModal("edit");
  const handleCloseModal = () => setActiveModal(null);

  if (!sucursal) return null; // Validación para evitar errores si falta `sucursal`

  return (
    <>
      <Card className={`card ${styles.card}`}>
        <Card.Body className={`card-body ${styles.cardBody}`}>
          <img
            className={`card-img ${styles.cardImg}`}
            onClick={handleSelectSucursal}
            src={
              sucursal.logo
                ? sucursal.logo
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"
            }
            alt={`Logo de ${sucursal.nombre}`}
          />
          <Card.Title onClick={handleSelectSucursal}>
            {sucursal.nombre}
          </Card.Title>
          <Card.Subtitle onClick={handleSelectSucursal}>
            {sucursal.horarioApertura} - {sucursal.horarioCierre}
          </Card.Subtitle>
          <div className={`container-buttons ${styles.containerButtons}`}>
            <Button
              onClick={handleButtonShow}
              aria-label={`Ver detalles de ${sucursal.nombre}`}
            >
              Ver
            </Button>
            <Button
              onClick={handleButtonEdit}
              variant="secondary"
              aria-label={`Editar detalles de ${sucursal.nombre}`}
            >
              Editar
            </Button>
          </div>
        </Card.Body>
      </Card>

      {activeModal === "view" &&
        ReactDOM.createPortal(
          <>
            <div className={styles.backgroundDisabled}></div>
            <ModalViewSucursal
              sucursal={sucursal}
              modalClose={handleCloseModal}
            />
          </>,
          document.body
        )}

      {activeModal === "edit" &&
        ReactDOM.createPortal(
          <>
            <div className={styles.backgroundDisabled}></div>
            <ModalEditSucursal
              modalCloseEdit={handleCloseModal}
              sucursal={sucursal}
            />
          </>,
          document.body
        )}
    </>
  );
};
