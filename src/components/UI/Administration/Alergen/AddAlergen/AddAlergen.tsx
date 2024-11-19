import { ChangeEvent, FC, useState } from 'react';
import styles from './AddAlergen.module.css';

import Swal from 'sweetalert2';
import { IImagen } from '../../../../../endPoints/types/IImagen';
import { ICreateAlergeno } from '../../../../../endPoints/types/dtos/alergenos/ICreateAlergeno';
import { alergenoService } from '../../../../../Services/alergenoServices';
import { UploadImage } from '../../Products/ModalAddProduct/UploadImage';

interface IModalAdd {
  closeModalAdd: () => void;
}

const ModalAddAlergen: FC<IModalAdd> = ({ closeModalAdd }) => {
  const [imageAlergeno, setImageAlergeno] = useState<IImagen | null>(null);

  const initialState = {
    denominacion: '',
    imagen: imageAlergeno ? imageAlergeno : null
  };
  const [newAlergen, setNewAlergen] = useState<ICreateAlergeno>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAlergen((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

   
    if (!newAlergen.denominacion) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La denominación es obligatoria.",
      });
      return;
    }
  
    // Validar que se haya seleccionado una imagen
    if (!imageAlergeno && newAlergen.imagen == null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe cargar una imagen.",
      });
      return;
    }

    try {
      // Crea el objeto del alérgeno incluyendo la imagen cargada (si existe)
      const alergenoToCreate = {
        ...newAlergen,
        imagen: imageAlergeno || null, // Utiliza directamente la imagen subida
      };

      // Crear el alérgeno en el servidor
      await alergenoService.createAlergeno(alergenoToCreate);

      Swal.fire({
        icon: "success",
        title: "Alergeno agregado",
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModalAdd();
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("El problema es: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <form className={styles.ModalAddAlergen}>
        <div className={styles.containerBody}>

        <div className={styles.ModalAddAlergenTitle}>Crear un alergeno</div>

        <input
          type="text"
          name="denominacion"
          placeholder="Ingresa una denominación"
          className={styles.ModalAddAlergenInput}
          onChange={handleChange}
        />
        <div className={styles.uploadImage}>

        <UploadImage
          imageObjeto={imageAlergeno}
          setImageObjeto={setImageAlergeno}
          typeElement="alergenos"
          />
        </div>


        <div className={styles.ModalAddAlergenButtons}>
          <button className={styles.ModalConfirm} onClick={handleSubmit}>
            CONFIRMAR
          </button>
          <button className={styles.ModalCancel} onClick={closeModalAdd}>
            CANCELAR
          </button>
        </div>
        </div>
      </form>
    </>
  );
};

export default ModalAddAlergen;
