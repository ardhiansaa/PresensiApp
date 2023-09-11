import React, { useContext } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import Alerts from "../Components/Alert";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
import Body from "../Components/Body";
import History from "../Components/History";
import { useGetPresensi } from "../src/GetPresensi";
import { useUserDetails } from "../src/UserDetails";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const Home = () => {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    const { logout } = useContext(AuthContext);
    const { data: presensiData, isLoading } = useGetPresensi();
    const { data: userDetailsData } = useUserDetails();

    const navigation = useNavigation<NavigationProps>();

    const getHistoryIcon = (status: number) => {
        switch (status) {
            case 1:
                return <Icon name="account-check" size={40} color="#3EB772" />;
            case 2:
                return <Icon name="email" size={40} color="red" />;
            case 3:
                return <Icon name="hospital-box" size={40} color={"#F1C93B"} />;
            case 4:
                return <Icon name="home-automation" size={40} color={"#3EB772"} />;
            default:
                return <Icons name="ios-information-circle" size={40} color={"black"} />;
        }
    };

    const onPresensiPressed = () => {
        navigation.navigate("Presensi");
    };

    const onCutiPressed = () => {
        navigation.navigate("Cuti");
    };

    const onLogOut = () => {
        logout();
    };

    const getContent = () => {
        return (
            <ActivityIndicator
                size="large"
                style={{ justifyContent: "center", alignItems: "center" }}
            />
        );
    };
    if (isLoading) {
        return (
            <View
                style={{
                    height: "100%",
                    justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                {getContent()}
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* ini header */}
                <View
                    style={{
                        height: deviceHeight / 11,
                        ...styles.header,
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../assets/logoNore.png")}
                            style={{ width: 100, height: 50, alignSelf: "center" }}
                        />
                    </View>

                    <Icon name="logout" size={30} color={"#BBBBBB"} onPress={onLogOut} />
                </View>
                {!userDetailsData?.user.validasi_presensi === true && (
                    <>
                        <View
                            style={{
                                backgroundColor: "#3EB772",
                                borderWidth: 0,
                                paddingTop: 15,
                            }}
                        >
                            {/* ini alert */}
                            <View
                                style={{
                                    height: deviceHeight / 9,
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    // borderWidth: 1,
                                }}
                            >
                                <Alerts />
                            </View>
                        </View>
                    </>
                )}
                <View style={{ backgroundColor: "#3EB772" }}>
                    {/* ini main fitur */}
                    <View style={styles.mainFitur}>
                        <View
                            style={{
                                // justifyContent: "space-between",
                                // paddingVertical: 10,
                                justifyContent: "center",
                                maxWidth: deviceWidth / 1.2,
                                maxHeight: deviceHeight / 9,
                                paddingBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: "bold",
                                }}
                            >
                                {userDetailsData?.user.nama}
                            </Text>
                            <Text
                                style={{
                                    color: "#BBBBBB",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                }}
                            >
                                {userDetailsData?.user.divisi}
                            </Text>
                        </View>

                        <View
                            style={{
                                borderTopWidth: 1,
                                paddingTop: 15,
                                borderColor: "#C5C7C5",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity onPress={onPresensiPressed}>
                                <View
                                    style={{
                                        ...styles.presensiButton,
                                        width: deviceWidth / 2.7,
                                    }}
                                >
                                    {/* <Icons name="ios-log-in-outline" size={40} color={"white"} /> */}
                                    <Text style={styles.txtMainMenu}>Presensi</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCutiPressed}>
                                <View
                                    style={{
                                        ...styles.cutiButton,
                                        width: deviceWidth / 2.7,
                                    }}
                                >
                                    {/* <Icons name="ios-log-in-outline" size={40} color={"white"} /> */}
                                    <Text style={styles.txtMainMenu}>Cuti</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
                    <Text style={styles.txtPresensi}>Presensi Anda</Text>
                </View>

                {/* ini body */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: "white" }}
                >
                    <View
                        style={{
                            ...styles.body,
                            height: deviceHeight / 7.2,
                        }}
                    >
                        <Body
                            textJudul="Hadir"
                            textJumlahHari={userDetailsData?.user.hadir}
                            icon={<Icon name="account-check" size={50} color="#3EB772" />}
                        />
                        <Body
                            textJudul="Sisa Cuti"
                            textJumlahHari={userDetailsData?.user.sisa_cuti}
                            icon={<Icon name="briefcase-clock" size={50} color="red" />}
                        />
                        <Body
                            textJudul="Sakit"
                            textJumlahHari={userDetailsData?.user.sakit}
                            icon={
                                <Icon name="hospital-box" size={50} color={"#F1C93B"} />
                            }
                        />
                        <Body
                            textJudul="Izin"
                            textJumlahHari={userDetailsData?.user.izin}
                            icon={<Icon name="email" size={50} color="red" />}
                        />
                        <Body
                            textJudul="WFH"
                            textJumlahHari={userDetailsData?.user.WFH}
                            icon={
                                <Icon
                                    name="home-automation"
                                    size={50}
                                    color={"#3EB772"}
                                />
                            }
                        />
                    </View>
                </ScrollView>

                {/* ini txt Riwayat */}
                <View
                    style={{
                        marginTop: 10,
                        backgroundColor: "white",
                        paddingVertical: 10,
                    }}
                >
                    <Text style={styles.txtRiwayat}>Riwayat Terbaru</Text>

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
                        // height: deviceHeight / 3.3,
                    }}
                >
                    {presensiData?.data?.presensi &&
                        presensiData?.data?.presensi
                            .slice(-5)
                            .reverse()
                            .map((item) => (
                                <View key={item.id}>
                                    <History
                                        textJudul={item.status_kehadiran}
                                        textTimeStamp={item.tanggal}
                                        icon={getHistoryIcon(item.status)}
                                    />
                                </View>
                            ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // marginTop: "7%",
        backgroundColor: "#F0F0F0",
    },
    header: {
        // width: "100%",
        backgroundColor: "white",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: "#DDDDDD",

        // borderWidth: 2,
    },
    mainFitur: {
        flexDirection: "column",
        marginHorizontal: 20,

        marginVertical: 30,
        // alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
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
        flexDirection: "row",
        marginHorizontal: 20,
        paddingVertical: 5,
        // justifyContent: "space-between",
        // marginTop: 20,
        backgroundColor: "white",
    },
    txtMainMenu: {
        fontSize: 14,
        color: "white",
        // marginTop: 2,
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
    presensiButton: {
        backgroundColor: "#3EB772",
        borderRadius: 15,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    cutiButton: {
        backgroundColor: "red",
        borderRadius: 15,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
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
    txtPresensi: {
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    txtRiwayat: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 20,
    },
});
