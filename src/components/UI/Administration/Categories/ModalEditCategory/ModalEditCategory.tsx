import { Button } from "react-bootstrap";
import styles from "./ModalEditCategory.module.css";
import { ChangeEvent, FC, useState } from "react";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import { categoryService } from "../../../../../Services/categoryServices";
import Swal from "sweetalert2";
import { IUpdateCategoria } from "../../../../../endPoints/types/dtos/categorias/IUpdateCategoria";
import { RootState } from "../../../../../redux/store/store";
import { useSelector } from "react-redux";

interface IModalEditCategory{
    closeModalEdit : () => void
    category: ICategorias;
}

const ModalEditCategory : FC<IModalEditCategory> = ({closeModalEdit, category}) =>{

    //Selecciono empresa
    const storedEmpresa = localStorage.getItem('empresa');
    const selectedEmpresa = storedEmpresa ? JSON.parse(storedEmpresa) : useSelector(
        (state : RootState) => state.company.selectedCompany
    )

    //Selecciono sucursal
    const storedSucursal = localStorage.getItem('sucursal');
    const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
        (state : RootState) => state.sucursal.selectedSucursal
    )

    //Creo estado para el objeto de categoria
    const [categoryEdit, setCategoryEdit] = useState<IUpdateCategoria>({
        id: category.id,
        denominacion: category.denominacion,
        eliminado: category.eliminado,
        idEmpresa: selectedEmpresa?.id,
        idSucursales:[selectedSucursal?.id],
        idCategoriaPadre: category.categoriaPadre?.id
    })

    //Funcion que controla los cambios del form
    const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target;
        setCategoryEdit((prev) => ({...prev,
            [name] : value,
        }))
    }

    //Funcion que actualiza la categoria
    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


    // Validar que la categoría a editar no esté vacía
    if (!categoryEdit) {
        Swal.fire({
            icon: "warning",
            title: "Información incompleta",
            text: "No se pudo editar. Por favor, revise los datos ingresados.",
            customClass: {
                popup: "custom-popup-warning",
                title: "custom-title-warning",
                htmlContainer: "custom-content-warning",
                confirmButton: "custom-button-warning",
            },
            background: "#fff8e1",
            color: "#856404",
            confirmButtonColor: "#ffcc00",
            confirmButtonText: "Entendido",
        });
        return;
    }

    try {
        console.log("Enviando datos:", JSON.stringify(categoryEdit));
        console.log(categoryEdit);

        // Llamar al servicio para actualizar la categoría
        await categoryService.updateCategory(category.id, categoryEdit);

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: "success",
            title: "¡Categoría actualizada!",
            text: "La categoría se ha editado exitosamente.",
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
            title: "¡Error al actualizar categoría!",
            text: "No se pudo editar la categoría. Inténtelo nuevamente más tarde.",
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
                closeModalEdit(); // Asegurar el cierre del modal
                window.location.reload(); // Recargar la página
            },
        });
    }
};

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Editar Categoria</h1>
            </div>
            <div className={styles.containerBody}>
                <label htmlFor="">Nombre</label>
                <input type="text" placeholder="Ingrese Nombre" value={categoryEdit.denominacion} name="denominacion" onChange={handleChange}/>
            </div>
            <div className={styles.containerButtons}>
                <Button onClick={handleSubmit}>Aceptar</Button>
                <Button onClick={closeModalEdit}>Cancelar</Button>
            </div>
        </div>
    )

}

export default ModalEditCategory;