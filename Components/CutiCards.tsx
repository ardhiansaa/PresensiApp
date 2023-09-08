import React, { FC } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

interface CutiCardsProps {
    textJudul: any;
    icon: React.ReactNode;
    created_at: number;
    tanggalmulai: string;
    tanggalselesai: string;
    verifikator: string;
}

const CutiCards = (props: CutiCardsProps) => {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    return (
        <View
            style={{
                ...styles.component,
                width: deviceWidth / 1.11,
                height: deviceHeight / 8,
            }}
        >
            {props.icon}
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
                    {props.textJudul}
                </Text>
                <Text style={{ color: "grey" }}>Verifikator : {props.verifikator}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "grey" }}>{props.tanggalmulai}</Text>
                    <Text style={{ color: "grey" }}> sampai </Text>
                    <Text style={{ color: "grey" }}>{props.tanggalselesai}</Text>
                </View>
                {/* <Text style={{ color: "grey" }}>Dibuat pada : {props.created_at}</Text> */}
            </View>
        </View>
    );
};

export default CutiCards;

const styles = StyleSheet.create({
    component: {
        flexDirection: "row",
        borderWidth: 1,
        backgroundColor: "#fbfbfa",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 10,
        // height: 100,
        // paddingHorizontal: 20,
        padding: 25,
        borderColor: "#DDDDDD",
    },
});
