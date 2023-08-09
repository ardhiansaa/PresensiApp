import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

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

  const [pdfUri, setPdfUri] = useState("");
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
        console.log("PDF picked:", result.name);
        setPdfUri(result.name);
      } else {
        console.log("PDF picking was canceled.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendDataToApi = () => {
    const apiUrl = `${BASE_URL}/storepresensi`;
    const file = getImageMeta(pdfUri);
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
    axios
      .post<PresensiData>(apiUrl, bodyFormData)
      .then((response) => {
        if (response.data.status === 1) {
          console.log("API Response:", response.data);
          Alert.alert("Anda Berhasil Presensi", response.data.tanggal);
        } else if (response.data.status === 2) {
          console.log("API Response:", response.data);
          Alert.alert("Anda Berhasil Izin", response.data.tanggal);
        } else if (response.data.status === 3) {
          console.log("API Response:", response.data);
          Alert.alert("Anda Berhasil Cuti", response.data.tanggal);
        } else if (response.data.status === 4) {
          console.log("API Response:", response.data);
          Alert.alert("Anda Berhasil WFH", response.data.tanggal);
        } else {
          console.log("API Response:", response.data);
          Alert.alert(
            "Status Tidak Dikenali",
            `Status: ${response.data.status}, Tanggal: ${response.data.tanggal}`
          );
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          Alert.alert("Error", error.response.data.message);
        } else {
          Alert.alert("Error", "Error sending data to API");
        }
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
                <Text style={{ color: "black", fontSize: 16 }}>Pilih file</Text>
              </TouchableOpacity>
              {pdfUri && (
                <Text numberOfLines={1} style={{ padding: 5 }}>
                  File: {pdfUri}
                </Text>
              )}
            </View>
          </View>
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
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
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
