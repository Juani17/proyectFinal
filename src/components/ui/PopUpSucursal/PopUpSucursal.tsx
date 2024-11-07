import { useState, useEffect } from "react";
import { ISucursales } from "../../../types/ISucursales";
import Modal from "../modal/Modal";
import styles from "./PopUpSucursal.module.css";

interface SucursalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSucursal: (sucursal: ISucursales) => void;
    onUpdateSucursal: (sucursal: ISucursales) => void;
    onDeleteSucursal: (sucursalId: number) => void;  // Nueva prop para eliminar
    isEditing: boolean;
    selectedEmpresa?: { id: number } | null; // Empresa seleccionada para la sucursal
    sucursalToEdit: ISucursales | null; // Sucursal para editar
}

export const PopUpSucursal: React.FC<SucursalModalProps> = ({
    isOpen,
    onClose,
    onAddSucursal,
    onUpdateSucursal,
    onDeleteSucursal,
    isEditing,
    selectedEmpresa,
    sucursalToEdit
}) => {
    // Estado inicial para la sucursal. Si no hay una empresa seleccionada, se asigna id 0
    const [sucursalData, setSucursalData] = useState<ISucursales>({
        id: 0,
        empresaId: selectedEmpresa?.id || 0,
        nombre: '',
        productos: [],
        horarioApertura: '',
        horarioCierre: '',
        pais: '',
        provincia: '',
        latitud: '',
        longitud: '',
        nombreCalle: '',
        numeroCalle: 0,
        codigoPostal: '',
        numeroPiso: 0,
        numeroDepartamento: 0,
        imagen: ''
    });

    // Efecto para inicializar sucursalData cuando sucursalToEdit cambia
    useEffect(() => {
        if (sucursalToEdit) {
            // Si hay sucursal para editar, se cargan los datos en el formulario
            setSucursalData(sucursalToEdit);
        } else {
            // Si no hay sucursal para editar, se restablece el estado
            setSucursalData({
                id: 0,
                empresaId: selectedEmpresa?.id || 0,
                nombre: '',
                productos: [],
                horarioApertura: '',
                horarioCierre: '',
                pais: '',
                provincia: '',
                latitud: '',
                longitud: '',
                nombreCalle: '',
                numeroCalle: 0,
                codigoPostal: '',
                numeroPiso: 0,
                numeroDepartamento: 0,
                imagen: ''
            });
        }
    }, [sucursalToEdit, selectedEmpresa]);

    // Función que maneja los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSucursalData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Función para enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            // Si estamos en modo edición, actualizamos la sucursal
            onUpdateSucursal(sucursalData);
        } else {
            // Si no estamos en modo edición, creamos una nueva sucursal
            onAddSucursal(sucursalData);
        }
        onClose(); // Cerrar el modal después de guardar
    };
      // Función para manejar la eliminación de la sucursal
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta sucursal?")) {
      onDeleteSucursal(sucursalData.id);  // Llamamos a la acción de eliminar
      onClose();
    }
  };

    return (
        isOpen ? (
            <Modal>
                <div className={styles.containerForm}>
                    <form onSubmit={handleSubmit} className={styles.Styleform}>
                        <h2>{isEditing ? "Editar Sucursal" : "Crear Sucursal"}</h2>
                        <input 
                            name="nombre" 
                            type="text" 
                            placeholder="Nombre" 
                            value={sucursalData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="horarioApertura" 
                            type="time" 
                            placeholder="Horario Apertura" 
                            value={sucursalData.horarioApertura} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="horarioCierre" 
                            type="time" 
                            placeholder="Horario Cierre" 
                            value={sucursalData.horarioCierre} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="pais" 
                            type="text" 
                            placeholder="País" 
                            value={sucursalData.pais} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="provincia" 
                            type="text" 
                            placeholder="Provincia" 
                            value={sucursalData.provincia} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="latitud" 
                            type="text" 
                            placeholder="Latitud" 
                            value={sucursalData.latitud} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="longitud" 
                            type="text" 
                            placeholder="Longitud" 
                            value={sucursalData.longitud} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="nombreCalle" 
                            type="text" 
                            placeholder="Nombre Calle" 
                            value={sucursalData.nombreCalle} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="numeroCalle" 
                            type="number" 
                            placeholder="Número Calle" 
                            value={sucursalData.numeroCalle} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="codigoPostal" 
                            type="text" 
                            placeholder="Código Postal" 
                            value={sucursalData.codigoPostal} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            name="numeroPiso" 
                            type="number" 
                            placeholder="Número Piso" 
                            value={sucursalData.numeroPiso} 
                            onChange={handleChange} 
                        />
                        <input 
                            name="numeroDepartamento" 
                            type="number" 
                            placeholder="Número Departamento" 
                            value={sucursalData.numeroDepartamento} 
                            onChange={handleChange} 
                        />
                        <input 
                            name="imagen" 
                            type="text" 
                            placeholder="Imagen" 
                            value={sucursalData.imagen} 
                            onChange={handleChange} 
                        />

                        <button type="submit">{isEditing ? "Guardar Cambios" : "Confirmar"}</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        {isEditing && (  // Solo mostrar botón de eliminar en modo edición
            <button type="button" onClick={handleDelete} style={{ backgroundColor: '#c9410b', color: 'white' }}>
              Eliminar Sucursal
            </button>
          )}
                    </form>
                </div>
            </Modal>
        ) : null
    );
};

export default PopUpSucursal;
