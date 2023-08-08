import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../apis/auth";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { saveToken } from "../apis/auth/storage";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const { mutate: loginFunc } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      const user = jwt_decode(data.token);
      saveToken(data.token);
      setUser(user);
      //   navigation.navigate("Users");
    },
  });
  const handleSubmit = () => {
    loginFunc();
  };
  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(v) => setUserInfo({ ...userInfo, email: v })}
      />
      <TextInput
        placeholder="password"
        onChangeText={(v) => setUserInfo({ ...userInfo, password: v })}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
