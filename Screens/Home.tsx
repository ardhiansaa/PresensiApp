import React, { FC, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Alerts from "../Components/Alert";
import Icon from "@expo/vector-icons/Feather";
import Icons from "@expo/vector-icons/Ionicons";
import Sick from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
import Body from "../Components/Body";
import History from "../Components/History";
import { useGetPresensi } from "../src/GetPresensi";

type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const Home = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const { logout, userInfo } = useContext(AuthContext);
  const { data, isLoading } = useGetPresensi();

  const navigation = useNavigation<NavigationProps>();

  const onQRPressed = () => {
    navigation.navigate("QR");
  };
  const onRiwayatPressed = () => {
    navigation.navigate("Riwayat");
  };
  const onPresensiPressed = () => {
    navigation.navigate("Presensi");
  };
  const onForgotPressed = () => {
    navigation.navigate("Home");
  };

  const onLogOut = () => {
    logout();
  };

  const getContent = () => {
    return <ActivityIndicator size="small" />;
  };
  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getContent()}
      </View>
      // <Text style={{ justifyContent: "center", alignItems: "center" }}>
      //   Loading..
      // </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ini header */}
      <View
        style={{
          height: deviceHeight / 11,
          // width: "100%",
          backgroundColor: "white",

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          paddingHorizontal: 20,
          borderBottomWidth: 2,
          borderColor: "#DDDDDD",

          // borderWidth: 2,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* <Icon name="user" size={45} color="white" /> */}
          <View style={{}}>
            <Text style={styles.name}>{userInfo.user.nama}</Text>
            <Text style={styles.position}>{userInfo.user.divisi}</Text>
          </View>
        </View>

        <Icon name="log-out" size={30} color={"grey"} onPress={onLogOut} />
      </View>

      <View style={{ backgroundColor: "#3EB772" }}>
        {/* ini alert */}
        <View
          style={{
            height: deviceHeight / 7,
            justifyContent: "space-around",
            alignItems: "center",
            // borderWidth: 1,
          }}
        >
          <Alerts />
        </View>

        {/* ini main fitur */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 0,
            marginVertical: 10,
            // alignContent: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 42,
                fontWeight: "bold",
              }}
            >
              {new Date().getHours()}
              {":"}
              {new Date().getMinutes()}
            </Text>
            <Text style={{ color: "grey", fontSize: 22, fontWeight: "bold" }}>
              {new Date().getDate()}
              {"/"}
              {new Date().getMonth() + 1}
              {"/"}
              {new Date().getFullYear()}
            </Text>
          </View>

          <TouchableOpacity onPress={onPresensiPressed}>
            <View
              style={{
                backgroundColor: "#3EB772",
                borderRadius: 15,
                padding: 10,
                width: deviceWidth / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icons name="ios-log-in-outline" size={40} color={"white"} />
              <Text style={styles.txtMainMenu}>Presensi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ini txt Presensi */}
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          paddingVertical: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Presensi Anda
        </Text>
      </View>

      {/* ini body */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            // justifyContent: "space-between",
            marginTop: 0,
            backgroundColor: "white",
            height: deviceHeight / 6,
          }}
        >
          <Body
            textJudul="Hadir"
            textJumlahHari={data?.data.Hadir}
            icon={
              <Icons name="ios-checkmark-circle" size={50} color="#3EB772" />
            }
          />
          <Body
            textJudul="Sisa Cuti"
            textJumlahHari={data?.data.sisa_cuti}
            icon={<Icons name="ios-close-circle" size={50} color="red" />}
          />
          <Body
            textJudul="Sakit"
            textJumlahHari={data?.data.sakit}
            icon={<Icons name="ios-sad" size={50} color={"#F1C93B"} />}
          />
          <Body
            textJudul="Izin"
            textJumlahHari={data?.data.izin}
            icon={<Icons name="ios-mail" size={50} color="red" />}
          />
          <Body
            textJudul="WFH"
            textJumlahHari={data?.data.WFH}
            icon={<Icons name="ios-home" size={45} color={"#3EB772"} />}
          />
        </View>
      </ScrollView>

      {/* ini txt Riwayat */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginHorizontal: 20,
          }}
        >
          Riwayat Terbaru
        </Text>

        {/* <TouchableOpacity>
          <Text
            style={{
              color: "#229c59",
              fontWeight: "bold",
              fontSize: 15,
              marginHorizontal: 20,
            }}
            onPress={onRiwayatPressed}
          >
            Lihat Semua
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* ini isi riwayat terbaru */}
      <View
        style={{
          alignItems: "center",
          // marginHorizontal: 25,
          backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <FlatList
          data={data?.data.presensi.slice(-2).reverse()}
          renderItem={({ item }) => (
            <View>
              <History
                textJudul={item.status_kehadiran}
                textTimeStamp={item.tanggal}
                icon={<Icons />}
              />
            </View>
          )}
          keyExtractor={(item, index) => item.id.toLocaleString()}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    marginTop: "7%",
    backgroundColor: "#F0F0F0",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
    color: "black",
  },
  position: {
    color: "grey",
  },

  body: {
    borderRadius: 0,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#070A0D",
  },
  txtMainMenu: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
    fontWeight: "600",
  },
  presensiBox: {
    padding: 15,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#DDDDDD",
  },
  component: {
    flexDirection: "row",
    borderWidth: 1.5,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    // height: 100,
    // paddingHorizontal: 20,
    padding: 25,
    borderColor: "#DDDDDD",
  },
});
