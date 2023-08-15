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

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        // Call the function to send data to the API
        sendDataToApi(data);
    };

    if (hasPermission === null) {
        return (
            <Text style={{ justifyContent: "center", alignContent: "center" }}>
                Requesting for camera permission
            </Text>
        );
    }
    if (hasPermission === false) {
        return (
            <Text style={{ justifyContent: "center", alignContent: "center" }}>
                No access to camera
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={{ alignItems: "center", top: 200, left: 13, opacity: 0.6 }}>
                <Ionicons name={"scan-outline"} size={400} color={"white"} />
            </View>
            {scanned && (
                <Text style={styles.text} onPress={() => setScanned(false)}>
                    Tap to Scan Again
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
    text: {
        marginTop: "70%",
        color: "grey",
        padding: 13,
        textAlign: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "white",
        alignSelf: "center",
        width: 200,
        borderRadius: 10,
        height: 50,
        fontWeight: "bold",
    },
    barcode: {
        height: 300,
        width: 300,
    },
});
