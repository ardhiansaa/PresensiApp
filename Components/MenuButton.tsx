import React, { FC } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

interface MenuButtonProps {
  onPress: () => void;
  type: string;
  textButton: string;
  icon: React.ReactNode;
}

const MenuButton = (props: MenuButtonProps) => {
  const buttonHeight = Dimensions.get("window").height;
  const buttonWidth = Dimensions.get("window").width;
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
      {props.icon}
      <Text
        style={[
          styles.text,
          props.type === "PRIMARY"
            ? styles.container_PRIMARY
            : styles.container_SECONDARY,
        ]}
      >
        {props.textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  container_PRIMARY: {
    backgroundColor: "#2D4356",
    height: "50%",
    width: 145,
  },
  container_SECONDARY: {
    backgroundColor: "#2D4356",
    height: "55%",
    width: "122%",
  },
});
