import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Users from "../Screens/Users";
import Chat1 from "../Screens/Chat1";

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Users}
        name="Users"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Chat1}
        name="Chat"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
