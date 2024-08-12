import { View, Text, Pressable } from "react-native";
import { baseStyles, palette } from "../styles/styles";
import { useState } from "react";
import { TextInput } from "react-native";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(element, value) {
    setFormData((prev) => {
      return {
        ...prev,
        [element]: value,
      };
    });
  }

  function handleSubmit() {
    console.log(formData);
    setFormData({
      email: "",
      password: "",
    });
  }
  return (
    <View style={[baseStyles.container]}>
      <Text style={[baseStyles.heading]}>Login</Text>
      <View style={[{ width: "100%", gap: 12 }]}>
        <View style={[baseStyles.formGroup]}>
          <Text style={[baseStyles.label]}>Email</Text>
          <TextInput
            selectionColor={palette.white}
            style={[baseStyles.input]}
            onChangeText={(value) => handleChange("email", value)}
            value={formData.email}
          />
        </View>
        <View style={[baseStyles.formGroup]}>
          <Text style={[baseStyles.label]}>Password</Text>
          <TextInput
            selectionColor={palette.white}
            style={[baseStyles.input]}
            onChangeText={(value) => handleChange("password", value)}
            value={formData.password}
            secureTextEntry={true}
          />
        </View>
        <Pressable
          style={({ pressed }) => {
            return {
              ...baseStyles.button,
              marginTop: 10,
              borderColor: pressed ? palette.white : palette.mediumBlue,
            };
          }}
          onPress={() => handleSubmit()}
        >
          <Text style={[baseStyles.text]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginPage;
