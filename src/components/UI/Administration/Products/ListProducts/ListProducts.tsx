import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"; // Importa componentes de la biblioteca Material UI
import { RootState } from "../../../../../redux/store/store"; // Importa el tipo de estado raíz de Redux
import { useSelector } from "react-redux"; // Hook de React-Redux para seleccionar el estado
import { useEffect, useState } from "react"; // Importa hooks de React

import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos"; // Importa el tipo de producto
import { articleService } from "../../../../../Services/articleServices"; // Servicio para obtener productos
import { ProductRow } from "../ProductRow/ProductRow"; // Componente para renderizar cada fila de producto

// Componente para listar productos
export const ListProducts = () => {

    // Obtiene la sucursal seleccionada del almacenamiento local o del estado de Redux
    const storedSucursal = localStorage.getItem('sucursal');

    // Si hay una sucursal almacenada en localStorage, se parsea; si no, se usa la seleccionada en el estado de Redux
    const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
        (state: RootState) => state.sucursal.selectedSucursal
    );

    // Estado local para almacenar la lista de productos
    const [products, setProducts] = useState<IProductos[]>([]);

    // Efecto que se ejecuta al montar el componente o cuando `selectedSucursal` cambia
    useEffect(() => {
        const fetchProducts = async () => {
            // Llama al servicio para obtener productos por ID de sucursal
            const data = await articleService.getArticlesBySucursalId(selectedSucursal?.id);
            setProducts(data); // Actualiza el estado con los productos obtenidos
        };

        fetchProducts(); // Llama a la función de obtención de datos
    }, [selectedSucursal]);

    return (
        <div>
            {/* Contenedor de la tabla con estilo aplicado */}
            <TableContainer component={Paper} style={{ marginTop: '20px', height: '82vh' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Encabezados de la tabla */}
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Habilitado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mapea y renderiza cada producto usando el componente `ProductRow` */}
                        {products.map(product => (
                            <ProductRow product={product} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListProducts;
