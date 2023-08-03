import React, { FC } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

interface IHistoryProps {
  textJudul: any;
  icon: React.ReactNode;
  textTimeStamp: string;
}

const History = (props: IHistoryProps) => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={{ ...styles.component, width: deviceWidth / 1.11 }}>
      {props.icon}
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
          {props.textJudul}
        </Text>
        <Text style={{ color: "grey" }}>{props.textTimeStamp}</Text>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
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
