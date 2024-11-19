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
  
    if (!editAlergen.denominacion) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La denominación es obligatoria.",
      });
      return;
    }
  
    // Validar que se haya seleccionado una imagen
    if (!imageAlergeno && editAlergen.imagen == null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe cargar una imagen.",
      });
      return;
    }
  
    try {
      const alergenoToUpdate: IAlergenos = {
        id: alergenoId,
        denominacion: editAlergen.denominacion,
        imagen: imageAlergeno ?? editAlergen.imagen,
      };
  
      await alergenoService.updateAlergeno(alergenoId, alergenoToUpdate);
  
      Swal.fire({
        icon: "success",
        title: "Alergeno actualizado",
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModalEdit();
          window.location.reload();
        },
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
