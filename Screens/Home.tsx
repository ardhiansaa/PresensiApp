import React, { FC, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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

type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const Home = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const { logout, userInfo } = useContext(AuthContext);
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
          borderBottomWidth: 4,
          borderColor: "#DDDDDD",

          // borderWidth: 2,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* <Icon name="user" size={45} color="white" /> */}
          <View style={{}}>
            <Text style={styles.name}>{userInfo.user.nama}</Text>
            <Text style={styles.position}>{userInfo.role.divisi}</Text>
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
            textJumlahHari="3 Hari"
            icon={
              <Icons name="ios-checkmark-circle" size={50} color="#3EB772" />
            }
          />
          <Body
            textJudul="Cuti"
            textJumlahHari="2 Hari"
            icon={<Icons name="ios-close-circle" size={50} color="red" />}
          />
          <Body
            textJudul="Sakit"
            textJumlahHari={userInfo.user.sakit}
            icon={<Sick name="emoticon-sick" size={50} color={"#F1C93B"} />}
          />
          <Body
            textJudul="Izin"
            textJumlahHari={userInfo.user.izin}
            icon={<Icons name="ios-mail" size={50} color="red" />}
          />
          <Body
            textJudul="WFH"
            textJumlahHari="2 Hari"
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
        <View style={{ ...styles.component, width: deviceWidth / 1.11 }}>
          <Icons name="ios-log-in" size={40} color={"green"} />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
              Hadir
            </Text>
            <Text style={{ color: "grey" }}>13 Juli 2023, 10.00 WIB</Text>
          </View>
        </View>

        <View style={{ ...styles.component, width: deviceWidth / 1.11 }}>
          <Icons name="ios-close-circle" size={40} color={"red"} />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
              Cuti
            </Text>
            <Text style={{ color: "grey" }}>12 Juli 2023, 10.00 WIB</Text>
          </View>
        </View>
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
