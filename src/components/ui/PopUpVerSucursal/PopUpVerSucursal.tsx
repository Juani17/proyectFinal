import Modal from '../modal/Modal';
import { ISucursales } from '../../../types/ISucursales';
import styles from './PopUpVerSucursal.module.css';

interface PopUpVerSucursalProps {
  isOpen: boolean;
  onClose: () => void;
  sucursal: ISucursales;
}

const PopUpVerSucursal: React.FC<PopUpVerSucursalProps> = ({ isOpen, onClose, sucursal }) => {
  return (
    isOpen ? (
      <Modal>
        <div className={styles.modalContent}>
          <h2>Sucursal</h2>
          <p><strong>Nombre:</strong> {sucursal.nombre}</p>
          <p><strong>Horario apertura:</strong> {sucursal.horarioApertura}</p>
          <p><strong>Horario cierre:</strong> {sucursal.horarioCierre}</p>
          <p><strong>País:</strong> {sucursal.pais}</p>
          <p><strong>Provincia:</strong> {sucursal.provincia}</p>
          <p><strong>Latitud:</strong> {sucursal.latitud}</p>
          <p><strong>Longitud:</strong> {sucursal.longitud}</p>
          <p><strong>Dirección:</strong> {sucursal.nombreCalle} {sucursal.numeroCalle}</p>
          <p><strong>Código Postal:</strong> {sucursal.codigoPostal}</p>
          <p><strong>Número Piso:</strong> {sucursal.numeroPiso}</p>
          <p><strong>Número Departamento:</strong> {sucursal.numeroDepartamento}</p>
          <p><strong>Imagen:</strong></p>
          {sucursal.imagen ? (
            <img src={sucursal.imagen} alt="Imagen de la Sucursal" />
          ) : (
            <p>No tiene</p>
          )}
          <button onClick={onClose}>Cerrar</button>
        </div>
      </Modal>
    ) : null
  );
};

export default PopUpVerSucursal;
