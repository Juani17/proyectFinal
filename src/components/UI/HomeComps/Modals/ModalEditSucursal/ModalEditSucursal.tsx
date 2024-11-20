import { Button } from "react-bootstrap"; 
import styles from "./ModalEditSucursal.module.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IUpdateSucursal } from "../../../../../endPoints/types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../../../../../endPoints/types/dtos/sucursal/ISucursal";
import { sucursalService } from "../../../../../Services/sucursalService";
import { IPais } from "../../../../../endPoints/types/IPais";
import { IProvincia } from "../../../../../endPoints/types/IProvincia";
import { ILocalidad } from "../../../../../endPoints/types/ILocalidad";
import { countryService } from "../../../../../Services/countryServices";
import { provinceService } from "../../../../../Services/provinceService";
import { localityService } from "../../../../../Services/localityServices";

interface IModalEditSucursal {
    modalCloseEdit: () => void; //Función que recibe desde CardCompany para cerrar el modal
    sucursal: ISucursal;
}

const ModalEditSucursal: FC<IModalEditSucursal> = ({ modalCloseEdit, sucursal }) => {
    const [formValues, setFormValues] = useState<IUpdateSucursal>({
        nombre: sucursal.nombre || "", 
        idEmpresa: sucursal.empresa?.id || 0, 
        id: sucursal.id || 0,
        eliminado: sucursal.eliminado || false,
        latitud: sucursal.latitud || 0,
        longitud: sucursal.longitud || 0,
        domicilio: {
            id: sucursal.domicilio?.id || 0,
            calle: sucursal.domicilio?.calle || "",
            numero: sucursal.domicilio?.numero || 0,
            cp: sucursal.domicilio?.cp || 0,
            piso: sucursal.domicilio?.piso || 0,
            nroDpto: sucursal.domicilio?.nroDpto || 0,
            idLocalidad: sucursal.domicilio?.localidad.id || 0
        },
        logo: sucursal.logo || null,
        categorias: sucursal.categorias || [],
        esCasaMatriz: sucursal.esCasaMatriz || false,
        horarioApertura: sucursal.horarioApertura || "",
        horarioCierre: sucursal.horarioCierre || "",
    });

    // Maneja el cambio de los inputs generales y los de domicilio
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;

        // Si el nombre contiene "domicilio.", actualizamos dentro de domicilio
        if (name.startsWith("domicilio.")) {
            const domicilioField = name.split(".")[1]; // Extraemos el subcampo de domicilio
            setFormValues({
                ...formValues,
                domicilio: {
                    ...formValues.domicilio,
                    [domicilioField]: value
                }
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

// Maneja el envío del formulario
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        await sucursalService.updateSucursal(formValues.id, formValues);

        Swal.fire({
            icon: "success",
            title: "¡Actualización exitosa!",
            text: "La sucursal ha sido actualizada correctamente. Puedes verificar los cambios en la lista.",
            customClass: {
                popup: 'custom-popup-success', 
                title: 'custom-title-success', 
                htmlContainer: 'custom-content-success' // Cambio de 'content' a 'htmlContainer'
            },
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
                modalCloseEdit();
                window.location.reload();
            },
        });
    } catch (error) {
        console.error("El problema es: ", error);

        Swal.fire({
            icon: "error",
            title: "¡Algo salió mal!",
            text: "No se pudo actualizar la sucursal. Por favor, verifica los datos e inténtalo nuevamente.",
            customClass: {
                popup: 'custom-popup-error', 
                title: 'custom-title-error', 
                htmlContainer: 'custom-content-error' // Cambio de 'content' a 'htmlContainer'
            },
            confirmButtonText: "Reintentar",
            confirmButtonColor: "#dc3545",
        });
    }
};


       // Estados para países, provincias y localidades
       const [countries, setCountries] = useState<IPais[]>([]);
       const [provinces, setProvinces] = useState<IProvincia[]>([]);
       const [localities, setLocalities] = useState<ILocalidad[]>([]);
       const [selectedCountry, setSelectedCountry] = useState(sucursal.domicilio?.localidad.provincia.pais.id || "");
       const [selectedProvince, setSelectedProvince] = useState(sucursal.domicilio?.localidad.provincia.id || "");
       const [selectedLocality, setSelectedLocality] = useState(sucursal.domicilio?.localidad.id || "");
   
       useEffect(() => {
           // Cargar países al montar el componente
           const fetchCountries = async () => {
               try {
                   const data = await countryService.getAllCountries();
                   setCountries(data);
               } catch (error) {
                   console.error("Error al cargar los países:", error);
               }
           };
           fetchCountries();
       }, []);
   
       useEffect(() => {
           if (selectedCountry) {
               // Cargar provincias según el país seleccionado
               const fetchProvinces = async () => {
                   try {
                       const data = await provinceService.getAllProvincesByCountryId(Number(selectedCountry));
                       setProvinces(data);
                       setLocalities([]);
                   } catch (error) {
                       console.error("Error al cargar las provincias:", error);
                   }
               };
               fetchProvinces();
           }
       }, [selectedCountry]);
   
       useEffect(() => {
           if (selectedProvince) {
               // Cargar localidades según la provincia seleccionada
               const fetchLocalities = async () => {
                   try {
                       const data = await localityService.getAllLocalitiesByProvinceId(Number(selectedProvince));
                       setLocalities(data);
                   } catch (error) {
                       console.error("Error al cargar las localidades:", error);
                   }
               };
               fetchLocalities();
           }
       }, [selectedProvince]);
   
       const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
           setSelectedCountry(e.target.value);
           setSelectedProvince("");
           setSelectedLocality("");
       };
   
       const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
           setSelectedProvince(e.target.value);
           setSelectedLocality("");
       };
   
       const handleLocalityChange = (e: ChangeEvent<HTMLSelectElement>) => {
           const localidadId = parseInt(e.target.value);
           setSelectedLocality(e.target.value);
           setFormValues(prev => ({
               ...prev,
               domicilio: { ...prev.domicilio, idLocalidad: localidadId },
           }));
       };
   

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h2>Editar Sucursal</h2>
            </div>

            <div>
                <form action="" className={styles.containerForm}>
                <div className={styles.blockOne}>

                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" placeholder="Nombre de la sucursal" name="nombre" value={formValues.nombre} onChange={handleChange} />

                    <label htmlFor="horarioApertura">Horario de Apertura</label>
                    <input type="time" name="horarioApertura" value={formValues.horarioApertura} onChange={handleChange} />

                    <label htmlFor="horarioCierre">Horario de Cierre</label>
                    <input type="time" name="horarioCierre" value={formValues.horarioCierre} onChange={handleChange} />

                    <label htmlFor="latitud">Latitud</label>
                    <input type="text" placeholder="Latitud" name="latitud" value={formValues.latitud} onChange={handleChange} />

                    <label htmlFor="longitud">Longitud</label>
                    <input type="text" placeholder="Longitud" name="longitud" value={formValues.longitud} onChange={handleChange} />

                    <h3>Domicilio</h3>
                    <label htmlFor="domicilio.calle">Calle</label>
                    <input type="text" placeholder="Calle" name="domicilio.calle" value={formValues.domicilio.calle} onChange={handleChange} />

                    <label htmlFor="domicilio.numero">Número</label>
                    <input type="text" placeholder="Número" name="domicilio.numero" value={formValues.domicilio.numero} onChange={handleChange} />

                    <label>País</label>
                    <select value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Seleccione un país</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.blockTwo}>

                    <label>Provincia</label>
                    <select value={selectedProvince} onChange={handleProvinceChange} disabled={!selectedCountry}>
                        <option value="">Seleccione una provincia</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>{province.nombre}</option>
                        ))}
                    </select>

                    <label>Localidad</label>
                    <select value={selectedLocality} onChange={handleLocalityChange} disabled={!selectedProvince}>
                        <option value="">Seleccione una localidad</option>
                        {localities.map(locality => (
                            <option key={locality.id} value={locality.id}>{locality.nombre}</option>
                        ))}
                    </select>

                    <label htmlFor="domicilio.cp">Código Postal</label>
                    <input type="text" placeholder="Código Postal" name="domicilio.cp" value={formValues.domicilio.cp} onChange={handleChange} />

                    <label htmlFor="domicilio.piso">Piso</label>
                    <input type="text" placeholder="Piso" name="domicilio.piso" value={formValues.domicilio.piso} onChange={handleChange} />

                    <label htmlFor="domicilio.nroDpto">Número de Departamento</label>
                    <input type="text" placeholder="Nro Dpto" name="domicilio.nroDpto" value={formValues.domicilio.nroDpto} onChange={handleChange} />

                    <label htmlFor="domicilio.idLocalidad">ID Localidad</label>
                    <input type="text" placeholder="ID Localidad" name="domicilio.idLocalidad" value={formValues.domicilio.idLocalidad} onChange={handleChange} />

                    <label htmlFor="logo">Logo</label>
                    <input type="text" placeholder="Link de imagen" name="logo" value={formValues.logo || ""} onChange={handleChange} />
                </div>
                </form>

                <div className={styles.containerButtons}>
                    <Button onClick={handleSubmit}>Aceptar</Button>
                    <Button onClick={modalCloseEdit}>Cancelar</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditSucursal;
