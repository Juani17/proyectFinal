import { FC, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import Swal from "sweetalert2";
import { ICreateCategoria } from "../../../../../endPoints/types/dtos/categorias/ICreateCategoria";
import { categoryService } from "../../../../../Services/categoryServices";
import styles from "./ModalAddSubCategory.module.css";

interface IModalAddSubCategory {
  closeModalAdd: () => void;
  idCategoriaPadre: number;
}

const ModalAddSubCategory: FC<IModalAddSubCategory> = ({
  closeModalAdd,
  idCategoriaPadre,
}) => {
  // Obtiene la empresa seleccionada directamente desde Redux
  const selectedEmpresa = useSelector(
    (state: RootState) => state.company.selectedCompany
  );

  if (!selectedEmpresa) {
    return <div>Error: No hay empresa seleccionada.</div>;
  }

  const [newSubCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: "",
    idCategoriaPadre: idCategoriaPadre,
    idEmpresa: selectedEmpresa.id,
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
    if (!newSubCategory.denominacion) {
      Swal.fire("Complete el campo antes de continuar.", "", "warning");
      return;
    }

    try {
      await categoryService.createCategory(newSubCategory);
      Swal.fire("Subcategoría creada con éxito.", "", "success");
      closeModalAdd();
    } catch (error) {
      console.error("Error al crear la subcategoría:", error);
      Swal.fire("Error al crear la subcategoría.", "", "error");
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Subcategoría</h1>
      </div>
      <div className={styles.containerBody}>
        <label htmlFor="">Ingrese un Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          name="denominacion"
          value={newSubCategory.denominacion}
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

export default ModalAddSubCategory;
