import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import DirectMsg from "../Screens/DirectMsg";
import Users from "../Screens/Users";
import Chat1 from "../Screens/Chat1";
import EventDetails from "../Screens/EventDetails";
import TabNavigation from "./TabNavigation";
import { Feather } from "@expo/vector-icons";
import Settings from "../Screens/EditProfileScreen";
import { BlurView } from "expo-blur";
import useNotifications from "../hooks/useNotifications";
import EditProfileScreen from "../Screens/EditProfileScreen";

const Stack = createStackNavigator();
const AppNavigation = () => {
  useNotifications();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigation}
        name={ROUTES.APPROUTES.MAIN}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Chat1}
        name={ROUTES.APPROUTES.DIRECT_MSG}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={Users}
        name={ROUTES.APPROUTES.USERS_EVENT_LIST}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={DirectMsg}
        name={ROUTES.APPROUTES.DIRECT_MSGLIST}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={EventDetails}
        name={ROUTES.APPROUTES.EVENT_DETAILS}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditProfileScreen}
        name={ROUTES.APPROUTES.EDITPROFILE}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
