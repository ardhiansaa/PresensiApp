import { useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { BASE_URL } from "../config";

const RiwayatUrl = `${BASE_URL}/getpresensi`;

type Presensi = {
  presensi: {
    id: number;
    tanggal: string;
    status: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    status_kehadiran: string;
    //   status_kehadiran: string;
  }[];
};

type Response = {
  status: string;
  code: number;
  data: Presensi;
};

export const useGetPresensi = () => {
  const getPresensi = async () => {
    const response = await axios.get<Response>(RiwayatUrl);
    console.log(response.data);
    return response.data;
  };

  return useQuery(["allPresensi"], getPresensi);
};
