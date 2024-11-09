import { FC } from "react"; // Importa FC (Functional Component) de React
import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos"; // Importa el tipo de producto

// Interfaz que define las propiedades esperadas para el componente
interface IModalViewProduct {
    product: IProductos; // Producto a visualizar o editar
    modalClose: () => void; // Función para cerrar el modal
}

// Componente funcional para mostrar o editar un producto en un modal
export const ModalEditProduct: FC<IModalViewProduct> = ({ product, modalClose }) => {
    // Llama a la función `modalClose` al renderizar el componente, lo cual puede no ser el comportamiento esperado
    modalClose();

    return (
        <div>
            {/* Renderiza "a" si hay un producto, de lo contrario, "b" */}
            {product ? "a" : "b"}
        </div>
    );
};
