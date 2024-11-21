// ModalAddCategory.tsx
import { ChangeEvent, FC, useState } from 'react';
import styles from './ModalAddCategory.module.css';
import { ICreateCategoria } from '../../../../../endPoints/types/dtos/categorias/ICreateCategoria';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store/store'; 
import { categoryService } from '../../../../../Services/categoryServices';

interface IModalAddCategory {
  closeModalAdd: () => void;
  onAddCategory: (newCategory: ICreateCategoria) => void;
}

const ModalAddCategory: FC<IModalAddCategory> = ({
  closeModalAdd,
  onAddCategory,
}) => {
  // Obtener la sucursal seleccionada
  const storedSucursal = localStorage.getItem('selectedSucursal');
  const selectedSucursal = storedSucursal
    ? JSON.parse(storedSucursal)
    : useSelector((state: RootState) => state.sucursal.selectedSucursal);

  const [newCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: '',
    idEmpresa: selectedSucursal.empresa?.id,
    idCategoriaPadre: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newCategory.denominacion) {
        Swal.fire({
          icon: "warning",
          title: "Información incompleta",
          text: "Por favor, complete el campo antes de continuar.",
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
          willClose: () => {
            // Cerrar el modal aquí
            closeModalAdd();
            window.location.reload();
        },
    });
    return;
}

    try {
      // Llamar al servicio para crear la categoría
      await categoryService.createCategory({
        denominacion: newCategory.denominacion,
        idEmpresa: newCategory.idEmpresa,
        idCategoriaPadre: newCategory.idCategoriaPadre,
      });
;

      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: "success",
            title: "¡Categoría creada!",
            text: "La categoría se ha creado exitosamente.",
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
                // Cerrar el modal aquí
                closeModalAdd();
                window.location.reload();
            },
        });

      // Llamar a la función de callback para agregar la categoría
      onAddCategory(newCategory);
    } catch (error) {
      console.error("El problema es: ", error);
      Swal.fire({
          icon: "error",
          title: "¡Error al agregar categoría!",
          text: "Algo salió mal al intentar agregar la categoría. Inténtelo nuevamente más tarde.",
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
          willClose: () => {
            // Cerrar el modal aquí
            closeModalAdd();
            window.location.reload();
        },
      });
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Categoría</h1>
      </div>
      <div className={styles.containerBody}>
        <label>Ingrese un nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={newCategory.denominacion}
          name="denominacion"
          onChange={handleChange}
        />
      </div>
      <div className={styles.containerButtons}>
        <button onClick={handleSubmit}>Aceptar</button>
        <button onClick={closeModalAdd}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalAddCategory;