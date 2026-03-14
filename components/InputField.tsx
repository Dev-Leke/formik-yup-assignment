import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import type { ComponentProps } from "react";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type InputFieldProps = {
  label: string;
  icon: IoniconName;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: TextInputProps["onBlur"];
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
  editable?: boolean;
};

const InputField = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  editable = true,
}: InputFieldProps) => {
  const [hidePassword, setHidePassword] = React.useState(secureTextEntry);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusBorder,
          error && styles.errorBorder,
          !editable && styles.disabledContainer,
        ]}
      >
        <Ionicons name={icon} size={20} color="#666" style={styles.leftIcon} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: "#fff",
  },

  leftIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  focusBorder: {
    borderColor: "#1f7a8c",
  },

  errorBorder: {
    borderColor: "#d7263d",
  },

  disabledContainer: {
    opacity: 0.65,
  },

  errorText: {
    color: "#d7263d",
    marginTop: 5,
    fontSize: 12,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});