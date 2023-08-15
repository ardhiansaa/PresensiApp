import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Icons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";

import { useGetPresensi } from "../src/GetPresensi";
import History from "../Components/History";

// interface IRiwayatScreenProps {

// }
// type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const ITEMS_PER_PAGE = 10;

const RiwayatScreen = () => {
    const deviceHeight = Dimensions.get("window").height;
    const { data, isLoading } = useGetPresensi();
    const [currentPage, setCurrentPage] = useState<number>(1);

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
    // const navigation = useNavigation<NavigationProps>();

    // const onBackPressed = () => {
    //     navigation.navigate("Main");
    // };

    const totalPages = Math.ceil((data?.data?.presensi?.length ?? 0) / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const sortedPresensi = data?.data?.presensi?.slice().sort((a, b) => {
        const dateA = new Date(a.tanggal) as any;
        const dateB = new Date(b.tanggal) as any;
        return dateB - dateA;
    });

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
            </View>
        );
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
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

                {/* <View
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
                </View> */}

                {/* ini konten */}
                <View
                    style={{
                        alignItems: "center",
                        // marginHorizontal: 25,
                        // backgroundColor: "white",
                        // paddingBottom: 20,
                        marginTop: 15,
                    }}
                >
                    {sortedPresensi &&
                        sortedPresensi.slice(startIndex, endIndex).map((item) => (
                            <View key={item.id}>
                                <History
                                    textJudul={item.status_kehadiran}
                                    textTimeStamp={item.tanggal}
                                    icon={getHistoryIcon(item.status)}
                                />
                            </View>
                        ))}
                </View>

                {/* Pagination */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 20,
                        marginHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        style={[
                            styles.paginationButton,
                            { opacity: currentPage === 1 ? 0.3 : 1 },
                        ]}
                        onPress={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <Icon
                            name="arrow-left-drop-circle-outline"
                            size={35}
                            color="grey"
                        />
                    </TouchableOpacity>

                    <Text style={styles.currentPageText}>
                        {" "}
                        Halaman {currentPage} dari {totalPages}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.paginationButton,
                            { opacity: currentPage === totalPages ? 0.3 : 1 },
                        ]}
                        onPress={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <Icon
                            name="arrow-right-drop-circle-outline"
                            size={35}
                            color="grey"
                        />
                    </TouchableOpacity>
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
    paginationButton: {
        borderRadius: 20,
        padding: 7,
    },

    currentPageText: {
        color: "grey",
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 20,
        alignSelf: "center",
    },
});
