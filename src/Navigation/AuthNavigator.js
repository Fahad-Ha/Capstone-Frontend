import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import ROUTES from ".";
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={ROUTES.AUTHROUTES.LOGIN} />
      <Stack.Screen component={Register} name={ROUTES.AUTHROUTES.REGISTER} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
