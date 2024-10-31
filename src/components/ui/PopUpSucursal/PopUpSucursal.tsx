    import { useState } from "react";
    import { ISucursales } from "../../../types/ISucursales";
    import Modal from "../modal/Modal";
    import styles from "./PopUpSucursal.module.css";

    interface SucursalModalProps {
        isOpen: boolean;
        onClose: () => void;
        onAddSucursal: (sucursal: ISucursales) => void;
        selectedEmpresa?: { id: number }; // Añadir este prop
    }

    export const PopUpSucursal: React.FC<SucursalModalProps> = ({ isOpen, onClose, onAddSucursal, selectedEmpresa }) => {
        const [sucursalData, setSucursalData] = useState<ISucursales>({
            empresaId: selectedEmpresa?.id || 0, // Asigna el ID de la empresa seleccionada
            nombre: '',
            horarioApertura: '', // Cambiado a string
            horarioCierre: '', // Cambiado a string
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

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setSucursalData(prev => ({
                ...prev,
                [name]: value // Almacena el valor como cadena directamente
            }));
        };

        return (
            isOpen ? (
                <Modal>
                    <div className={styles.containerForm}>
                        <form onSubmit={(e) => { 
                            e.preventDefault(); 
                            onAddSucursal(sucursalData); 
                            onClose(); 
                        }} className={styles.Styleform}>
                            <h2>Crear Sucursal</h2>
                            <input name="nombre" type="text" placeholder="Nombre" value={sucursalData.nombre} onChange={handleChange} required />
                            <input name="horarioApertura" type="time" placeholder="Horario Apertura" value={sucursalData.horarioApertura} onChange={handleChange} required />
                            <input name="horarioCierre" type="time" placeholder="Horario Cierre" value={sucursalData.horarioCierre} onChange={handleChange} required />
                            <input name="pais" type="text" placeholder="País" value={sucursalData.pais} onChange={handleChange} required />
                            <input name="provincia" type="text" placeholder="Provincia" value={sucursalData.provincia} onChange={handleChange} required />
                            <input name="latitud" type="text" placeholder="Latitud" value={sucursalData.latitud} onChange={handleChange} required />
                            <input name="longitud" type="text" placeholder="Longitud" value={sucursalData.longitud} onChange={handleChange} required />
                            <input name="nombreCalle" type="text" placeholder="Nombre Calle" value={sucursalData.nombreCalle} onChange={handleChange} required />
                            <input name="numeroCalle" type="number" placeholder="Número Calle" value={sucursalData.numeroCalle} onChange={handleChange} required />
                            <input name="codigoPostal" type="text" placeholder="Código Postal" value={sucursalData.codigoPostal} onChange={handleChange} required />
                            <input name="numeroPiso" type="number" placeholder="Número Piso" value={sucursalData.numeroPiso} onChange={handleChange} />
                            <input name="numeroDepartamento" type="number" placeholder="Número Departamento" value={sucursalData.numeroDepartamento} onChange={handleChange} />
                            <input name="imagen" type="text" placeholder="Imagen" value={sucursalData.imagen} onChange={handleChange} />

                            <button type="submit">Confirmar</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </form>
                    </div>
                </Modal>
            ) : null
        );
    };

    export default PopUpSucursal;
