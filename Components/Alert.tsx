import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

// interface IAlertProps {

// }

const Alerts = () => {
  return (
    <View style={styles.container}>
      <Icon name="ios-warning-outline" size={43} color={"#CC9A27"} />
      <View>
        <Text style={styles.textHead}>WARNING!</Text>
        <Text style={styles.text}>Mohon untuk segera presensi</Text>
      </View>
      <Icon name="ios-close-sharp" size={25} color={"#D6D075"} />
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    width: "91%",
    flexDirection: "row",
    backgroundColor: "#F5EDB5",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHead: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#CC9A27",
  },
  text: {
    color: "#CC9A27",
    fontSize: 12,
  },
});
