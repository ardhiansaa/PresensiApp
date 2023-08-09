import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Icons from "@expo/vector-icons/Ionicons";
interface ITextInputProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
}

const CustomInputs = (props: ITextInputProps & { isEmpty: boolean }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTextChange = (text: string) => {
    props.setValue(text);
    setIsEmpty(text.trim() === "");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: props.isEmpty
              ? "red"
              : isFocused
              ? "#3EB772"
              : "#AEC2B6",
          },
          isEmpty && styles.errorBorder,
          isFocused && styles.focusBorder,
        ]}
      >
        <TextInput
          value={props.value}
          onChangeText={handleTextChange}
          placeholder={props.placeholder}
          style={styles.TextField}
          secureTextEntry={!showPassword ? props.secureTextEntry : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleShowPassword}
          >
            <Icons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#AEC2B6"
            />
          </TouchableOpacity>
        )}
      </View>
      {isEmpty && <Text style={styles.errorText}>isi form yang kosong!</Text>}
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    // borderWidth: 1,
    // borderRadius: 10,

    marginVertical: 5,

    textDecorationLine: "none",
  },
  TextField: {
    padding: 10,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#AEC2B6",
    flex: 1,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    paddingLeft: 5,
  },
  focusBorder: {
    borderColor: "#3EB772",
    borderWidth: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
});
