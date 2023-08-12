import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { checkUsername, checkEmail } from "../../apis/auth";
import ROUTES from "../../Navigation";

const UsernameSchema = Yup.object().shape({
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
  //   .matches(/\d/, "Password must contain a number.")
  //   .matches(/[A-Z]/, "Password must contain an uppercase letter.")
  //   .matches(/[a-z]/, "Password must contain a lowercase letter.")
  //   .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol.")
  //   .required("Password is required."),
});
const RegisterUsernameEmailPassword = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
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
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        //to be removed, for testing only
        navigation.navigate(ROUTES.AUTHROUTES.REGISTER.IMAGE_BIRTHDATE, {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: values.password,
        });
        if (
          usernameError.includes("available") &&
          !emailError.includes("in use")
        ) {
          navigation.navigate(ROUTES.AUTHROUTES.REGISTER.IMAGE_BIRTHDATE, {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
          });
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
        <View className="flex-1 items-center bg-slate-200">
          <View className=" mt-6 mb-4 w-4/5">
            <Text
              style={{ color: theme.colors.text }}
              className=" text-xl  text-left font-bold mb-4"
            >
              Step 1 out of 3
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Choose a <Text style={{ fontWeight: "bold" }}>username</Text>
              <Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              borderWidth: 1,
            }}
            className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded-xl bg-[#1c1c1c] text-white "
            placeholder="@username"
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
            onChange={(e) => {
              if (e.nativeEvent.text.length > 2) {
                userNameChecker(e.nativeEvent.text.toLowerCase());
                setUsername(values.username.toLowerCase());
              } else {
                setUsernameError("");
              }
            }}
            value={values.username}
            placeholderTextColor={theme.colors.inputPlaceholder}
          />
          {errors.username && touched.username && (
            <Text style={{ color: "red" }}>{errors.username}</Text>
          )}
          {usernameError && (
            <Text
              style={{
                color: usernameError.includes("available") ? "green" : "red",
              }}
            >
              {usernameError}
            </Text>
          )}
          <View className="  mb-4 w-4/5">
            <Text
              style={{ color: theme.colors.text }}
              className=" text-xl  text-left font-bold mb-4"
            ></Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Choose an <Text style={{ fontWeight: "bold" }}>email</Text>
              <Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              borderWidth: 1,
            }}
            className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded-xl bg-[#1c1c1c] text-white "
            placeholder="email@email.com"
            onBlur={handleBlur("email")}
            onChangeText={handleChange("email")}
            onChange={(e) => {
              if (!errors.email) {
                emailChecker(e.nativeEvent.text.toLowerCase());
                setEmail(values.email.toLowerCase());
              } else {
                setEmailError("");
              }
            }}
            value={values.email}
            placeholderTextColor={theme.colors.inputPlaceholder}
          />
          {errors.email && touched.email && (
            <Text style={{ color: "red" }}>{errors.email}</Text>
          )}
          {emailError && (
            <Text
              style={{
                color: emailError.includes("available") ? "green" : "red",
              }}
            >
              {emailError}
            </Text>
          )}
          <View className="  mb-4 w-4/5">
            <Text
              style={{ color: theme.colors.text }}
              className=" text-xl  text-left font-bold mb-4"
            ></Text>

            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Pick a <Text style={{ fontWeight: "bold" }}>password</Text>
              <Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              borderBlockColor: theme.colors.text,
              borderWidth: 1,
            }}
            className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded-xl  relative"
            placeholder="Password"
            secureTextEntry={!showPassword}
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            placeholderTextColor={theme.colors.inputPlaceholder}
          />

          <Pressable
            className="absolute p-2 top-56 mt-2 right-12"
            onPress={() => {
              toggleShowPassword();
            }}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color={theme.colors.text}
              style={{ marginTop: 130, opacity: 0.6 }}
            />
          </Pressable>

          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <View className="mt-2">
            <Button title="Next" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};
export default RegisterUsernameEmailPassword;

const styles = StyleSheet.create({});
