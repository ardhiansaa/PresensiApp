import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    TextInput,
    LogBox,
    ToastAndroid,
    ScrollView,
    SafeAreaView,
    Platform,
} from "react-native";
import { NavigationParamList } from "../types/navigation";
import Icons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "../services/axios";
import { useUserDetails } from "../src/UserDetails";
import { BASE_URL } from "../config";
import defaultAxios, { AxiosError } from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useVerifikatorCuti } from "../src/VerifikatorCuti";
import dayjs from "dayjs";

type CutiData = {
    code: number;
    message: string;
    status: string;
    data: {
        user_id: number;
        tanggal_mulai: string;
        tanggal_selesai: string;
        verifikator_2: number;
        verifikator_1: number;
        alasan: string;
    };
};

// interface IPresensiScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const AjukanCutiScreen = () => {
    const deviceHeight = Dimensions.get("window").height;

    const { data: UserDetailsData } = useUserDetails();
    const { data: VerifikatorCutiData } = useVerifikatorCuti();
    const [isLoadingStatusPresensi, setIsLoadingStatusPresensi] = useState(true);
    const [isDropdownV2Open, setIsDropdownV2Open] = useState(false);
    const [isDropdownV1Open, setIsDropdownV1Open] = useState(false);

    const [dateMulai, setDateMulai] = useState<Date | null>(new Date());
    const [selectedModeMulai, setModeMulai] = useState<"date" | "time">("date");
    const [showTanggalMulai, setShowTanggalMulai] = useState<boolean>(false);
    const [textTanggalMulai, setTextTanggalMulai] = useState<string>(
        dateMulai
            ? dateMulai.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
              })
            : "Pilih Tanggal Mulai"
    );

    const [dateSelesai, setDateSelesai] = useState<Date | null>(new Date());
    const [selectedModeSelesai, setModeSelesai] = useState<"date" | "time">("date");
    const [showTanggalSelesai, setShowTanggalSelesai] = useState<boolean>(false);
    const [textTanggalSelesai, setTextTanggalSelesai] = useState<string>(
        dateSelesai
            ? dateSelesai.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
              })
            : "Pilih Tanggal Selesai"
    );

    const [keterangan, setKeterangan] = useState<string>(
        `Dengan ini saya mengajukan permohonan izin cuti pada tanggal ${
            dateMulai
                ? dateMulai.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                  })
                : "##"
        } - ${
            dateSelesai
                ? dateSelesai.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                  })
                : "##"
        } dikarenakan (tulis alasan cuti)`
    );
    const [keteranganError, setKeteranganError] = useState<string>("");
    const onChangeMulai = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || dateMulai;
        setShowTanggalMulai(false);
        setDateMulai(currentDate);

        let tempDate = new Date(currentDate);
        let fDateMulai =
            tempDate.getDate() +
            "/" +
            (tempDate.getMonth() + 1) +
            "/" +
            tempDate.getFullYear();

        setTextTanggalMulai(fDateMulai);

        const updatedKeterangan = `Dengan ini saya mengajukan permohonan izin cuti pada tanggal ${fDateMulai} - ${
            dateSelesai
                ? dateSelesai.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                  })
                : "##"
        } dikarenakan (tulis alasan cuti)`;

        setKeterangan(updatedKeterangan);

        if (dateSelesai && dateSelesai < currentDate) {
            setDateSelesai(currentDate);
            setTextTanggalSelesai(fDateMulai);
        }
    };
    const onChangeSelesai = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || dateSelesai;
        setShowTanggalSelesai(false);
        setDateSelesai(currentDate);

        let tempDateSelesai = new Date(currentDate);
        let fDateSelesai =
            tempDateSelesai.getDate() +
            "/" +
            (tempDateSelesai.getMonth() + 1) +
            "/" +
            tempDateSelesai.getFullYear();

        setTextTanggalSelesai(fDateSelesai);

        if (dateMulai && dateMulai > currentDate) {
            setDateSelesai(dateMulai);
            setTextTanggalSelesai(textTanggalSelesai);
        }

        const updatedKeterangan = `Dengan ini saya mengajukan permohonan izin cuti pada tanggal ${
            dateMulai
                ? dateMulai.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                  })
                : "##"
        } - ${fDateSelesai} dikarenakan (tulis alasan cuti)`;

        setKeterangan(updatedKeterangan);
    };

    const showModeMulai = (currentMode: any) => {
        setShowTanggalMulai(true);
        setModeMulai(currentMode);
    };

    const showModeSelesai = (currentMode: any) => {
        setShowTanggalSelesai(true);
        setModeSelesai(currentMode);
    };

    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>();
    const onBackPressed = () => {
        navigation.navigate("Main");
    };
    const onSubmitPressed = () => {
        if (valueV2 === valueV1) {
            ToastAndroid.show(`Verifikator tidak boleh sama`, ToastAndroid.LONG);
        } else if (!keterangan.trim()) {
            setKeteranganError("Keterangan wajib diisi");
        } else {
            setKeteranganError("");
            sendDataToApi();
        }
    };

    const [openV2, setOpenV2] = useState(false);
    const [openV1, setOpenV1] = useState(false);
    const [valueV2, setValueV2] = useState<number | null>(0);
    const [valueV1, setValueV1] = useState<number | null>(0);

    const [itemsV2, setItemsV2] = useState<{ label: string; value: number }[]>([]);
    const [itemsV1, setItemsV1] = useState<{ label: string; value: number }[]>([]);

    const sendDataToApi = () => {
        const apiUrl = `${BASE_URL}/storecuti`;
        const formattedDateMulai = dayjs(dateMulai).format("YYYY-MM-DD");
        const formattedDateSelesai = dayjs(dateSelesai).format("YYYY-MM-DD");

        var bodyFormData = new FormData();
        bodyFormData.append("user_id", String(UserDetailsData?.user.id));
        bodyFormData.append("tanggal_mulai", formattedDateMulai);
        bodyFormData.append("tanggal_akhir", formattedDateSelesai);
        if (valueV2 && valueV2 > 0) {
            bodyFormData.append("verifikator_2", String(valueV2));
        }
        if (valueV1 && valueV1 > 0) {
            bodyFormData.append("verifikator_1", String(valueV1));
        }
        bodyFormData.append("alasan", keterangan);
        console.log(bodyFormData);
        axios
            .post<CutiData>(apiUrl, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { code, message } = response.data;
                if (code === 200) {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                }
                if (code === 201) {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                }
            })
            .catch((error) => {
                handleErrorResponse(error);
            });
    };

    const handleErrorResponse = useCallback((error: any) => {
        if (defaultAxios.isAxiosError(error)) {
            const serverError = error as AxiosError<any>;
            if (serverError && serverError.response) {
                ToastAndroid.show(
                    `${serverError.response.data.message}`,
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show(
                    `Terjadi Kesalahan! Silahkan coba lagi.`,
                    ToastAndroid.LONG
                );
            }
        }
    }, []);
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);
    useEffect(() => {
        if (isDropdownV2Open) {
            if (VerifikatorCutiData?.data && VerifikatorCutiData?.data.length > 0) {
                const status = VerifikatorCutiData.data?.map((value) => ({
                    label: value.nama,
                    value: value.id,
                }));
                setItemsV2(status ?? []);
                setIsLoadingStatusPresensi(false);
            }
        }
    }, [isDropdownV2Open]);
    console.log(valueV2);

    useEffect(() => {
        if (isDropdownV1Open) {
            if (VerifikatorCutiData?.data && VerifikatorCutiData?.data.length > 0) {
                const status = VerifikatorCutiData.data?.map((value) => ({
                    label: value.nama,
                    value: value.id,
                }));
                setItemsV1(status ?? []);
                setIsLoadingStatusPresensi(false);
            }
        }
    }, [isDropdownV1Open]);

    if (isLoadingStatusPresensi) {
        <View>
            <Text>Loading...</Text>
        </View>;
    }
    // console.log(value);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                nestedScrollEnabled
                style={{
                    height: deviceHeight / 1,
                    ...styles.container,
                    paddingTop: inset.top,
                }}
            >
                <View
                    style={{
                        height: deviceHeight / 11,
                        ...styles.header,
                    }}
                >
                    <TouchableOpacity onPress={onBackPressed}>
                        <Icons name="ios-chevron-back-outline" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.txtHead}>Pengajuan Cuti</Text>
                </View>

                {/* ini body */}
                <View style={styles.body}>
                    {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                        Form Presensi Harian
                    </Text> */}
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Nama</Text>
                        <Text
                            style={{
                                ...styles.component,
                            }}
                        >
                            {UserDetailsData?.user.nama}
                        </Text>
                    </View>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>NIP</Text>
                        <Text
                            style={{
                                ...styles.component,
                                // width: deviceWidth / 1.7,
                            }}
                        >
                            {UserDetailsData?.user.nip}
                        </Text>
                    </View>

                    <View style={{ ...styles.judulComponent, zIndex: 2 }}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>
                            Verifikator 2:
                        </Text>
                        <DropDownPicker
                            placeholder="Pilih Verifikator 2"
                            open={openV2}
                            value={valueV2}
                            items={itemsV2}
                            setOpen={setOpenV2}
                            setValue={setValueV2}
                            setItems={setItemsV2}
                            style={{
                                // backgroundColor: "white",
                                // width: deviceWidth / 1.7,
                                padding: 10,
                            }}
                            containerStyle={{
                                // width: deviceWidth / 1.7,
                                height: deviceHeight / 18,
                            }}
                            textStyle={{
                                fontSize: 16,
                            }}
                            onOpen={() => setIsDropdownV2Open(true)}
                            onClose={() => setIsDropdownV2Open(false)}
                        />
                    </View>

                    {valueV2 != 10 && (
                        <>
                            <View style={{ ...styles.judulComponent, zIndex: 1 }}>
                                <Text style={{ fontSize: 18, marginBottom: 8 }}>
                                    Verifikator 1
                                </Text>
                                <DropDownPicker
                                    placeholder="Pilih Verifikator 1"
                                    open={openV1}
                                    value={valueV1}
                                    items={itemsV1}
                                    setOpen={setOpenV1}
                                    setValue={setValueV1}
                                    setItems={setItemsV1}
                                    style={{
                                        // backgroundColor: "white",
                                        // width: deviceWidth / 1.7,
                                        padding: 10,
                                    }}
                                    containerStyle={{
                                        // width: deviceWidth / 1.7,
                                        height: deviceHeight / 18,
                                    }}
                                    textStyle={{
                                        fontSize: 16,
                                    }}
                                    onOpen={() => setIsDropdownV1Open(true)}
                                    onClose={() => setIsDropdownV1Open(false)}
                                    // onChangeValue={(selectedValue) => {
                                    //     console.log("Selected Value:", selectedValue);
                                    //     setValue(selectedValue);
                                    // }}
                                />
                            </View>
                        </>
                    )}

                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>
                            Tanggal Mulai
                        </Text>
                        <TouchableOpacity
                            onPress={() => showModeMulai("date")}
                            style={{
                                ...styles.component,
                                // width: deviceWidth / 1.7,
                                borderColor: "black",
                            }}
                        >
                            <Text>{textTanggalMulai}</Text>
                        </TouchableOpacity>
                        {showTanggalMulai && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateMulai || new Date()}
                                mode={selectedModeMulai}
                                display="default"
                                onChange={onChangeMulai}
                            />
                        )}
                    </View>

                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>
                            Tanggal Selesai
                        </Text>
                        <TouchableOpacity
                            onPress={() => showModeSelesai("date")}
                            style={{
                                ...styles.component,
                                // width: deviceWidth / 1.7,
                                borderColor: "black",
                            }}
                        >
                            <Text>{textTanggalSelesai}</Text>
                        </TouchableOpacity>
                        {showTanggalSelesai && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateSelesai || new Date()}
                                mode={selectedModeSelesai}
                                display="default"
                                onChange={onChangeSelesai}
                            />
                        )}
                    </View>

                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Alasan</Text>
                        <View>
                            <TextInput
                                placeholder="Isi Keterangan..."
                                value={keterangan}
                                style={{
                                    ...styles.TextField,
                                    // width: deviceWidth / 1.7,
                                    borderColor: keteranganError ? "red" : "black", // Set border color based on validation
                                }}
                                onChangeText={(text) => {
                                    setKeterangan(text);
                                    setKeteranganError(""); // Clear error when user types
                                }}
                                multiline={true}
                            />
                            {keteranganError ? (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {keteranganError}
                                </Text>
                            ) : null}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={onSubmitPressed}
                        style={styles.kirimButton}
                    >
                        <Text
                            style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                        >
                            Kirim
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AjukanCutiScreen;

const styles = StyleSheet.create({
    container: {
        // marginTop: "7%",
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: "#DDDDDD",

        backgroundColor: "#ffffff",
    },
    body: {
        margin: 20,
    },
    txtHead: {
        width: "83%",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    component: {
        backgroundColor: "white",
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    judulComponent: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 8,
        // alignItems: "center",
    },
    TextField: {
        backgroundColor: "white",
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
    },
    kirimButton: {
        backgroundColor: "#3EB772",
        alignItems: "center",
        justifyContent: "center",
        padding: 13,
        borderRadius: 10,
        marginVertical: 30,
        marginBottom: 60,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10, // Adjust as needed
    },
});
