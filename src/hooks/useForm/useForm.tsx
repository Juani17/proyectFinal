import { ChangeEvent, useState } from "react"

// Define una interfaz que representa los valores del formulario, que pueden ser de tipo string o number
interface FormValues {
    [key: string]: string | number | File | null
}

// Define un hook personalizado useForm que toma valores iniciales y permite manejar formularios genéricamente
export const useForm = <T extends FormValues>(initialValues: T) => {
    
    // Crea un estado llamado 'values' y lo inicializa con los valores proporcionados en 'initialValues'
    const [values, setValues] = useState<T>(initialValues)

    // Define una función para manejar los cambios en los inputs del formulario
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Extrae el valor, el nombre del input y el tipo
        const { value, name, type, files } = event.target;

        // Si el tipo es "file", actualiza el valor como el archivo seleccionado (File)
        if (type === "file" && files) {
            // Asignamos el archivo seleccionado o null si no se selecciona ninguno
            setValues({ ...values, [name]: files[0] || null });
        } else {
            // Para otros tipos, simplemente asignamos el valor del input como texto
            setValues({ ...values, [name]: value });
        }
    }

    // Define una función para reiniciar el formulario a sus valores iniciales
    const resetForm = () => {
        setValues(initialValues)
    }

    // Define una función para manejar el envío del formulario, aquí solo imprime los valores en consola
    const handleSubmitForm = () => {
        console.log(values)
    }

    // Nueva función para establecer valores de forma externa
    const setFormValues = (newValues: Partial<T>) => {
        setValues({ ...values, ...newValues });
    };

    // Retorna el estado y las funciones para manejar los cambios, el envío y el reinicio del formulario
    return {
        values,
        handleChange,
        handleSubmitForm,
        resetForm,
        setFormValues, // Exportamos la nueva función
    }
}
