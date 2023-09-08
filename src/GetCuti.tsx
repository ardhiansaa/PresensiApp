import { useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { BASE_URL } from "../config";

const RiwayatCutiUrl = `${BASE_URL}/cuti/{status}`;

type Cuti = {
    cuti: {
        id: number;
        tanggal_mulai: string;
        tanggal_akhir: string;
        verifikator_2: string;
        verifikator_1: string;
        status_cuti: string;
        status: number;
        created_at: number;
    }[];
};

type Response = {
    status: string;
    code: number;
    message: string;
    data: Cuti;
};

export const useGetCuti = () => {
    const getCuti = async () => {
        const response = await axios.get<Response>(RiwayatCutiUrl);
        // console.log(response.data);
        return response.data;
    };

    return useQuery(["allCuti"], getCuti, { refetchInterval: 5000 });
};
