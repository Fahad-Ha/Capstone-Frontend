import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../apis/auth";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { saveToken } from "../apis/auth/storage";
import jwt_decode from "jwt-decode";
import ROUTES from "../Navigation";

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
      navigation.navigate(ROUTES.APPROUTES.LOCATION_NAVIGATION);
    },
  });
  const handleSubmit = () => {
    loginFunc();
  };

  const handleSignup = () => {
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER);
  };

  return (
    <View className="flex-1 justify-center item-center mx-6">
      <TextInput
        className="bg-gray-200 rounded-lg p-2 mb-2"
        placeholder="Email"
        onChangeText={(v) => setUserInfo({ ...userInfo, email: v })}
      />
      <TextInput
        className="bg-gray-200 rounded-lg p-2 mb-2"
        placeholder="Password"
        onChangeText={(v) => setUserInfo({ ...userInfo, password: v })}
      />
      <Button title="Login" onPress={handleSubmit} />
      <View>
        <TouchableOpacity onPress={handleSignup}>
          <Text>You arent registered? Please Signup here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
