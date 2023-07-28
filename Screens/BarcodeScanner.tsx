import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState<any>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* <Text
        style={{
          marginTop: "20%",
          textAlign: "center",
          height: "100%",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Scan QR Code
      </Text> */}

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
    marginRight: 10,
    height: "100%",
    backgroundColor: "white",
    width: "100%",
  },
  text: {
    marginTop: "80%",
    color: "grey",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
    alignSelf: "center",
    width: 150,
    borderRadius: 10,
  },
  barcode: {
    height: 300,
    width: 300,
  },
});
