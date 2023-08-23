import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "../services/axios";
import { BASE_URL } from "../config";

type Response = {
    code: number;
    status: string;
    message: string;
    uuid: string;
};

export default function BarcodeScanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const sendDataToApi = (uuid: string) => {
        const apiUrl = `${BASE_URL}/storepresensiqr`;

        axios
            .post<Response>(apiUrl, { uuid: uuid })
            .then((response) => {
                if (response.data.code === 200) {
                    console.log("API Response:", response.data);
                    Alert.alert("Success", response.data.message);
                }
            })
            .catch((error) => {
                if (error.response.data.message) {
                    Alert.alert("Error", error.response.data.message);
                } else {
                    Alert.alert("Error", "Error sending data to API ]");
                }
            });
    };

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        // Call the function to send data to the API
        sendDataToApi(data);
    };

    if (hasPermission === null) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.overlay}>
                <Ionicons name={"scan-outline"} size={350} color={"white"} />
            </View>
            {scanned && (
                <Text style={styles.text} onPress={() => setScanned(false)}>
                    Sentuh untuk Memindai
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginRight: 10,
        // height: "100%",
        // backgroundColor: "white",
        // width: "100%",
        backgroundColor: "white",
    },
    // text: {
    //     marginTop: "20%",
    //     color: "grey",
    //     padding: 13,
    //     textAlign: "center",
    //     justifyContent: "center",
    //     position: "relative",
    //     backgroundColor: "white",
    //     alignSelf: "center",
    //     width: 200,
    //     borderRadius: 10,
    //     height: 50,
    //     fontWeight: "bold",
    // },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        marginHorizontal: 15,
    },
    text: {
        marginTop: 700, // Adjust this value as needed
        color: "grey",
        padding: 13,
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        fontWeight: "bold",
        marginHorizontal: 100,
    },
    barcode: {
        height: 300,
        width: 300,
    },
});
