import { useState } from 'react';
import Modal from '../../ui/modal/Modal';
import styles from './Home.module.css';
import { useForm } from '../../hooks/useForm/useForm';
import { IEmpresa } from '../../types/IEmpresa';

export const Home = () => {
    // Estado de empresas
    const [empresas, setEmpresa] = useState<IEmpresa[]>([]);

    // Estado del modal crear empresa
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Estado del logo de la empresa
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Estado para el URL de la imagen
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const { values, handleChange, handleSubmitForm } = useForm({ nombre: '', razonSocial: '', cuit: '' });

    const { nombre, razonSocial, cuit } = values;

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedImage(null);
        setImagePreviewUrl(null); // Reinicia la vista previa al cerrar
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreviewUrl(URL.createObjectURL(file)); // Crea la URL de la imagen
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedImage) {
            // Aquí puedes manejar el envío de los datos, incluyendo la imagen
            // Ejemplo: agregar la empresa a la lista
            setEmpresa(prev => [...prev, { nombre, razonSocial, cuit, logo: selectedImage }]);
            handleCloseModal(); // Cierra el modal después de enviar
        }
    };

    return (
        <>
            <div className={styles.containerView}>
                <aside className={styles.asideContainer}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem' }}>Empresas</h1>
                    </div>
                    <div>
                        <button onClick={handleOpenModal}>Agregar Empresa</button>
                    </div>
                    <div className={styles.empresaContainer}>
                        {empresas.map((empresa, index) => (
                            <div key={index}>
                                <h3>{empresa.nombre}</h3>
                                <p>{empresa.razonSocial}</p>
                                <p>{empresa.cuit}</p>
                                {empresa.logo && (
                                    <img
                                        src={URL.createObjectURL(empresa.logo)}
                                        alt="Logo"
                                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                <div className={styles.mainContainer}>
                    <div className={styles.containerButtonSucursal}>
                        <button onClick={handleOpenModal}>Agregar Sucursal</button>
                    </div>
                    <div className={styles.containerSucursales}></div>
                </div>
            </div>

            {isOpenModal && (
                <Modal>
                    <form onSubmit={handleSubmit} className={styles.modalContainer} >
                        <h2>CREAR UNA EMPRESA</h2>
                        <input
                            name='nombre'
                            type="text"
                            placeholder='Ingrese nombre'
                            value={nombre}
                            onChange={handleChange}
                            required

                        />
                        <input
                            name='razonSocial'
                            type="text"
                            placeholder='Ingrese razon social'
                            value={razonSocial}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name='cuit'
                            type="text"
                            placeholder='Ingrese Cuit'
                            value={cuit}
                            onChange={handleChange}
                            required
                        />

                        <div className={styles.containerAgregarimagen}>
                        <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="file-upload"
                                style={{ display: 'none' }} // Oculta el input
                                required
                            />
                            {/* Botón personalizado */}
                            <label htmlFor="file-upload" className={styles.customFileUpload}>
                                Seleccionar imagen
                            </label>
                            {selectedImage ? (
                                <img
                                src={imagePreviewUrl!}
                                alt="Vista previa"
                                style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'cover' }}
                            />
                            ) : (
                                <span className="material-symbols-outlined" style={{scale:'3.8'}} >no_photography</span>
                            )}
                        </div>

                        <div className={styles.containerButton}>
                            <button style={{ backgroundColor: '#F80000' }} onClick={handleCloseModal}>Cancelar</button>
                            <button style={{ backgroundColor: '#26E200' }} type='submit'>Confirmar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};
