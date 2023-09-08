import React, { FC, useState, useContext } from "react";
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Text,
} from "react-native";
import CustomInputs from "../Components/CustomInput";
import SignInUpButton from "../Components/SignInUpButton";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import { AuthContext } from "../Context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking } from "react-native";

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

    const onSignUPPressed = () => {
        navigation.navigate("SignUp");
    };

    const onForgotPressed = () => {
        // Replace `PHONE_NUMBER` with the actual WhatsApp phone number you want to message
        const phoneNumber = "6282138095442";

        // Replace `MESSAGE_TEXT` with the message you want to send
        const messageText = "Hello, Saya Lupa Password Akun Nore dan butuh bantuan.";

        // Construct the WhatsApp API link
        const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${messageText}`;

        // Use the Linking module to open the WhatsApp link
        Linking.canOpenURL(whatsappLink)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(whatsappLink);
                } else {
                    console.error("WhatsApp is not installed on the device.");
                    // You can show an error message to the user here if WhatsApp is not installed.
                }
            })
            .catch((error) => {
                console.error("An error occurred while opening WhatsApp:", error);
                // Handle any errors that occur while opening WhatsApp.
            });
    };

    const { login, isLoading } = useContext(AuthContext);
    const getContent = () => {
        return (
            <ActivityIndicator
                size="large"
                style={{ justifyContent: "center", alignItems: "center" }}
            />
        );
    };
    if (isLoading) {
        return (
            <View
                style={{
                    height: "100%",
                    justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                {getContent()}
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView></KeyboardAvoidingView>
                <Image
                    source={require("../assets/logoNore.png")}
                    style={{
                        width: 210,
                        height: 140,
                        alignSelf: "center",
                        marginTop: 30,
                        marginBottom: 40,
                    }}
                />

                {/* <Text
                    style={{
                        color: "#AEC2B6",
                        alignSelf: "center",
                        fontSize: 16,
                        paddingBottom: 15,
                        fontWeight: "600",
                    }}
                >
                    Silahkan Masuk
                </Text> */}

                <Text style={{ color: "grey" }}>Username</Text>
                <CustomInputs
                    placeholder="Ketik Username anda disini..."
                    value={username}
                    setValue={setUsername}
                    secureTextEntry={false}
                    isEmpty={usernameEmpty}
                />
                <Text style={{ color: "grey" }}>Password</Text>
                <CustomInputs
                    placeholder="Ketik Password anda disini..."
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
        </SafeAreaView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        paddingHorizontal: 20,
        width: "100%",
        // marginTop: "7%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
});
