import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
    LogBox,
    ToastAndroid,
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
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import defaultAxios, { AxiosError } from "axios";

type PresensiData = {
    user_id: number;
    tanggal: string;
    status: number;
    bukti: string;
    keterangan: string;
};
// interface IPresensiScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const PresensiScreen = () => {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    const [keterangan, setKeterangan] = useState<string>("");

    const [file, setFile] = useState<any>();
    const { data: UserDetailsData } = useUserDetails();
    const { data: StatusPresensiData } = useStatusPresensi();
    const [isLoadingStatusPresensi, setIsLoadingStatusPresensi] = useState(true);
    const navigation = useNavigation<NavigationProps>();
    const onBackPressed = () => {
        navigation.navigate("Main");
    };
    const onSubmitPressed = () => {
        sendDataToApi();
    };

    // const bottomSheetModalRef = useRef(null);

    // const snapPoints = ["40%"];

    // function handlePresentModal() {
    //   bottomSheetModalRef.current?.present();
    // }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number | null>(null);
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
        bodyFormData.append("status", "2");
        // bodyFormData.append("keterangan", keterangan);

        console.log("BODY:", bodyFormData);
        axios
            .post<any>(apiUrl, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // if (response.data.status === 1) {
                //     console.log("API Response:", response.data);
                //     Alert.alert("Anda Berhasil Presensi", response.data.tanggal);
                // } else if (response.data.status === 2) {
                //     console.log("API Response:", response.data);
                //     Alert.alert("Anda Berhasil Izin", response.data.tanggal);
                // } else if (response.data.status === 3) {
                //     console.log("API Response:", response.data);
                //     Alert.alert("Anda Berhasil Cuti", response.data.tanggal);
                // } else if (response.data.status === 4) {
                //     console.log("API Response:", response.data);
                //     Alert.alert("Anda Berhasil WFH", response.data.tanggal);
                // } else {
                //     console.log("API Response:", response.data);
                //     Alert.alert(
                //         "Status Tidak Dikenali",
                //         `Status: ${response.data.status}, Tanggal: ${response.data.tanggal}`
                //     );
                // }
            })
            .catch((error) => {
                handleErrorResponse(error);
            });
    };
    // useEffect(() => {
    //   const status = StatusPresensiData?.user?.map((value) => ({
    //     label: value.nama,
    //     value: value.id,
    //   }));
    //   setItems(status ?? []);
    //   console.log("StatusPresensiData:", StatusPresensiData);
    // }, [StatusPresensiData?.user]);

    const handleErrorResponse = useCallback((error: any) => {
        if (defaultAxios.isAxiosError(error)) {
            const serverError = error as AxiosError<any>;
            if (serverError && serverError.response) {
                console.log(JSON.stringify(serverError.response.data));
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
        if (StatusPresensiData) {
            const status = StatusPresensiData.user?.map((value) => ({
                label: value.nama,
                value: value.id,
            }));
            setItems(status ?? []);
            setIsLoadingStatusPresensi(false);
        }
    }, [StatusPresensiData]);

    if (isLoadingStatusPresensi) {
        <View>
            <Text>Loading...</Text>
        </View>;
    }
    console.log(value);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                nestedScrollEnabled
                style={{
                    height: deviceHeight / 1,
                    ...styles.container,
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
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                        Form Presensi Harian
                    </Text>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18 }}>Nama:</Text>
                        <Text
                            style={{
                                ...styles.component,
                                width: deviceWidth / 1.7,
                            }}
                        >
                            {UserDetailsData?.user.nama}
                        </Text>
                    </View>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18 }}>Divisi:</Text>
                        <Text
                            style={{
                                ...styles.component,
                                width: deviceWidth / 1.7,
                            }}
                        >
                            {UserDetailsData?.user.divisi}
                        </Text>
                    </View>
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18 }}>Tanggal:</Text>
                        <Text
                            style={{
                                ...styles.component,
                                width: deviceWidth / 1.7,
                            }}
                        >
                            {new Date().getDate()}/{new Date().getMonth() + 1}/
                            {new Date().getFullYear()}
                        </Text>
                    </View>
                    <View style={{ ...styles.judulComponent, zIndex: 1 }}>
                        <Text style={{ fontSize: 18 }}>Status:</Text>
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
                                width: deviceWidth / 1.7,
                                padding: 10,
                            }}
                            containerStyle={{
                                width: deviceWidth / 1.7,
                                height: deviceHeight / 18,
                            }}
                            textStyle={{
                                fontSize: 16,
                            }}
                        />
                    </View>

                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18 }}>Bukti</Text>
                        <View>
                            <TouchableOpacity
                                onPress={pickPdf}
                                style={{
                                    width: deviceWidth / 1.7,
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
                        </View>
                    </View>
                    {file && (
                        <Text numberOfLines={1} style={{ padding: 5 }}>
                            File: {file.name}
                        </Text>
                    )}
                    <View style={styles.judulComponent}>
                        <Text style={{ fontSize: 18 }}>Keterangan</Text>
                        <View>
                            <TextInput
                                placeholder="Isi Keterangan"
                                value={keterangan}
                                style={{ ...styles.TextField, width: deviceWidth / 1.7 }}
                                onChangeText={setKeterangan}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={onSubmitPressed}
                        style={{
                            backgroundColor: "#3EB772",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10,
                            borderRadius: 10,
                            marginVertical: 15,
                        }}
                    >
                        <Text
                            style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                        >
                            Kirim
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default PresensiScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: "7%",
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
        width: "80%",
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
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        alignItems: "center",
    },
    TextField: {
        backgroundColor: "white",
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
    },
});
