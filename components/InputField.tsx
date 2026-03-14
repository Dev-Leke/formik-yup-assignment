import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string | false;
  secureTextEntry?: boolean;
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
}: Props) => {
  const [hidePassword, setHidePassword] = React.useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        <Ionicons name={icon} size={20} color="#666" style={styles.leftIcon} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={hidePassword}
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
    paddingHorizontal: 10,
    height: 50,
  },

  leftIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  errorBorder: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});