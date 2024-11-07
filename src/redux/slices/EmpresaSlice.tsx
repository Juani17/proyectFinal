import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/IEmpresa";
import { ISucursales } from "../../types/ISucursales";
import { IProducto } from "../../types/IProducto";

interface EmpresaState {
  empresas: IEmpresa[];
  empresaActiva: number | null;
  sucursalesActivas: ISucursales[];
  productosActivos: IProducto[];
  sucursalModalOpen: boolean;
  sucursalToEdit: ISucursales | null;
}

const initialState: EmpresaState = {
  empresas: [],
  empresaActiva: null,
  sucursalesActivas: [],
  productosActivos: [],
  sucursalModalOpen: false,
  sucursalToEdit: null,
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
      const empresa = state.empresas.find(e => e.id === action.payload);
      state.sucursalesActivas = empresa ? empresa.sucursales : [];
    },
    updateEmpresa: (state, action: PayloadAction<IEmpresa>) => {
      const updatedEmpresa = action.payload;
      state.empresas = state.empresas.map(empresa =>
        empresa.id === updatedEmpresa.id ? updatedEmpresa : empresa
      );
    },
    deleteEmpresa: (state, action: PayloadAction<number>) => {
      state.empresas = state.empresas.filter(empresa => empresa.id !== action.payload);
    },
    setSucursalActiva: (state, action: PayloadAction<number>) => {
      const sucursal = state.sucursalesActivas.find(s => s.id === action.payload);
      state.productosActivos = sucursal ? sucursal.productos : [];
    },
    addSucursalToEmpresa: (state, action: PayloadAction<{ sucursal: ISucursales; empresaId: number }>) => {
      const empresa = state.empresas.find(e => e.id === action.payload.empresaId);
      if (empresa) {
        empresa.sucursales.push(action.payload.sucursal);
        if (state.empresaActiva === action.payload.empresaId) {
          state.sucursalesActivas = empresa.sucursales;
        }
      }
    },
     deleteSucursal: (state, action: PayloadAction<{ empresaId: number; sucursalId: number }>) => {
      const { empresaId, sucursalId } = action.payload;
      const empresa = state.empresas.find(e => e.id === empresaId);
      if (empresa) {
        // Actualizar las sucursales de la empresa
        empresa.sucursales = empresa.sucursales.filter(s => s.id !== sucursalId);
        // Actualizar las sucursales activas si la empresa está seleccionada
        if (state.empresaActiva === empresaId) {
          state.sucursalesActivas = empresa.sucursales;
        }
      }
    },
    // Acción para abrir el modal de sucursal
    openSucursalModal: (state, action: PayloadAction<ISucursales | null>) => {
      state.sucursalModalOpen = true;
      state.sucursalToEdit = action.payload;
    },
    // Acción para cerrar el modal de sucursal
    closeSucursalModal: (state) => {
      state.sucursalModalOpen = false;
      state.sucursalToEdit = null;
    },
    // Acción para actualizar una sucursal
    updateSucursal: (state, action: PayloadAction<{ empresaId: number; sucursal: ISucursales }>) => {
      const { empresaId, sucursal } = action.payload;
      const empresa = state.empresas.find((e) => e.id === empresaId);
      if (empresa) {
          // Actualiza la sucursal dentro de la empresa
          empresa.sucursales = empresa.sucursales.map((s) =>
              s.id === sucursal.id ? sucursal : s // Si las IDs coinciden, actualiza la sucursal
          );
          // Si la empresa activa es la que se actualizó, actualizamos las sucursales activas
          if (state.empresaActiva === empresaId) {
              state.sucursalesActivas = empresa.sucursales;
          }
      }
  },
  }
});

export const {
  setEmpresas,
  setEmpresaActiva,
  setSucursalActiva,
  addSucursalToEmpresa,
  updateEmpresa,
  deleteEmpresa,
  deleteSucursal,
  openSucursalModal,
  closeSucursalModal,
  updateSucursal
} = empresaSlice.actions;

export default empresaSlice.reducer;
