import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigation, useTheme } from "@react-navigation/native";
import { checkUsername, checkEmail } from "../../apis/auth";
import ROUTES from "../../Navigation";
import bgLogin from "../../../assets/bbg.png";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

const schema = Yup.object().shape({
  // username: Yup.string()
  //   .min(3, "Username must be at least 3 characters long.")
  //   .matches(
  //     /^[a-zA-Z0-9._]*$/,
  //     "can only contain letters numbers and underscores"
  //   )
  //   .required("Username is required."),
  // email: Yup.string().email("Invalid email.").required("Email is required."),
  // password: Yup.string()
  //   .min(8, "Password must be at least 8 characters long.")
  //   .required("Password is required."),
});
const RegisterUsernameEmailPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const { mutate: userNameChecker } = useMutation({
    mutationFn: checkUsername,
    onSuccess: (data) => {
      if (data.message.includes("available")) {
        setUsernameError(`username @${data.username} is available`);
        setUsername(data.username);
      }
      if (data.message.includes("exist")) {
        setUsernameError(`username @${data.username} already exist`);
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const { mutate: emailChecker } = useMutation({
    mutationFn: checkEmail,
    onSuccess: (data) => {
      if (data.message.includes("available")) {
        console.log(data.email);
        // setUsernameError(`email @${data.username} is available`);
        setEmail(data.email);
        setEmailError("");
      }
      if (data.message.includes("exist")) {
        setEmailError(`email already in use`);
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <ImageBackground source={bgLogin} style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute  top-10 left-1 rounded-full shadow p-2"
            >
              <View className="flex-row items-center ">
                <Feather name="arrow-left" size={32} color={"white"} />
              </View>
            </TouchableOpacity>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={schema}
              onSubmit={(values) => {
                //to be removed, for testing only
                navigation.navigate(
                  ROUTES.AUTHROUTES.REGISTER.IMAGE_BIRTHDATE,
                  {
                    username: username.toLowerCase(),
                    email: email.toLowerCase(),
                    password: values.password,
                  }
                );
                if (
                  usernameError.includes("available") &&
                  !emailError.includes("in use") &&
                  values.password
                ) {
                  navigation.navigate(
                    ROUTES.AUTHROUTES.REGISTER.IMAGE_BIRTHDATE,
                    {
                      username: username.toLowerCase(),
                      email: email.toLowerCase(),
                      password: values.password,
                    }
                  );
                  console.log(values.password);
                }
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
                <View style={{ flex: 1, marginTop: 350 }}>
                  <BlurView
                    intensity={80}
                    tint="dark"
                    style={{
                      backgroundColor: "rgba(0, 0, 0)",
                      borderColor: "rgba(100, 0, 0, 0.3)",
                      // flex: 0.3,
                      borderRadius: 30,
                      marginBottom: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className=" overflow-hidden"
                  >
                    <View className=" mt-6 mb-2 w-4/5">
                      <Text
                        style={{
                          flex: 1,
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          marginBottom: 30,
                        }}
                        // className=" text-xl  text-left font-bold mb-4"
                      >
                        Step 1 out of 3
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          textAlign: "left",
                        }}
                      >
                        Choose a{" "}
                        <Text style={{ fontWeight: "bold", color: "white" }}>
                          username
                        </Text>
                        <Text style={{ color: "#00C2FF" }}> *</Text>
                      </Text>
                    </View>
                    <TextInput
                      placeholderTextColor={
                        (color = "rgba(255, 255, 255, 0.61)")
                      }
                      style={{
                        backgroundColor: "rgba(232, 232, 232, 0.30)",
                        flex: 1,
                        width: 340,
                        borderRadius: 10,
                        textAlign: "left",
                        paddingLeft: 15,
                      }}
                      className="w-4/5 h-12 mb-1 py-2 px-4 border-s border-gray-300 rounded-xl bg-[#1c1c1c] text-white "
                      placeholder="@username"
                      onBlur={handleBlur("username")}
                      onChangeText={handleChange("username")}
                      onChange={(e) => {
                        if (e.nativeEvent.text.length > 2) {
                          console.log(e.nativeEvent.text);
                          userNameChecker(e.nativeEvent.text.toLowerCase());
                          setUsername(values.username.toLowerCase());
                        } else {
                          setUsernameError("");
                        }
                      }}
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <Text style={{ color: "red" }}>{errors.username}</Text>
                    )}
                    {usernameError && (
                      <Text
                        style={{
                          color: usernameError.includes("available")
                            ? "green"
                            : "red",
                        }}
                      >
                        {usernameError}
                      </Text>
                    )}
                    <View className="  mb-2 w-4/5">
                      <Text
                        style={{}}
                        className=" text-xl  text-left font-bold mb-3"
                      ></Text>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        Choose an{" "}
                        <Text style={{ fontWeight: "bold" }}>email</Text>
                        <Text style={{ color: "#00C2FF" }}> *</Text>
                      </Text>
                    </View>

                    <TextInput
                      placeholderTextColor={
                        (color = "rgba(255, 255, 255, 0.61)")
                      }
                      style={{
                        backgroundColor: "rgba(232, 232, 232, 0.30)",
                        flex: 1,
                        width: 340,
                        borderRadius: 10,
                        textAlign: "left",
                        paddingLeft: 15,
                      }}
                      className="w-4/5 h-12  py-2 px-4 border-s border-gray-300 rounded-xl bg-[#1c1c1c] text-white "
                      placeholder="email@email.com"
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      onChange={(e) => {
                        if (!errors.email) {
                          console.log(e.nativeEvent.text);
                          emailChecker(e.nativeEvent.text.toLowerCase());
                          setEmail(values.email.toLowerCase());
                        } else {
                          setEmailError("");
                        }
                      }}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}
                    {emailError && (
                      <Text
                        style={{
                          color: emailError.includes("available")
                            ? "green"
                            : "red",
                        }}
                      >
                        {emailError}
                      </Text>
                    )}

                    <View className="   w-4/5">
                      <Text className=" text-xl  text-left font-bold mb-4"></Text>

                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        Pick a{" "}
                        <Text style={{ fontWeight: "bold" }}>password</Text>
                        <Text style={{ color: "#00C2FF" }}> *</Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 65,
                        color: "rgba(255, 255, 255, 0.51)",
                      }}
                      className="w-4/5 h-12 mb-1 py-2 px-4 border-s border-gray-300 rounded-xl  relative text-white"
                    >
                      <TextInput
                        placeholderTextColor={
                          (color = "rgba(255, 255, 255, 0.61)")
                        }
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onChange={(e) => {
                          console.log(e.nativeEvent.text);
                        }}
                        style={{
                          backgroundColor: "rgba(232, 232, 232, 0.30)",
                          flex: 1,
                          width: 340,
                          color: "rgba(255, 255, 255, 0.51)",
                          borderRadius: 10,
                          textAlign: "left",
                          paddingLeft: 15,
                        }}
                      />
                      <Pressable
                        className="absolute p-2  mt-1 right-2"
                        onPress={() => {
                          toggleShowPassword();
                        }}
                      >
                        <FontAwesome
                          name={showPassword ? "eye" : "eye-slash"}
                          size={24}
                          style={{ opacity: 0.6 }}
                          color={"white"}
                        />
                      </Pressable>
                    </View>

                    {errors.password && touched.password && (
                      <Text style={{ color: "red" }}>{errors.password}</Text>
                    )}
                    <Pressable onPress={handleSubmit}>
                      <View
                        style={{
                          backgroundColor: "#FF005C",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: 10,
                          width: 200,
                          height: 50,
                          borderRadius: 10,

                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          NEXT
                        </Text>
                      </View>
                    </Pressable>
                  </BlurView>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default RegisterUsernameEmailPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
