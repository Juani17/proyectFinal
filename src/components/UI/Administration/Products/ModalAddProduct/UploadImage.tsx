import { FC } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import noImage from "../assets/images/noImage.jpeg";
import { IImagen } from "../../../../../../src/endPoints/types/IImagen";
import { ImageService } from "../../../../../Services/ImageServices";

interface IUploadImage {
  image?: string | null;
  setImage?: (image: string | null) => void;
  imageObjeto?: IImagen | null;
  setImageObjeto?: (image: IImagen | null) => void;
  typeElement?: string;
  elementActiveId?: number; // Añadido para identificar el elemento activo
}

export const UploadImage: FC<IUploadImage> = ({
  image,
  setImage,
  imageObjeto,
  setImageObjeto,
  typeElement,
  elementActiveId = 45, // Parámetro por defecto para pruebas
}) => {
  const imageService = new ImageService("images");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = event.target.files || [];
    if (!file) return;

    const formData = new FormData();
    formData.append("uploads", file);

    Swal.fire({
      title: "Subiendo...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const data = await imageService.uploadImage(formData);

      setImage?.(data);
      setImageObjeto?.({ url: data, name: file.name });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire("Error", "No se pudo subir la imagen.", "error");
    } finally {
      Swal.close();
    }
  };

  const handleDeleteImagen = async () => {
    try {
      if (imageObjeto && setImageObjeto && elementActiveId && typeElement) {
        await imageService.deleteImgItems(elementActiveId, imageObjeto.url, typeElement);
        setImageObjeto(null);
      } else if (image && setImage) {
        await imageService.deleteImgCloudinary(image);
        setImage(null);
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      Swal.fire("Error", "No se pudo eliminar la imagen.", "error");
    }
  };

  const containerStyle = {
    width: "100%",
    border: "1px solid black",
    borderRadius: ".4rem",
    padding: ".4rem",
    height: "100%",
    gap: ".4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const imageContainerStyle = {
    borderRadius: ".4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: ".4rem",
  };

  return (
    <div style={containerStyle}>
      {image || imageObjeto ? (
        <div style={imageContainerStyle}>
          <Button
            onClick={handleDeleteImagen}
            variant="outlined"
            color="error"
            style={{ marginRight: "1rem" }}
          >
            Eliminar imagen
          </Button>
          <img
            src={imageObjeto ? imageObjeto.url : image || noImage}
            alt="Uploaded"
            style={{
              backgroundColor: "#ccc",
              width: "10vw",
              borderRadius: ".4rem",
              height: "10vh",
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span">
              Elige una imagen
            </Button>
          </label>
          <img
            src={noImage}
            alt="Sin imagen"
            style={{ maxWidth: "100px", height: "auto", marginLeft: "1rem" }}
          />
        </>
      )}
    </div>
  );
};
