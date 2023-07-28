import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";

// interface IConfirmEmailScreenProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const NewPasswordScreen = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const onSubmitPressed = () => {
    navigation.navigate("Main");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>

      <CustomInputs
        placeholder="Enter your confirmation code"
        value={code}
        setValue={setCode}
        secureTextEntry={false}
      />
      <CustomInputs
        placeholder="Enter your new password"
        value={password}
        setValue={setPassword}
        secureTextEntry={false}
      />

      <SignInUpButton onPress={onSubmitPressed} textButton="Submit" />

      <SignInUpButton
        onPress={onSignInPressed}
        textButton="Back to Sign In"
        type="TERTIARY"
      />
    </View>
  );
};

export default NewPasswordScreen;

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
