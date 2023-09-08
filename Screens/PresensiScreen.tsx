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
} from "react-native";
import { NavigationParamList } from "../types/navigation";
import Icons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "../services/axios";
import { useUserDetails } from "../src/UserDetails";
import { useStatusPresensi } from "../src/StatusPresensi";
import { BASE_URL } from "../config";
import getImageMeta from "../utils/getImageMeta";
import defaultAxios, { AxiosError } from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PresensiData = {
    code: number;
    message: string;
    status: string;
    data: {
        user_id: number;
        tanggal: string;
        status: number;
        bukti: string;
        keterangan: string;
    };
};

// interface IPresensiScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const PresensiScreen = () => {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    const [keterangan, setKeterangan] = useState<string>("");
    const [keteranganError, setKeteranganError] = useState<string>("");

    const [file, setFile] = useState<any>();
    const { data: UserDetailsData } = useUserDetails();
    const { data: StatusPresensiData } = useStatusPresensi();
    const [isLoadingStatusPresensi, setIsLoadingStatusPresensi] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>();
    const onBackPressed = () => {
        navigation.navigate("Main");
    };
    const onSubmitPressed = () => {
        if (value === 1) {
            sendDataToApi();
        } else {
            if (!keterangan.trim()) {
                setKeteranganError("Keterangan wajib diisi");
                return;
            }
            // Clear the error and proceed with sending data to the API
            setKeteranganError("");
            sendDataToApi();
        }
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number | null>(0); // Set the initial value to 1 or another suitable default

    const [items, setItems] = useState<{ label: string; value: number }[]>([]);

    const pickPdf = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "image/jpeg", "image/jpg", "image/heic"],
            });

            if (result.type === "success") {
                const fileWrite = getImageMeta(result.uri, true);
                setFile(fileWrite);
            } else {
                console.log("PDF picking was canceled.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sendDataToApi = () => {
        const apiUrl = `${BASE_URL}/storepresensi`;
        // const file = getImageMeta(pdfUri);
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
        }/${currentDate.getDate()}`;

        var bodyFormData = new FormData();
        bodyFormData.append("user_id", String(UserDetailsData?.user.id));
        bodyFormData.append("bukti", file as any);
        bodyFormData.append("tanggal", formattedDate);
        bodyFormData.append("status", value as any);
        bodyFormData.append("keterangan", keterangan);
        // console.log("Ket", keterangan);
        // console.log("BODY:", bodyFormData);
        axios
            .post<PresensiData>(apiUrl, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (value === 1) {
                    // Alert.alert("Berhasil Presensi", response.data.message);
                    ToastAndroid.show(`${response.data.message}`, ToastAndroid.LONG);
                    if (UserDetailsData?.user) {
                        UserDetailsData.user.validasi_presensi = true;
                    }
                } else if (value === 2) {
                    ToastAndroid.show(`${response.data.message}`, ToastAndroid.LONG);
                    if (UserDetailsData?.user) {
                        UserDetailsData.user.validasi_presensi = true;
                    }
                } else if (value === 3) {
                    ToastAndroid.show(`${response.data.message}`, ToastAndroid.LONG);
                    if (UserDetailsData?.user) {
                        UserDetailsData.user.validasi_presensi = true;
                    }
                } else if (value === 4) {
                    ToastAndroid.show(`${response.data.message}`, ToastAndroid.LONG);
                    if (UserDetailsData?.user) {
                        UserDetailsData.user.validasi_presensi = true;
                    }
                } else {
                    Alert.alert(
                        "Status Tidak Dikenali",
                        `Status: ${response.data.data.status}, Pesan: ${response.data.message}`
                    );
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
                // console.log(JSON.stringify(serverError.response.data));
                ToastAndroid.show(
                    `${serverError.response.data.message}`,
                    ToastAndroid.LONG
                );
                // Alert.alert(
                //     "Terjadi Kesalahan!",
                //     `${serverError.response.data?.message}`
                // );
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
        if (isDropdownOpen) {
            if (StatusPresensiData?.user && StatusPresensiData?.user.length > 0) {
                const status = StatusPresensiData.user?.map((value) => ({
                    label: value.nama,
                    value: value.id,
                }));
                setItems(status ?? []);
                setIsLoadingStatusPresensi(false);
            }
        }
    }, [isDropdownOpen]);

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

                    <Text style={styles.txtHead}>Presensi</Text>
                </View>

                {/* ini body */}
                <View style={styles.body}>
                    {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                        Form Presensi Harian
                    </Text> */}
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Nama:</Text>
                        <Text
                            style={{
                                ...styles.component,
                            }}
                        >
                            {UserDetailsData?.user.nama}
                        </Text>
                    </View>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Divisi:</Text>
                        <Text
                            style={{
                                ...styles.component,
                            }}
                        >
                            {UserDetailsData?.user.divisi}
                        </Text>
                    </View>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Tanggal:</Text>
                        <Text
                            style={{
                                ...styles.component,
                            }}
                        >
                            {new Date().getDate()}/{new Date().getMonth() + 1}/
                            {new Date().getFullYear()}
                        </Text>
                    </View>
                    <View style={{ ...styles.judulComponent, zIndex: 1 }}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Status:</Text>
                        <DropDownPicker
                            placeholder="Pilih Kehadiran"
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{
                                // backgroundColor: "white",

                                padding: 10,
                            }}
                            containerStyle={{
                                height: deviceHeight / 18,
                            }}
                            textStyle={{
                                fontSize: 16,
                            }}
                            onOpen={() => setIsDropdownOpen(true)}
                            onClose={() => setIsDropdownOpen(false)}
                            // onChangeValue={(selectedValue) => {
                            //     console.log("Selected Value:", selectedValue);
                            //     setValue(selectedValue);
                            // }}
                        />
                        {/* {isLoadingStatusPresensi ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size={10} color="#3EB772" />
                            </View>
                        ) : null} */}
                    </View>

                    {(value === 2 || value === 3 || value === 4) && (
                        <>
                            <View style={styles.judulComponent}>
                                <Text style={{ fontSize: 18, marginBottom: 8 }}>
                                    Bukti
                                </Text>
                                <View>
                                    <TouchableOpacity
                                        onPress={pickPdf}
                                        style={{
                                            ...styles.component,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            padding: 10,
                                        }}
                                    >
                                        <Text style={{ color: "black", fontSize: 16 }}>
                                            Pilih file
                                        </Text>
                                    </TouchableOpacity>
                                    {file && (
                                        <Text style={{ padding: 5 }}>
                                            <Icons
                                                name="ios-document-attach-outline"
                                                color={"black"}
                                                size={15}
                                            />
                                            {file.name.length > 20
                                                ? file.name.substring(0, 20) + "..."
                                                : file.name}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.judulComponent}>
                                <Text style={{ fontSize: 18, marginBottom: 8 }}>
                                    Keterangan
                                </Text>
                                <View>
                                    <TextInput
                                        placeholder="Isi Keterangan..."
                                        value={keterangan}
                                        style={{
                                            ...styles.TextField,

                                            borderColor: keteranganError
                                                ? "red"
                                                : "black", // Set border color based on validation
                                        }}
                                        onChangeText={(text) => {
                                            setKeterangan(text);
                                            setKeteranganError(""); // Clear error when user types
                                        }}
                                    />
                                    {keteranganError ? (
                                        <Text style={{ color: "red", fontSize: 12 }}>
                                            {keteranganError}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        </>
                    )}

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

export default PresensiScreen;

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
        borderWidth: 2,
        borderColor: "#F0F0F0",
    },
    judulComponent: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 8,
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
