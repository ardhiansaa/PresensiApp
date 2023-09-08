import { useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { BASE_URL } from "../config";

const UserDetailsUrl = `${BASE_URL}/userinfo`;

type UserDetail = {
    id: number;
    nip: null;
    nama: string;
    username: string;
    alamat: string;
    email: string;
    tanggal_lahir: string;
    website: null;
    nonaktif: number;
    role: number;
    divisi: string;
    jabatan: null;
    jatah_cuti: number;
    sisa_cuti: number;
    izin: number;
    sakit: number;
    atasan_id: null;
    marketing_id: null;
    kadaluarsa: null;
    discord_id: null;
    created_at: string;
    updated_at: string;
    telp: string;
    task_count: null;
    image: null;
    deleted_at: null;
    hadir: number;
    WFH: number;
    validasi_presensi: true;
};

type ResponseUser = {
    status: string;
    code: number;
    user: UserDetail;
};

export const useUserDetails = () => {
    const getUserDetails = async () => {
        const response = await axios.get<ResponseUser>(UserDetailsUrl);
        // console.log(response.data);
        return response.data;
    };

    return useQuery(["allUserDetails"], getUserDetails, { refetchInterval: 5000 });
};
