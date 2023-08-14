import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import Events from "../Screens/Events";
import EventDetails from "../Screens/EventDetails";
import DirectMsg from "../Screens/DirectMsg";

const Stack = createStackNavigator();
export default function LocationNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.APPROUTES.EXPLORE} component={Events} />
      <Stack.Screen
        name={ROUTES.APPROUTES.EVENT_DETAILS}
        component={EventDetails}
      />
      <Stack.Screen
        component={DirectMsg}
        name={ROUTES.APPROUTES.DIRECT_MSGLIST}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
