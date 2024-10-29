// Importa el tipo ChangeEvent para manejar eventos de cambio y useState para gestionar el estado de un componente
import { ChangeEvent, useState } from "react"

// Define una interfaz que representa los valores del formulario, que pueden ser de tipo string o number
interface FormValues {
    [key: string]: string | number
}

// Define un hook personalizado useForm que toma valores iniciales y permite manejar formularios genéricamente
export const useForm = <T extends FormValues>(initialValues: T) => {
    
    // Crea un estado llamado 'values' y lo inicializa con los valores proporcionados en 'initialValues'
    const [values, setValues] = useState<T>(initialValues)

    // Define una función para manejar los cambios en los inputs del formulario
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Extrae el valor y el nombre del input que se está modificando
        const { value, name } = event.target
        // Actualiza el estado 'values' manteniendo los valores previos y reemplazando el valor del campo modificado
        setValues({ ...values, [name]: value })
    }

    // Define una función para reiniciar el formulario a sus valores iniciales
    const resetForm = () => {
        setValues(initialValues)
    }

    // Define una función para manejar el envío del formulario, aquí solo imprime los valores en consola
    const handleSubmitForm = () => {
        console.log(values)
    }

    // Retorna el estado y las funciones para manejar los cambios, el envío y el reinicio del formulario
    return {
        values,
        handleChange,
        handleSubmitForm,
        resetForm,
    }
}
