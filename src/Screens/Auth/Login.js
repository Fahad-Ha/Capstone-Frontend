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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      behavior={Platform.OS == "ios" ? "padding" : ""}
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
            paddingTop: wp(32),
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
              paddingBottom: hp(30),
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
                  style={{
                    flex: 1,
                    width: wp(100),
                    margin: "auto",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginTop: hp(3),
                      fontWeight: "bold",
                      fontSize: hp(3),
                    }}
                  >
                    LOGIN
                  </Text>

                  <TextInput
                    placeholderTextColor={(color = "rgba(255, 255, 255, 0.61)")}
                    style={{
                      backgroundColor: "rgba(232, 232, 232, 0.40)",
                      textAlign: "left",
                      height: hp(6),
                      borderRadius: 15,
                      marginTop: hp(5),
                      marginHorizontal: wp(10),
                      paddingHorizontal: wp(3),
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
                        paddingLeft: wp(11),
                        marginTop: hp(0.5),
                      }}
                    >
                      {errors.email || errorMes}
                    </Text>
                  )}

                  <View className="relative">
                    <TextInput
                      placeholderTextColor={
                        (color = "rgba(255, 255, 255, 0.61)")
                      }
                      style={{
                        backgroundColor: "rgba(232, 232, 232, 0.40)",
                        textAlign: "left",
                        height: hp(6),
                        borderRadius: 15,
                        marginTop: hp(3),
                        marginHorizontal: wp(10),
                        paddingHorizontal: wp(3),
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
                      style={{ top: hp(4), padding: hp(2) }}
                      className="absolute  right-11"
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
                        paddingLeft: wp(11),
                        marginTop: hp(0.5),
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}

                  <Pressable
                    onPress={handleSubmit}
                    style={{ paddingTop: hp(2) }}
                  >
                    <View
                      style={{
                        backgroundColor: "#FF005C",
                        alignSelf: "center",
                        // marginTop: hp(2.5)
                        width: wp(80),
                        borderRadius: 15,
                        marginTop: hp(4),
                        paddingVertical: hp(2),
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
          <View style={{ marginTop: hp(3), flexDirection: "row" }}>
            <Text style={{ color: "white" }}>You aren't registered? </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text
                style={{
                  color: "#00C2FF",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Register Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </BlurView> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
