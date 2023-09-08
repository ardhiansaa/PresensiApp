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

import { useGetCuti } from "../src/GetCuti";
import CutiCards from "../Components/CutiCards";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// interface IRiwayatScreenProps {

// }
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const ITEMS_PER_PAGE = 5;

const CutiScreen = () => {
    const deviceHeight = Dimensions.get("window").height;
    const { data, isLoading } = useGetCuti();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleCategorySelect = (category: number | null) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset the current page when selecting a new category
    };

    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>();
    const onBackPressed = () => {
        navigation.navigate("Main");
    };

    const onAjukanCutiPressed = () => {
        navigation.navigate("AjukanCuti");
    };

    const getCutiIcon = (status: number) => {
        switch (status) {
            case 1:
                return <Icon name="timer-sand" size={40} color="#F1C93B" />;
            case 2:
                return <Icon name="check-circle" size={40} color="#3EB772" />;
            case 3:
                return <Icon name="close-circle" size={40} color="red" />;
        }
    };
    // const navigation = useNavigation<NavigationProps>();
    const sortedCuti = data?.data?.cuti?.slice().sort((a, b) => {
        const dateA = new Date(a.created_at) as any;
        const dateB = new Date(b.created_at) as any;
        return dateB - dateA;
    });

    const visibleCuti = sortedCuti
        ? sortedCuti.filter(
              (item) => selectedCategory === null || selectedCategory === item.status
          )
        : [];

    const totalPages = Math.ceil(visibleCuti.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const hasEnoughItemsToShowPagination = visibleCuti.length > ITEMS_PER_PAGE;

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

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: inset.top }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* ini header */}
                <View
                    style={{
                        height: deviceHeight / 11,
                        ...styles.header,
                    }}
                >
                    <TouchableOpacity onPress={onBackPressed}>
                        <Icons name="ios-chevron-back-outline" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.txtHead}>Cuti</Text>
                </View>

                <View style={{ margin: 20, marginBottom: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#3EB772",
                            padding: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                        }}
                        onPress={onAjukanCutiPressed}
                    >
                        <Text
                            style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                        >
                            Ajukan Cuti
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoryButtons}>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === null && styles.selectedCategoryButton,
                        ]}
                        onPress={() => handleCategorySelect(null)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === null && styles.selectedButtonText,
                            ]}
                        >
                            Semua
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === 1 && styles.selectedCategoryButton,
                        ]}
                        onPress={() => handleCategorySelect(1)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === 1 && styles.selectedButtonText,
                            ]}
                        >
                            Diajukan
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === 2 && styles.selectedCategoryButton,
                        ]}
                        onPress={() => handleCategorySelect(2)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === 2 && styles.selectedButtonText,
                            ]}
                        >
                            Diterima
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === 3 && styles.selectedCategoryButton,
                        ]}
                        onPress={() => handleCategorySelect(3)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === 3 && styles.selectedButtonText,
                            ]}
                        >
                            Ditolak
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ini konten */}
                <View
                    style={{
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    {visibleCuti &&
                        visibleCuti.slice(startIndex, endIndex).map((item) => (
                            <View key={item.id}>
                                <CutiCards
                                    textJudul={item.status_cuti}
                                    verifikator={item.verifikator_2}
                                    tanggalmulai={item.tanggal_mulai}
                                    tanggalselesai={item.tanggal_akhir}
                                    icon={getCutiIcon(item.status)}
                                    created_at={item.created_at}
                                />
                            </View>
                        ))}
                </View>

                {/* Pagination */}
                {hasEnoughItemsToShowPagination && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // marginVertical: 20,
                            marginHorizontal: 15,
                            marginBottom: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                styles.paginationButton,
                                { opacity: currentPage === 1 ? 0.2 : 1 },
                            ]}
                            onPress={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <Icon name="arrow-left-thick" size={35} color="#3EB772" />
                        </TouchableOpacity>

                        <Text style={styles.currentPageText}>
                            {" "}
                            Halaman {currentPage} dari {totalPages}
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.paginationButton,
                                { opacity: currentPage === totalPages ? 0.2 : 1 },
                            ]}
                            onPress={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Icon name="arrow-right-thick" size={35} color="#3EB772" />
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CutiScreen;

const styles = StyleSheet.create({
    container: {
        // height: "100%",
        // marginTop: "7%",
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
    txtHead: {
        width: "83%",
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
        color: "#C5C7C5",
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 20,
        alignSelf: "center",
        opacity: 1,
    },
    categoryButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20,
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#DDDDDD",
    },
    selectedCategoryButton: {
        backgroundColor: "#3EB772",
    },
    categoryButtonText: {
        color: "black",
        fontWeight: "bold",
    },
    selectedButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
