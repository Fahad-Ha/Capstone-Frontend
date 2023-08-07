import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../Screens/Chat";
import Users from "../Screens/Users";

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Users} name="Users" />
      <Stack.Screen component={Chat} name="Chat" />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
