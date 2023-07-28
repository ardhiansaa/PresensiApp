import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navigations from "./Navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useContext } from "react";
import AuthProvider from "./Context/AuthContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          {/* <SignIn /> */}
          {/* <SignUpScreen /> */}
          {/* <BarcodeScanner /> */}
          {/* <Home /> */}
          {/* <ConfirmEmailScreen /> */}
          {/* <ResetPasswordScreen /> */}
          {/* <NewPasswordScreen /> */}
          <Navigations />
          <StatusBar style="auto" />
        </SafeAreaView>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
