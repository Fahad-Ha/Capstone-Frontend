import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Auth/Login";
import RegisterUsernameEmailPassword from "../Screens/Auth/RegisterUsernameEmailPassword";
import ROUTES from ".";
import RegisterImageBirthdate from "../Screens/Auth/RegisterImageBirthdate";
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={ROUTES.AUTHROUTES.LOGIN} />
      <Stack.Screen
        component={RegisterUsernameEmailPassword}
        name={ROUTES.AUTHROUTES.REGISTER.USERNAME_EMAIL_PASSWORD}
      />
      <Stack.Screen
        component={RegisterImageBirthdate}
        name={ROUTES.AUTHROUTES.REGISTER.IMAGE_BIRTHDATE}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
