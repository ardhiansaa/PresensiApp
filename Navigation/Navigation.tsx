import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import ConfirmEmailScreen from "../Screens/ConfirmEmailScreen";
import ResetPasswordScreen from "../Screens/ResetPasswordScreen";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import Home from "../Screens/Home";
import BarcodeScanner from "../Screens/BarcodeScanner";
import RiwayatScreen from "../Screens/RiwayatScreen";
import PresensiScreen from "../Screens/PresensiScreen";
import { AuthContext } from "../Context/AuthContext";

// interface IindexProps {

// }
const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
    return (
        <tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingVertical: 7,
                    paddingBottom: 7,
                },
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    padding: 0,
                    margin: 0,
                    textAlign: "center",
                    color: "grey",
                },
            }}
        >
            {/*screen here */}
            <tab.Screen
                name="Menu"
                component={Home}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons
                            name={focused ? "ios-home-sharp" : "ios-home-outline"}
                            size={size}
                            color={focused ? "#229c59" : "grey"}
                        />
                    ),
                }}
            />
            <tab.Screen
                name="QR"
                component={BarcodeScanner}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons
                            name={focused ? "qr-code" : "qr-code-outline"}
                            size={size}
                            color={focused ? "#229c59" : "grey"}
                        />
                    ),
                }}
            />
            <tab.Screen
                name="Riwayat"
                component={RiwayatScreen}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons
                            name={
                                focused
                                    ? "ios-document-text"
                                    : "ios-document-text-outline"
                            }
                            size={size}
                            color={focused ? "#229c59" : "grey"}
                        />
                    ),
                }}
            />
        </tab.Navigator>
    );
};

const Navigations = () => {
    const { Auth } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {Auth ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Main" component={BottomTabNavigator} />
                    <Stack.Screen name="QR" component={BarcodeScanner} />
                    <Stack.Screen name="Riwayat" component={RiwayatScreen} />
                    <Stack.Screen name="Presensi" component={PresensiScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

// export const NavigationAuth = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//         <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default Navigations;

const styles = StyleSheet.create({});
