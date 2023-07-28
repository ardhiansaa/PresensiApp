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
} from "react-native";
import { NavigationParamList } from "../types/navigation";
import Icons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../Context/AuthContext";
import * as DocumentPicker from "expo-document-picker";
// interface IPresensiScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const PresensiScreen = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const [pdfUri, setPdfUri] = useState(null);

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
        type: ["image/png", "application/pdf", "image/jpg"],
      });

      if (result.type === "success") {
        console.log("PDF picked:", result.uri);
        setPdfUri(result.uri);
      } else {
        console.log("PDF picking was canceled.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
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
            {userInfo.role.divisi}
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
        <Text
          style={{
            color: "black",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          Pilih Kehadiran:
        </Text>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: "white",
              width: 200,
            }}
            containerStyle={{ width: 200 }}
            textStyle={{
              fontSize: 20,
            }}
          />
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: "#2C7873",
              width: 100,
            }}
            onPress={onSubmitPressed}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                padding: 12,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="Pick a PDF" onPress={() => pickPdf()} />
          {pdfUri && <Text>Selected PDF: {pdfUri}</Text>}
        </View>
      </View>
    </View>
  );
};

export default PresensiScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 40,
    backgroundColor: "#F0F0F0",
  },
  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    borderBottomWidth: 4,
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
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },
  judulComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
});
