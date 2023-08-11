import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Auth/Login";
import RegisterUsernameEmail from "../Screens/Auth/RegisterUsernameEmail";
import ROUTES from ".";
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={ROUTES.AUTHROUTES.LOGIN} />
      <Stack.Screen
        component={RegisterUsernameEmail}
        name={ROUTES.AUTHROUTES.REGISTER.USERNAME_EMAIL}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
