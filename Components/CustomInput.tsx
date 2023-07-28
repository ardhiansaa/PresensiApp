import React, { FC } from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface ITextInputProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
}

const CustomInputs = (props: ITextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value}
        onChangeText={props.setValue}
        placeholder={props.placeholder}
        style={styles.TextField}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#AEC2B6",

    padding: 15,
    marginVertical: 5,

    textDecorationLine: "none",
  },
  TextField: {},
});
