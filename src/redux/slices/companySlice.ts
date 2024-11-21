import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../endPoints/types/dtos/empresa/IEmpresa";

interface CompanyState {
    selectedCompany: IEmpresa | null; // Representa la empresa seleccionada
}

const initialState: CompanyState = {
    selectedCompany: null, // Estado inicial
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setSelectedCompany: (state, action: PayloadAction<IEmpresa>) => {
            state.selectedCompany = action.payload; // Establece la empresa seleccionada
        },
        clearSelectedCompany: (state) => {
            state.selectedCompany = null; // Limpia la empresa seleccionada
        },
    },
});

export const { setSelectedCompany, clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
