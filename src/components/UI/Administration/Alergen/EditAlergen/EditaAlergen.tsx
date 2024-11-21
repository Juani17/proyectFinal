import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './EditAlergen.module.css';
import { IImagen } from '../../../../../endPoints/types/IImagen';
import { ICreateAlergeno } from '../../../../../endPoints/types/dtos/alergenos/ICreateAlergeno';
import { alergenoService } from '../../../../../Services/alergenoServices';
import Swal from 'sweetalert2';
import { UploadImage } from '../../Products/ModalAddProduct/UploadImage';
import { IAlergenos } from '../../../../../endPoints/types/dtos/alergenos/IAlergenos';


interface IModalEdit {
  closeModalEdit: () => void;
  alergenoId: number; // ID del alérgeno a editar
}

const ModalEditAlergen: FC<IModalEdit> = ({ closeModalEdit, alergenoId }) => {
  const [imageAlergeno, setImageAlergeno] = useState<IImagen | null>(null);
  const [editAlergen, setEditAlergen] = useState<ICreateAlergeno>({
    denominacion: '',
    imagen: null
  });

  useEffect(() => {
    const fetchAlergeno = async () => {
      try {
        const alergeno = await alergenoService.getAlergenoById(alergenoId);
        setEditAlergen({
          denominacion: alergeno.denominacion,
          imagen: alergeno.imagen || null
        });
        setImageAlergeno(alergeno.imagen || null);
      } catch (error) {
        console.error("Error al cargar el alérgeno:", error);
      }
    };
    fetchAlergeno();
  }, [alergenoId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAlergen((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
 // Validación para asegurarse de que la denominación no esté vacía
 if (!editAlergen.denominacion) {
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
if (!imageAlergeno && editAlergen.imagen == null) {
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
  // Crear el objeto para actualizar el alérgeno
  const alergenoToUpdate: IAlergenos = {
      id: alergenoId,
      denominacion: editAlergen.denominacion,
      imagen: imageAlergeno ?? editAlergen.imagen,
  };

  // Llamar al servicio para actualizar el alérgeno
  await alergenoService.updateAlergeno(alergenoId, alergenoToUpdate);

  // Mostrar mensaje de éxito
  Swal.fire({
      icon: "success",
      title: "¡Alérgeno actualizado!",
      text: "El alérgeno se ha actualizado correctamente.",
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
          closeModalEdit(); // Cerrar el modal
          window.location.reload(); // Recargar la página
      },
  });
} catch (error) {
  console.error("El problema es: ", error);

  // Mostrar mensaje de error
  Swal.fire({
      icon: "error",
      title: "¡Error al actualizar alérgeno!",
      text: "Algo salió mal al intentar actualizar el alérgeno. Inténtelo nuevamente más tarde.",
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

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModalEdit();
  };

  return (
    <form className={styles.ModalEditAlergen}>
      <div className={styles.containerBody}>
      <div className={styles.ModalEditAlergenTitle}>Editar Alergeno</div>


      <input
        type="text"
        name="denominacion"
        placeholder="Editar denominación"
        value={editAlergen.denominacion}
        className={styles.ModalEditAlergenInput}
        onChange={handleChange}
      />
      <div className={styles.uploadImage}>

      <UploadImage 
        imageObjeto={imageAlergeno}
        setImageObjeto={setImageAlergeno}
        typeElement="images"
        />
        </div>

      <div className={styles.ModalEditAlergenButtons}>
        <button className={styles.ModalConfirm} onClick={handleSubmit}>
          CONFIRMAR
        </button>
        <button className={styles.ModalCancel} onClick={handleCancel}>
          CANCELAR
        </button>
      </div>
        </div>
    </form>
  );
};

export default ModalEditAlergen;
