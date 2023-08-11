import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { checkUsername } from "../../apis/auth";
import ROUTES from "../../Navigation";

const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .matches(
      /^[a-zA-Z0-9._]*$/,
      "can only contain letters numbers and underscores"
    )
    .required("Username is required."),
});
const RegisterUsernameEmail = ({ navigation }) => {
  const [username, setUsername] = useState();

  const { mutate: userNamechecker } = useMutation({
    mutationFn: checkUsername,
    onSuccess: (data) => {
      if (data.message.includes("available")) {
        try {
          navigation.navigate(ROUTES.AUTHROUTES.REGISTER.PASSWORD, {
            username: username.toLowerCase(),
          });
        } catch (error) {
          console.log(error);
        }

        console.log("here the username is available");
      } else {
        console.log("here the username is unavailable");
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
  const handleUsername = (e) => {
    userNamechecker(e.target.value);
  };
  return (
    <View>
      <Text>RegisterAndEmail</Text>
      <TextInput placeholder="Username" onChange={handleUsername}></TextInput>
    </View>
  );
};

export default RegisterUsernameEmail;

const styles = StyleSheet.create({});
