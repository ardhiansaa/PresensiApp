import React, { FC, useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import CustomInputs from "../Components/CustomInput";
import CustomButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
// interface ISignInProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const onRegisterPressed = () => {
    navigation.navigate("ConfirmEmail");
  };
  const onTermPressed = () => {
    console.warn("Term of Use");
  };
  const privacyPressed = () => {
    console.warn("Privacy Policy");
  };

  const val = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInputs
        placeholder="Username"
        value={username}
        setValue={setUsername}
        secureTextEntry={false}
      />
      <CustomInputs
        placeholder="Email"
        value={email}
        setValue={setEmail}
        secureTextEntry={false}
      />
      <CustomInputs
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInputs
        placeholder="Repeat Password"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry={true}
      />
      {/* <Text>{val}</Text> */}

      <CustomButton onPress={onRegisterPressed} textButton="Register" />
      <Text style={styles.text}>
        By registering, you confirm that you accept our
        <Text style={styles.link} onPress={onTermPressed}>
          {" "}
          Terms of Use
        </Text>{" "}
        and
        <Text style={styles.link} onPress={privacyPressed}>
          {" "}
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;

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
