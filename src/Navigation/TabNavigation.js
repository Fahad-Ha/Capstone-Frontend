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
import AuthNavigation from "./AuthNavigator";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Users from "../Screens/Users";
import Chat1 from "../Screens/Chat1";
import Explore from "../Screens/Events";
import CreateEvent from "../Screens/CreateEvent";
import MyEvents from "../Screens/MyEvents";
import Profile from "../Screens/Profile";

import DMButton from "../Components/DMButton";
import UserContext from "../context/UserContext";
import { BlurView } from "expo-blur";
import CreateEventNavigation from "./CreateEventNavigation";
import DirectMsg from "../Screens/DirectMsg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  //   const theme = useTheme(); // Get the currently active theme
  const { user, setUser } = useContext(UserContext);
  const TabBar = (props) => (
    <View>
      <BlurView
        style={{
          flexDirection: "row",
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0,0.2)",
          // borderColor: "rgba(255, 255, 255, 0.3)",
          // borderWidth: 1.5,
          justifyContent: "space-around",
          alignItems: "center",
          bottom: 0,
          left: 0,
          right: 0,
          height: hp(8),
          borderRadius: 16,
          // marginHorizontal: 16,
          overflow: "hidden", // Hide the overflow from the border
        }}
        tint="dark"
        intensity={100}
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
        tabBarActiveTintColor: "#FF006B",
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
          height: hp(12),
          paddingTop: hp(6),

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
              size={35}
              style={{ height: hp(6) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.MY_EVENTS}
        component={user ? MyEvents : AuthNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={47}
              color={color}
              style={{ height: hp(7.8) }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create event navigation"
        component={user ? CreateEventNavigation : AuthNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="plus-square"
              size={40}
              color={color}
              style={{ height: hp(6.6) }}
            />
          ),
        }}
      />
      {user ? (
        <>
          <Tab.Screen
            name={ROUTES.APPROUTES.DIRECT_MSGLIST}
            component={DirectMsg}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign
                  name="message1"
                  size={36}
                  color={color}
                  style={{ height: hp(6) }}
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
                  size={35}
                  color={color}
                  style={{ height: hp(6) }}
                />
              ),
            }}
          />
        </>
      ) : null}
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
