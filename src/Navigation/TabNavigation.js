import React, { useContext } from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import ROUTES from ".";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import LocationNavigation from "./LocationNavigator";

import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Users from "../Screens/Users";
import Chat1 from "../Screens/Chat1";
import Explore from "../Screens/Events";
import CreateEvent from "../Screens/CreateEvent";
import MyEvents from "../Screens/MyEvents";
import Profile from "../Screens/Profile";

import DMButton from "../Components/DMButton";
import { BlurView } from "expo-blur";

// import UserProfile from "../screens/Auth/Profile/UserProfile";
// import ExploreStack from "./ExploreStack";
// import ProfileStack from "./ProfileStack";
// import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  //   const theme = useTheme(); // Get the currently active theme
  const TabBar = (props) => (
    <View>
      <BlurView
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0,0.7)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: 1.5,
          bottom: 5,
          left: 0,
          right: 0,
          height: 80,
          borderRadius: 16,
          marginHorizontal: 4,
          overflow: "hidden", // Hide the overflow from the border
        }}
        tint="dark"
        intensity={60}
      >
        <BottomTabBar {...props} />
      </BlurView>
    </View>
  );
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{
        tabBarInactiveTintColor: "#cbd5e0",
        tabBarActiveTintColor: "#f56565",
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          elevation: 1,
          backgroundColor: "transparent",
          height: 84,
          marginHorizontal: 2,
          bottom: -4,
          // ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.APPROUTES.LOCATION_NAVIGATION}
        component={LocationNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="find"
              color={color}
              size={40}
              style={{ height: 40 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.MY_EVENTS}
        component={MyEvents}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={55}
              color={color}
              style={{ height: 54 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.ADD_EVENT}
        component={CreateEvent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="plus-square"
              size={45}
              color={color}
              style={{ height: 44 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="user-circle-o"
              size={40}
              color={color}
              style={{ height: 40 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  shadowTop: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
