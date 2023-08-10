import React, { FC, useState, useContext } from "react";
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
import { useForm, Controller } from "react-hook-form";
// interface ISignInProps {}
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const SignInScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameEmpty, setUsernameEmpty] = useState(false); // New state for username empty status
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProps>();

    const onSignInPressed = () => {
        if (username.trim() === "") {
            setUsernameEmpty(true);
        } else {
            setUsernameEmpty(false);
        }

        if (password.trim() === "") {
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }

        if (username.trim() !== "" && password.trim() !== "") {
            login(username, password);
        }
    };

    const onForgotPressed = () => {
        navigation.navigate("ResetPassword");
    };
    const onSignUPPressed = () => {
        navigation.navigate("SignUp");
    };

    const { login } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView></KeyboardAvoidingView>
                <Image
                    source={require("../assets/logoNore.png")}
                    style={{
                        width: 210,
                        height: 140,
                        alignSelf: "center",
                        marginVertical: 30,
                    }}
                />
                {/* <Text>SignIn Screens</Text> */}
                <CustomInputs
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    secureTextEntry={false}
                    isEmpty={usernameEmpty}
                />
                <CustomInputs
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    isEmpty={passwordEmpty}
                />

                <SignInUpButton onPress={onSignInPressed} textButton="Masuk" />
                {/* <SignInUpButton
          onPress={onSignUPPressed}
          textButton="Daftar"
          type="SECONDARY"
        /> */}

                <SignInUpButton
                    onPress={onForgotPressed}
                    textButton="Forgot Password?"
                    type="TERTIARY"
                />
            </ScrollView>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        padding: 20,
        width: "100%",
        marginTop: "7%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
});
