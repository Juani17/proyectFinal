import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/IEmpresa";
import { ISucursales } from "../../types/ISucursales";
import { IProducto } from "../../types/IProducto";

interface EmpresaState {
  empresas: IEmpresa[];
  empresaActiva: number | null;
  sucursalesActivas: ISucursales[];
  productosActivos: IProducto[];
}

const initialState: EmpresaState = {
  empresas: [],
  empresaActiva: null,
  sucursalesActivas: [],
  productosActivos: []
};

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    setEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
      state.empresas = action.payload;
    },
    setEmpresaActiva: (state, action: PayloadAction<number>) => {
      state.empresaActiva = action.payload;
      state.sucursalesActivas = state.empresas.find(e => e.id === action.payload)?.sucursales || [];
    },
    setSucursalActiva: (state, action: PayloadAction<number>) => {
      state.productosActivos = state.sucursalesActivas.find(s => s.id === action.payload)?.productos || [];
    }
  }
});

export const { setEmpresas, setEmpresaActiva, setSucursalActiva } = empresaSlice.actions;
export default empresaSlice.reducer;
