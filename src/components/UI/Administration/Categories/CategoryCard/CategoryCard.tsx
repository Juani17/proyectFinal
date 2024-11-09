// Importamos los módulos necesarios, incluidos los tipos de las categorías, los estilos y los servicios
import { FC, useEffect, useState } from "react"
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias"
import styles from "./CardCategory.module.css";
import { categoryService } from "../../../../../Services/categoryServices";
import { Button } from "react-bootstrap";
import ModalAddSubCategory from "../ModalAddSubCategory/ModalAddSubCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

// Definimos la interfaz para las props del componente que contiene una categoría
interface ICategoryCard {
    category : ICategorias;
}

const CategoryCard : FC<ICategoryCard> = ({category}) => {

    // Estado para almacenar las subcategorías de la categoría actual
    const [subCategories, setSubCategories] = useState<ICategorias[]>([]);

    // Estado para controlar si las subcategorías se deben mostrar u ocultar
    const [showSubCategory, setShowSubCategory] = useState(false);

    // Estado para controlar la visibilidad del modal para agregar una subcategoría
    const [showModalSubCategory , setShowModalSubCategory] = useState(false); 
    
    // useEffect para cargar las subcategorías cuando la categoría cambia
    useEffect(() => {
        const fetchSubCategories = async () => {
            // Llamada al servicio para obtener las subcategorías de la categoría actual
            const subCategoriesfetched = await categoryService.getAllSubCategoriesByCategoryId(category.id);
            setSubCategories(subCategoriesfetched);
        }
        fetchSubCategories();
    }, [category]); // El efecto se vuelve a ejecutar cuando cambia la categoría

    // Función que maneja el toggle de la visibilidad de las subcategorías
    const handleShowSubCategory = () => {
        setShowSubCategory(!showSubCategory);
    }

    // Función para abrir el modal de agregar subcategorías
    const handleShowModalSubCategory = () => {
        setShowModalSubCategory(true);
    }

    // Función para cerrar el modal de agregar subcategorías
    const closeModal = () => {
        setShowModalSubCategory(false);
    }

    // Recuperamos la sucursal seleccionada desde el localStorage o el store de Redux
    const storedSucursal = localStorage.getItem('sucursal');
    const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
        (state: RootState) => state.sucursal.selectedSucursal
    )

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                {/* Título de la categoría */}
                <h1>{category.denominacion}</h1>
                
                <div className={styles.buttonsEdit}> 
                    {/* Botón para abrir el modal de agregar subcategorías */}
                    <Button onClick={handleShowModalSubCategory}>
                        {/* Icono de un botón de agregar */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#e8eaed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </Button>
                    {/* Botones adicionales (aún no funcionales) */}
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </Button>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                    </Button>
                </div>
            </div>

            {/* Contenedor de subcategorías, al hacer click se alterna su visibilidad */}
            <div className={styles.containerBody} onClick={handleShowSubCategory}>
                <div className={styles.containerSubTitle}>
                    {/* Icono que indica la expansión o contracción de subcategorías */}
                    <span className={`material-icons ${styles.arrowIcon} ${showSubCategory ? styles.rotated : ""}`}>
                        arrow_right
                    </span>
                    <h2>Subcategorias</h2>
                </div>
                
                {/* Si existen subcategorías, se listan; si no, se muestra un mensaje */}
                {subCategories.length > 0 ? (
                    <div className={showSubCategory ? styles.containerSubcategoryTrue : styles.containerSubcategoryFalse}>
                        <ul>
                        {subCategories.map((subCategory) => (
                            <li key={subCategory.id} className={styles.subcategoryItem}>
                                {subCategory.denominacion}
                            </li>
                        ))}
                        </ul>
                    </div>
                ) : (
                    <div className={showSubCategory ? styles.containerSubcategoryTrue : styles.containerSubcategoryFalse}><p>No hay subcategorías</p></div>
                )}

                {/* Muestra el modal para agregar una subcategoría */}
                {showModalSubCategory && (
                        <>
                            <div className={styles.backgroundDisabled}></div>
                            {/* Modal para agregar subcategoría, se pasa el ID de la sucursal y categoría padre */}
                            <ModalAddSubCategory closeModalAdd={closeModal} idSucursal={selectedSucursal.id} idCategoriaPadre={category.id}/>
                        </>
                )}
                
            </div>

        </div>
    )
}
export default CategoryCard
