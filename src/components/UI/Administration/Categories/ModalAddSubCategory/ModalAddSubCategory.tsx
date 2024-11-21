import { Button } from "react-bootstrap";
import styles from "./ModalAddSubCategory.module.css";
import { ChangeEvent, FC, useState } from "react";
import { ICreateCategoria } from "../../../../../endPoints/types/dtos/categorias/ICreateCategoria";
import { categoryService } from "../../../../../Services/categoryServices";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

// Definición de las propiedades esperadas para el componente
interface IModalAddSubCategory {
  closeModalAdd: () => void; // Función para cerrar el modal
  idCategoriaPadre: number; // ID de la categoría padre
}

// Componente funcional para agregar una subcategoría
const ModalAddSubCategory: FC<IModalAddSubCategory> = ({
  idCategoriaPadre,
  closeModalAdd,
}) => {
  // Obtener la empresa seleccionada desde localStorage o Redux
  const storedEmpresa = localStorage.getItem('company');
  const selectedEmpresa = storedEmpresa
    ? JSON.parse(storedEmpresa)
    : useSelector((state: RootState) => state.company.selectedEmpresa);

  // Estado local para la nueva subcategoría
  const [newSubCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: "", // Campo de denominación vacío inicialmente
    idCategoriaPadre: idCategoriaPadre, // Asociado con la categoría padre actual
    idEmpresa: selectedEmpresa ? selectedEmpresa.id : 0, // Asociado con la empresa actual
  });

  // Función para manejar el cambio en los inputs del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Actualiza el estado con el nuevo valor del input
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita el comportamiento por defecto de recargar la página

    // Validación para verificar que el campo no esté vacío
    if (!newSubCategory.denominacion) {
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
      });
      return;
  }

  try {
      // Llamar al servicio para crear la subcategoría
      await categoryService.createCategory(newSubCategory);

      // Mostrar mensaje de éxito
      Swal.fire({
          icon: "success",
          title: "¡Subcategoría creada!",
          text: "La subcategoría se ha creado exitosamente.",
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
              closeModalAdd(); // Cerrar el modal al terminar el mensaje
              window.location.reload();
          },
      });
  } catch (error) {
      console.error("El problema es: ", error); // Muestra el error en consola

      // Mostrar mensaje de error
      Swal.fire({
          icon: "error",
          title: "¡Error al crear subcategoría!",
          text: "Algo salió mal al intentar crear la subcategoría. Inténtelo nuevamente más tarde.",
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
              closeModalAdd(); // Cerrar el modal también si ocurre un error
          },
      });
  }
};
  // Renderizado del componente
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Subcategoría</h1>
      </div>
      <div className={styles.containerBody}>
        <label htmlFor="">Ingrese Denominación</label>
        <input
          type="text"
          placeholder="Denominación"
          name="denominacion"
          value={newSubCategory.denominacion}
          onChange={handleChange} // Llama a la función de manejo de cambios
        />
      </div>
      <div className={styles.containerButtons}>
        <Button onClick={handleSubmit}>Aceptar</Button>{" "}
        {/* Botón para enviar */}
        <Button onClick={closeModalAdd}>Cancelar</Button>{" "}
        {/* Botón para cerrar el modal */}
      </div>
    </div>
  );
};

export default ModalAddSubCategory;
