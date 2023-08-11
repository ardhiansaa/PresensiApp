import { useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { BASE_URL } from "../config";

const StatusUrl = `${BASE_URL}/statuspresensi`;

type StatusPresensi = {
    id: number;
    nama: string;
};

type Response = {
    status: string;
    code: number;
    message: string;
    user: StatusPresensi[];
};

export const useStatusPresensi = () => {
    const getStatusPresensi = async () => {
        const response = await axios.get<Response>(StatusUrl);
        console.log(response.data);
        return response.data;
    };

    return useQuery(["allPresensi"], getStatusPresensi);
};
