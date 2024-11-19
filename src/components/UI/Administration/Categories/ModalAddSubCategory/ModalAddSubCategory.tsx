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

    // Validación simple para verificar que el campo no esté vacío
    if (!newSubCategory.denominacion) {
      alert("No puede dejar en blanco el campo");
      return; // Detiene la ejecución si la validación falla
    }

    try {
      // Llamar al servicio para crear la categoría
      await categoryService.createCategory(newSubCategory);

      // Cerrar el modal después de agregar la subcategoría
      closeModalAdd();

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Categoría creada',
        text: 'La subcategoría se ha creado exitosamente.',
      });
      
    } catch (error) {
      console.error("El problema es: ", error); // Muestra el error en consola
      // Muestra una alerta usando SweetAlert2 si ocurre un error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear subcategoría!",
      });
      closeModalAdd();
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
