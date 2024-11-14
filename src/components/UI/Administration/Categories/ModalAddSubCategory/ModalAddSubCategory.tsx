import { Button } from "react-bootstrap";
import styles from "./ModalAddSubCategory.module.css";
import { ChangeEvent, FC, useState } from "react";
import { ICreateCategoria } from "../../../../../endPoints/types/dtos/categorias/ICreateCategoria";
import { categoryService } from "../../../../../Services/categoryServices";
import Swal from "sweetalert2";

// Definición de las propiedades esperadas para el componente
interface IModalAddSubCategory {
  closeModalAdd: () => void; // Función para cerrar el modal
  idSucursal: number; // ID de la sucursal
  idCategoriaPadre: number; // ID de la categoría padre
}

// Componente funcional para agregar una subcategoría
const ModalAddSubCategory: FC<IModalAddSubCategory> = ({
  idCategoriaPadre,
  idSucursal,
  closeModalAdd,
}) => {
  // Estado local para la nueva subcategoría
  const [newSubCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: "", // Campo de denominación vacío inicialmente
    idSucursales: [idSucursal], // Asociado con la sucursal actual
    idCategoriaPadre: idCategoriaPadre, // Asociado con la categoría padre actual
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
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita el comportamiento por defecto de recargar la página

    // Validación simple para verificar que el campo no esté vacío
    if (!newSubCategory.denominacion) {
      alert("No puede dejar en blanco el campo");
      return; // Detiene la ejecución si la validación falla
    }

    try {
      console.log("Datos enviados", newSubCategory); // Log para depuración
      categoryService.createCategory(newSubCategory); // Llama al servicio para crear la categoría
      closeModalAdd();
      Swal.fire({
        icon: 'success',
        title: 'Categoría creada',
        text: 'La subcategoria se ha creado exitosamente.',
      });
      
    } catch (error) {
      console.error("El problema es: ", error); // Muestra el error en consola
      // Muestra una alerta usando SweetAlert2 si ocurre un error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Renderizado del componente
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Subcategoria</h1>
      </div>
      <div className={styles.containerBody}>
        <label htmlFor="">Ingrese Denominacion</label>
        <input
          type="text"
          placeholder="Denominacion"
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
