import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
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
import bgLogin from "../../../assets/bbg.png";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

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
    <ImageBackground source={bgLogin} style={{ flex: 1 }}>
      {/* <BlurView
        intensity={90}
        tint="dark"
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderColor: "rgba(100, 0, 0, 0.3)",
          flex: 1,
        }}
        className=" overflow-hidden"
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Choose behavior based on platform
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 90,
          }}
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={{
              backgroundColor: "rgba(0, 0, 0)",
              borderColor: "rgba(100, 0, 0, 0.3)",
              flex: 0.3,
              borderRadius: 30,
              marginTop: 50,
              paddingBottom: 120,
            }}
            className=" overflow-hidden"
          >
            <View style={{ flex: 1, width: 400, hight: 500, margin: "auto" }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: 20,
                  marginBottom: 0,
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                LOGIN
              </Text>
              <TextInput
                placeholderTextColor={"white"}
                style={{
                  backgroundColor: "rgba(232, 232, 232, 0.40)",
                  textAlign: "left",
                  height: 45,
                  borderRadius: 10,
                  marginTop: 30,
                  marginLeft: 20,
                  marginRight: 20,
                  paddingHorizontal: 10,
                  color: "white",
                }}
                placeholder="Email"
                onChangeText={(v) => setUserInfo({ ...userInfo, email: v })}
              />
              <TextInput
                placeholderTextColor={"white"}
                style={{
                  backgroundColor: "rgba(232, 232, 232, 0.40)",
                  textAlign: "left",
                  height: 45,
                  borderRadius: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  paddingHorizontal: 10,
                  marginTop: 15,
                  color: "white",
                }}
                placeholder="Password"
                onChangeText={(v) => setUserInfo({ ...userInfo, password: v })}
              />
              <Pressable onPress={handleSubmit}>
                <View
                  style={{
                    backgroundColor: "#FF005C",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 30,
                    width: 200,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    LOGIN
                  </Text>
                </View>
              </Pressable>
            </View>
          </BlurView>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <Text style={{ color: "white" }}>You arent registered?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text
                style={{
                  color: "#00C2FF",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Please Signup here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* </BlurView> */}
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({});
