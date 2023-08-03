import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { NavigationParamList } from "../types/navigation";
import Icons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../Context/AuthContext";
import * as DocumentPicker from "expo-document-picker";
import axios from "../services/axios";

// interface IPresensiScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const PresensiScreen = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const [pdfUri, setPdfUri] = useState("");

  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();
  const onBackPressed = () => {
    navigation.navigate("Main");
  };
  const onSubmitPressed = () => {
    navigation.navigate("Main");
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Hadir", value: "hadir" },
    { label: "Sakit", value: "sakit" },
    { label: "Izin", value: "izin" },
    { label: "Cuti", value: "cuti" },
    { label: "WFH", value: "wfh" },
  ]);

  // const pickDocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     type: "application/pdf",
  //     multiple: false,
  //   });
  //   console.log(result.type);
  //   console.log(result);
  // };
  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/jpg"],
      });

      if (result.type === "success") {
        console.log("PDF picked:", result.name);
        setPdfUri(result.name);
      } else {
        console.log("PDF picking was canceled.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async () => {
    try {
      // Prepare the data to send
      const dataToSend = {
        nama: userInfo.user.nama,
        divisi: userInfo.user.divisi,
        tanggal: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
        status: value,
        bukti: pdfUri, // Assuming pdfUri is the path or name of the selected PDF file
      };

      // Make the API POST request
      const response = await axios.post(
        `https://optest.noretest.com/api/storepresensi`,
        dataToSend
      );

      // Handle the response (if needed)
      console.log(response.data);

      // Show a success message
      Alert.alert(
        "Success",
        "Data has been successfully submitted to the API."
      );

      // Optionally, you can navigate to another screen after successful submission
      navigation.navigate("Main");
    } catch (error) {
      // Handle errors that occurred during the request
      console.error("Error:", error);
      Alert.alert("Error", "Failed to submit data to the API.");
    }
  };

  return (
    <View
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
              width: deviceWidth / 1.5,
            }}
          >
            {userInfo.user.nama}
          </Text>
        </View>
        <View style={styles.judulComponent}>
          <Text style={{ fontSize: 18 }}>Divisi:</Text>
          <Text
            style={{
              ...styles.component,
              width: deviceWidth / 1.5,
            }}
          >
            {userInfo.user.divisi}
          </Text>
        </View>
        <View style={styles.judulComponent}>
          <Text style={{ fontSize: 18 }}>Tanggal:</Text>
          <Text
            style={{
              ...styles.component,
              width: deviceWidth / 1.5,
            }}
          >
            {new Date().getDate()}/{new Date().getMonth() + 1}/
            {new Date().getFullYear()}
          </Text>
        </View>

        <View style={{ ...styles.judulComponent, zIndex: 1 }}>
          <Text style={{ fontSize: 18 }}>Status:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              // backgroundColor: "white",
              width: deviceWidth / 1.5,
              padding: 10,
            }}
            containerStyle={{
              width: deviceWidth / 1.5,
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
                width: deviceWidth / 1.5,
                ...styles.component,
                borderColor: "black",
                borderWidth: 1,
                padding: 10,
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Pilih file</Text>
            </TouchableOpacity>
            {pdfUri && (
              <Text numberOfLines={1} style={{ padding: 5 }}>
                Selected PDF: {pdfUri}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleFormSubmit}
          style={{
            backgroundColor: "#3EB772",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 10,
            marginVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            Kirim
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PresensiScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
});
