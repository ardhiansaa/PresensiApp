import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigations from "./Navigation";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigations />
    </NavigationContainer>
  );
};

export default RootNavigator;

const style = StyleSheet.create({});
