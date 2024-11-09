import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importa createSlice y PayloadAction de Redux Toolkit
import { IEmpresa } from "../../endPoints/types/dtos/empresa/IEmpresa"; // Importa la interfaz de la empresa

// Define la estructura del estado inicial para la compañía
interface CompanyState {
    selectedCompany: IEmpresa | null; // Representa la compañía seleccionada, o null si no hay ninguna seleccionada
}

// Estado inicial con selectedCompany establecido en null
const initialState: CompanyState = {
    selectedCompany: null,
};

// Crea un slice de Redux para manejar el estado de la compañía
const companySlice = createSlice({
    name: "company", // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para establecer la compañía seleccionada
        setSelectedCompany: (state, action: PayloadAction<IEmpresa>) => {
            state.selectedCompany = action.payload; // Actualiza el estado con la compañía proporcionada en la acción
        },
        // Reducer para limpiar la compañía seleccionada
        clearSelectedCompany: (state) => {
            state.selectedCompany = null; // Restablece el estado a null
        },
    },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { setSelectedCompany, clearSelectedCompany } = companySlice.actions;

// Exporta el reducer para integrarlo en el store de Redux
export default companySlice.reducer;
