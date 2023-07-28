import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface ICustomButtonProps {
  onPress: () => void;
  textButton: string;
  type: string;
}

const ButtonBottomSheet = (props: ICustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.type === "PRIMARY"
          ? styles.container_PRIMARY
          : styles.container_SECONDARY,
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.text,
          props.type === "PRIMARY" ? styles.text : styles.text_SECONDARY,
        ]}
      >
        {props.textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBottomSheet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
    marginRight: 10,
  },
  container_PRIMARY: {
    backgroundColor: "#229c59",
  },
  container_SECONDARY: {
    borderColor: "#229c59",
    borderWidth: 3,
  },
  container_TERTIARY: {},
  container_MSize: {
    marginHorizontal: 10,

    borderColor: "#B7B7B7",
    borderWidth: 2,
  },
  text: { color: "white", fontWeight: "bold" },
  text_TERTIARY: { color: "grey" },
  text_SECONDARY: { color: "#229c59", fontWeight: "900" },
  text_MSize: { color: "#B7B7B7" },
});
