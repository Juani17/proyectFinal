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

    // Validación para asegurarse de que el campo de denominación no esté vacío
    if (!newAlergen.denominacion) {
      Swal.fire({
          icon: "warning",
          title: "Información incompleta",
          text: "La denominación es obligatoria.",
          customClass: {
              popup: "custom-popup-warning",
              title: "custom-title-warning",
              htmlContainer: "custom-content-warning",
              confirmButton: "custom-button-warning",
          },
          background: "#fff8e1",
          color: "#856404",
          confirmButtonColor: "#ffcc00",
          confirmButtonText: "Completar",
      });
      return;
  }

  // Validar que se haya seleccionado una imagen
  if (!imageAlergeno && newAlergen.imagen == null) {
      Swal.fire({
          icon: "warning",
          title: "Imagen requerida",
          text: "Debe cargar una imagen.",
          customClass: {
              popup: "custom-popup-warning",
              title: "custom-title-warning",
              htmlContainer: "custom-content-warning",
              confirmButton: "custom-button-warning",
          },
          background: "#fff8e1",
          color: "#856404",
          confirmButtonColor: "#ffcc00",
          confirmButtonText: "Completar",
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

      // Mostrar mensaje de éxito
      Swal.fire({
          icon: "success",
          title: "¡Alérgeno agregado!",
          text: "El alérgeno se ha agregado correctamente.",
          customClass: {
              popup: "custom-popup-success",
              title: "custom-title-success",
              htmlContainer: "custom-content-success",
              confirmButton: "custom-button-success",
          },
          background: "linear-gradient(135deg, #e0f7fa, #80deea)",
          color: "#004d40",
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
              closeModalAdd(); // Cerrar el modal al terminar
              window.location.reload(); // Recargar la página
          },
      });
  } catch (error) {
      console.error("El problema es: ", error);

      // Mostrar mensaje de error
      Swal.fire({
          icon: "error",
          title: "¡Error al agregar alérgeno!",
          text: "Algo salió mal al intentar agregar el alérgeno. Inténtelo nuevamente más tarde.",
          customClass: {
              popup: "custom-popup-error",
              title: "custom-title-error",
              htmlContainer: "custom-content-error",
              confirmButton: "custom-button-error",
          },
          background: "#fbe9e7",
          color: "#d32f2f",
          confirmButtonColor: "#f44336",
          confirmButtonText: "Entendido",
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
