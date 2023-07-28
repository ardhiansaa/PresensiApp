import React, { FC, useState, useContext } from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
// interface ISignInProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const onSignInPressed = () => {
    login(username, password);
  };
  const onForgotPressed = () => {
    navigation.navigate("ResetPassword");
  };
  const onSignUPPressed = () => {
    navigation.navigate("SignUp");
  };

  const val = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logoNore.png")}
        style={{ width: 200, height: 120 }}
      />
      {/* <Text>SignIn Screens</Text> */}
      <CustomInputs
        placeholder="Username"
        value={username}
        setValue={setUsername}
        secureTextEntry={false}
      />
      <CustomInputs
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      {/* <Text>{val}</Text> */}

      <SignInUpButton onPress={onSignInPressed} textButton="Sign In" />
      <SignInUpButton
        onPress={onSignUPPressed}
        textButton="Sign Up"
        type="SECONDARY"
      />

      <SignInUpButton
        onPress={onForgotPressed}
        textButton="Forgot Password?"
        type="TERTIARY"
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
    marginTop: "7%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
});
