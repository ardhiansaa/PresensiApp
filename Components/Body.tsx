import React, { FC } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

interface IBodyProps {
  textJudul: string;
  icon: React.ReactNode;
  textJumlahHari: any;
}

const Body = (props: IBodyProps) => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        width: deviceWidth / 2.5,
        height: deviceHeight / 8,
        ...styles.presensiBox,
      }}
    >
      {props.icon}
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 0,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#152029" }}>
          {props.textJudul}
        </Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          {props.textJumlahHari}
        </Text>
      </View>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
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
});
