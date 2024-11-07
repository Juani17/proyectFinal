import Modal from '../modal/Modal';
import { IEmpresa } from '../../../types/IEmpresa';
import styles from'./PopUpVerEmpresa.module.css';
import { useEffect, useState } from 'react';

interface PopUpVerEmpresaProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: IEmpresa;
}

const PopUpVerEmpresa: React.FC<PopUpVerEmpresaProps> = ({ isOpen, onClose, empresa }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Función para manejar la conversión del logo
    const handleLogo = () => {
      if (!empresa.logo) {
        setLogoUrl(null);
        return;
      }

      if (empresa.logo instanceof File) {
        // Si es un File, crear URL temporal
        const url = URL.createObjectURL(empresa.logo);
        setLogoUrl(url);
        
        // Limpiar URL cuando el componente se desmonte
        return () => URL.revokeObjectURL(url);
      } else {
        // Si es string (URL), usarla directamente
        setLogoUrl(empresa.logo);
      }
    };

    handleLogo();
  }, [empresa.logo]);

  return (
    isOpen ? (
      <Modal>
        <div className={styles.modalContent}>
          <h2>Detalles de la Empresa</h2>
          <p><strong>Nombre:</strong> {empresa.nombre}</p>
          <p><strong>Razón Social:</strong> {empresa.razonSocial}</p>
          <p><strong>Cuit:</strong> {empresa.cuit}</p>
          <p><strong>Logo:</strong></p>
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo de la Empresa" 
              className={styles.logoImage}
            />
          ) : (
            <p>No tiene</p>
          )}
          <button onClick={onClose}>Cerrar</button>
        </div>
      </Modal>
    ) : null
  );
};

export default PopUpVerEmpresa;