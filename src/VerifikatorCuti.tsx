import { useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { BASE_URL } from "../config";

const VerifikatorUrl = `${BASE_URL}/get-verifikator/{id}`;

type VerifikatorCuti = {
    id: number;
    nama: string;
};

type Response = {
    status: string;
    code: number;
    message: string;
    data: VerifikatorCuti[];
};

export const useVerifikatorCuti = () => {
    const getVerifikatorCuti = async () => {
        const response = await axios.get<Response>(VerifikatorUrl);
        // console.log(response.data);
        return response.data;
    };

    return useQuery(["allVerifikator"], getVerifikatorCuti);
};
