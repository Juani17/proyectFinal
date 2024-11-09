import { FC } from "react"; // Importa FC (Functional Component) de React
import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos"; // Importa la interfaz del tipo de producto
import styles from "./ModalViewProduct.module.css"; // Importa los estilos específicos para el componente
import { Button } from "react-bootstrap"; // Importa el componente de botón de React Bootstrap

// Interfaz que define las propiedades esperadas para el componente
interface IModalViewProduct {
    product: IProductos; // Producto que se mostrará en el modal
    modalClose: () => void; // Función para cerrar el modal
}

// Componente funcional que muestra la vista de un producto en un modal
export const ModalViewProduct: FC<IModalViewProduct> = ({ product, modalClose }) => {
    return (
        <div className={styles.containerPrincipalOn}>
            {/* Encabezado del modal con el nombre del producto */}
            <div className={styles.containerTitle}>
                <h2>{product.denominacion}</h2>
            </div>
            
            {/* Contenedor de los datos del producto */}
            <div className={styles.containerData}>
                {/* Descripción del producto */}
                <p>{product.descripcion}</p>
                {/* Precio del producto */}
                <p>Precio: ${product.precioVenta}</p>

                {/* Contenedor de la imagen del producto */}
                <div className={styles.containerLogo}>
                    {/* Muestra la primera imagen del producto si está disponible, de lo contrario, una imagen predeterminada */}
                    <img 
                        src={
                            product.imagenes[0] ? product.imagenes[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"
                        }
                        alt="" 
                    />
                </div>
            </div>

            {/* Botón para cerrar el modal */}
            <div className={styles.containerButton}>
                <Button onClick={modalClose}>Cerrar</Button>
            </div>
        </div>
    );
};
