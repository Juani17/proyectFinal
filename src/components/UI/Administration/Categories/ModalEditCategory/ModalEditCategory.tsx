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

        if(!categoryEdit){
            alert("No se pudo editar");
            return;
        }

        try{
            console.log("Enviando datos:", JSON.stringify(categoryEdit))
            console.log(categoryEdit)
            await categoryService.updateCategory(category.id, categoryEdit)
            Swal.fire({
                icon: "success",
                title: "Categoria Actualizada",
                text: "La categoria se ha editado exitosamente.",
                timer: 1500,
                willClose: () => {
                    closeModalEdit();
                    window.location.reload()
                }
            })
            closeModalEdit();
        }catch(error){
            console.error("El problema es: ", error);
            Swal.fire({
                icon: "success",
                title: "Categoria no editada",
                showConfirmButton: false,
                timer: 1500,
                willClose: ()=>{
                    closeModalEdit();
                    window.location.reload() 
                }
            });
        }
    }

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Editar Categoria</h1>
            </div>
            <div className={styles.containerBody}>
                <label htmlFor="">Ingrese Denominacion</label>
                <input type="text" placeholder="Denominacion" value={categoryEdit.denominacion} name="denominacion" onChange={handleChange}/>
            </div>
            <div className={styles.containerButtons}>
                <Button onClick={handleSubmit}>Aceptar</Button>
                <Button onClick={closeModalEdit}>Cancelar</Button>
            </div>
        </div>
    )

}

export default ModalEditCategory;