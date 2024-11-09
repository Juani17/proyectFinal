import { useEffect, useState } from "react";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./ListCategories.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useSelector } from "react-redux";
import { categoryService } from "../../../../../Services/categoryServices";
import { Button } from "react-bootstrap";
import ModalAddCategory from "../ModalAddCategory/ModalAddCategory";

const ListCategories = () => {

    // Selección de la sucursal desde el almacenamiento local o el estado global usando Redux
    const storedSucursal = localStorage.getItem('sucursal'); 
    const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
        (state: RootState) => state.sucursal.selectedSucursal
    )

    // Estado para controlar si el modal de agregar categoría está visible o no
    const [showModalAddCategory, setShowModalAddCategory] = useState<boolean>(false);

    // Estado para almacenar las categorías obtenidas desde el servicio
    const [categories, setCategories] = useState<ICategorias[]>([]);

    // useEffect para obtener las categorías al cargar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            // Llamada al servicio para obtener las categorías según la sucursal seleccionada
            const data = await categoryService.getCategoriesBySucursal(selectedSucursal?.id);
            // Se actualiza el estado con los datos obtenidos
            setCategories(data);
        }

        // Se ejecuta la función de obtención de categorías
        fetchCategories();
    }, [selectedSucursal]); // Dependencia de `selectedSucursal` para actualizar si cambia la sucursal seleccionada

    // Función que maneja la apertura del modal para agregar una nueva categoría
    const handleModal = () => {
        setShowModalAddCategory(true);
    }

    // Función que cierra el modal
    const closeModal = () => {
        setShowModalAddCategory(false);
    }

    return (
        <div className={styles.contentHero}>
            {/* Sección del encabezado donde se muestra el título y el botón para agregar una categoría */}
            <div className={styles.categoryHeader}>
                <h1>Categorias</h1>
                <Button onClick={handleModal}>Agregar Categoria</Button>
            </div>

            {/* Lista de categorías que se renderiza */}
            <ul className={styles.containerList}>
                {categories.map((category) => (
                    <li key={category.id} className={styles.containerPrincipal} typeof="inherit">
                        {/* Se renderiza una tarjeta de categoría con los datos de cada categoría */}
                        <CategoryCard category={category} />
                    </li>
                ))}
            </ul>

            {/* Condicional para mostrar el modal de agregar categoría si el estado `showModalAddCategory` es verdadero */}
            {showModalAddCategory && (
                <>
                    {/* Se agrega un div de fondo para deshabilitar la interacción con el resto de la interfaz mientras el modal está abierto */}
                    <div className={styles.backgroundDisabled}></div>
                    {/* El modal recibe el id de la sucursal y la función para cerrar el modal */}
                    <ModalAddCategory closeModalAdd={closeModal} idSucursal={selectedSucursal.id} />
                </>
            )}
        </div>
    );
}

export default ListCategories;
