import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

// interface ICustomButtonProps {}

const SignInUpButton = ({ onPress, textButton, type = "PRIMARY" }: any) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{textButton}</Text>
    </TouchableOpacity>
  );
};

export default SignInUpButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
  },
  container_PRIMARY: {
    backgroundColor: "#3EB772",
  },
  container_SECONDARY: {
    borderColor: "#B7B7B7",
    borderWidth: 3,
  },
  container_TERTIARY: {},
  container_MSize: {
    width: "47%",
    marginHorizontal: 10,

    borderColor: "#B7B7B7",
    borderWidth: 2,
  },
  text: { color: "white", fontWeight: "bold" },
  text_TERTIARY: { color: "grey" },
  text_SECONDARY: { color: "#B7B7B7", fontWeight: "900" },
  text_MSize: { color: "#B7B7B7" },
});
