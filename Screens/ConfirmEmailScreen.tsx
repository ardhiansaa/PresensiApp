import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
// interface IConfirmEmailScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const ConfirmEmailScreen = () => {
  const [code, setCode] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const onConfirmPressed = () => {
    navigation.navigate("Main");
  };
  const onResendPressed = () => {
    console.warn("Resend");
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInputs
        placeholder="Enter your confirmation code"
        value={code}
        setValue={setCode}
        secureTextEntry={false}
      />

      <SignInUpButton onPress={onConfirmPressed} textButton="Confirm" />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <SignInUpButton
          onPress={onResendPressed}
          textButton="Resend Code"
          type="MSize"
        />
        <SignInUpButton
          onPress={onSignInPressed}
          textButton="Back to Sign In"
          type="MSize"
        />
      </View>
    </View>
  );
};

export default ConfirmEmailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
    marginTop: "7%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "grey",
    padding: 20,
  },
  text: { color: "grey", marginVertical: 10 },
  link: { color: "blue" },
});
