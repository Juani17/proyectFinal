import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  isOpenModal: boolean;
  isOpenSucursalModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  openSucursalModal: () => void;
  closeSucursalModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSucursalModal, setIsOpenSucursalModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const openSucursalModal = () => setIsOpenSucursalModal(true);
  const closeSucursalModal = () => setIsOpenSucursalModal(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        isOpenSucursalModal,
        openModal,
        closeModal,
        openSucursalModal,
        closeSucursalModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto de modal
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext debe usarse dentro de un ModalProvider");
  }
  return context;
};
