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
import { login } from "../../apis/auth";
import UserContext from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { saveToken } from "../../apis/auth/storage";
import jwt_decode from "jwt-decode";
import ROUTES from "../../Navigation";
import useNotifications from "../../hooks/useNotifications";
import * as Haptics from "expo-haptics";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  // Get the expoToken from the useNotifications hook
  const expoToken = useNotifications();

  const { mutate: loginFunc } = useMutation({
    mutationFn: () => login({ ...userInfo, expoPushToken: expoToken }),
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

  const handleSignup = () => {
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER.USERNAME_EMAIL_PASSWORD);
  };

  return (
    <View className="flex-1 justify-center item-center mx-6">
      <TextInput
        className="bg-gray-200 rounded-lg p-2 mb-2"
        placeholder="Email"
        onChangeText={(v) => {
          setUserInfo({ ...userInfo, email: v });
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }}
      />
      <TextInput
        className="bg-gray-200 rounded-lg p-2 mb-2"
        placeholder="Password"
        onChangeText={(v) => {
          setUserInfo({ ...userInfo, password: v });
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }}
      />
      <Button title="Login" onPress={handleSubmit} />
      <View>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={{ textAlign: "center" }}>
            You don’t have an account? click here to Sign-up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
