import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
// interface IConfirmEmailScreenProps {}

type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const ResetPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const onSendPressed = () => {
    navigation.navigate("NewPassword");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <CustomInputs
        placeholder="Enter your username"
        value={username}
        setValue={setUsername}
        secureTextEntry={false}
      />

      <SignInUpButton onPress={onSendPressed} textButton="Send" />

      <SignInUpButton
        onPress={onSignInPressed}
        textButton="Back to Sign In"
        type="TERTIARY"
      />
    </View>
  );
};

export default ResetPasswordScreen;

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
