import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
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

import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import bgLogin from "../../../assets/bbg.png";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";
import * as Yup from "yup";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [errorMes, setErrorMes] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // Get the expoToken from the useNotifications hook
  const expoToken = useNotifications();
  //formik
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string().required("Password is required."),
  });
  const { mutate: loginFunc } = useMutation({
    mutationFn: () => login({ ...userInfo, expoPushToken: expoToken }),
    onSuccess: (data) => {
      const user = jwt_decode(data.token);
      saveToken(data.token);
      setUser(user);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      //   navigation.navigate("Users");
    },
    onError: (e) => {
      setErrorMes(e.response.data.error.message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
  });
  const handleSubmit = () => {
    loginFunc();
  };

  const handleSignup = () => {
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER.USERNAME_EMAIL_PASSWORD);
  };
  const theme = useTheme(); // Get the currently active theme

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
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

              paddingBottom: 210,
            }}
            className=" overflow-hidden"
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={schema}
              onSubmit={(values) => {
                loginFunc(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View
                  style={{ flex: 1, width: 400, hight: 500, margin: "auto" }}
                >
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
                      marginLeft: 50,
                      marginRight: 50,
                      paddingHorizontal: 10,
                      color: "white",
                    }}
                    onBlur={handleBlur("email")}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onChange={(v) => {
                      setUserInfo({
                        ...userInfo,
                        email: v.nativeEvent.text.toLowerCase(),
                      });
                      Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Warning
                      );
                    }}
                    value={values.email}
                  />
                  {(errors.email || errorMes) && touched.email && (
                    <Text
                      style={{
                        color: "red",
                        paddingLeft: 35,
                        marginTop: 5,
                      }}
                    >
                      {errors.email || errorMes}
                    </Text>
                  )}

                  <View className="relative">
                    <TextInput
                      placeholderTextColor={"white"}
                      style={{
                        backgroundColor: "rgba(232, 232, 232, 0.40)",
                        textAlign: "left",
                        height: 45,
                        borderRadius: 10,
                        marginLeft: 50,
                        marginRight: 50,
                        paddingHorizontal: 10,
                        marginTop: 15,
                        color: "white",
                      }}
                      secureTextEntry={!showPassword}
                      placeholder="Password"
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      onChange={(v) => {
                        setUserInfo({
                          ...userInfo,
                          password: v.nativeEvent.text,
                        });
                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Warning
                        );
                      }}
                      value={values.password}
                    />
                    <Pressable
                      className="absolute p-5 top-4 right-11"
                      onPress={() => {
                        toggleShowPassword();
                      }}
                    >
                      <FontAwesome
                        name={showPassword ? "eye" : "eye-slash"}
                        size={24}
                        color={theme.colors.text}
                        style={{ marginTop: -12, opacity: 0.6 }}
                      />
                    </Pressable>
                  </View>
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        color: "red",
                        paddingLeft: 35,
                        marginTop: 5,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
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
              )}
            </Formik>

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

  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
