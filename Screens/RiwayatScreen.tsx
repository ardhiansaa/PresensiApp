import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import Icons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import "react-native-gesture-handler";

import { useGetPresensi } from "../src/GetPresensi";
import History from "../Components/History";
import { ScrollView } from "react-native-gesture-handler";
// interface IRiwayatScreenProps {

// }
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const RiwayatScreen = () => {
    const deviceHeight = Dimensions.get("window").height;
    const { data, isLoading } = useGetPresensi();
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
            case 5:
                return <Icon name="briefcase-clock" size={40} color="red" />;
            default:
                return <Icons name="ios-information-circle" size={40} color={"black"} />;
        }
    };
    const navigation = useNavigation<NavigationProps>();

    const onBackPressed = () => {
        navigation.navigate("Main");
    };

    const getContent = () => {
        return <ActivityIndicator size="small" />;
    };
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {getContent()}
                <Text
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        color: "red",
                    }}
                >
                    Loading..
                </Text>
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
                    <Text style={styles.txtHead}>Riwayat</Text>
                </View>

                {/* ini filter */}
                <View></View>

                {/* ini filter */}

                {/* ini konten */}
                <View
                    style={{
                        alignItems: "center",
                        // marginHorizontal: 25,
                        // backgroundColor: "white",
                        paddingBottom: 20,
                    }}
                >
                    {data?.data?.presensi
                        .slice()
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

export default RiwayatScreen;

const styles = StyleSheet.create({
    container: {
        // height: "100%",
        marginTop: "7%",
        backgroundColor: "white",
    },
    header: {
        // width: "100%",
        backgroundColor: "white",

        // flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: "#DDDDDD",
    },
    txtHead: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
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
    containerBottomSheet: {
        flex: 1,
        padding: 20,
    },
    titleBottomSheet: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
