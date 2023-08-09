import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import DirectMsg from "../Screens/DirectMsg";
import Users from "../Screens/Users";
import Chat1 from "../Screens/Chat1";
import EventDetails from "../Screens/EventDetails";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigation}
        name="Main"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DirectMsg}
        name={ROUTES.APPROUTES.DIRECT_MSGLIST}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={Chat1}
        name={ROUTES.APPROUTES.DIRECT_MSG}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EventDetails}
        name={ROUTES.APPROUTES.EVENT_DETAILS}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
