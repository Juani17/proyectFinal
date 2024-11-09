import axios from "axios";
import { IProvincia } from "../endPoints/types/IProvincia";


const API_URL = `${import.meta.env.VITE_API_URL}/provincias`

export const provinceService = {

    async getAllProvincesByCountryId(countryId: number): Promise<IProvincia[]> {
        const response = await axios.get<IProvincia[]>(`${API_URL}/findByPais/${countryId}`);
        return response.data;
    }
}