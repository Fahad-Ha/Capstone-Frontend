import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import Events from "../Screens/Events";
import EventDetails from "../Screens/EventDetails";
import Map from "../Screens/Map";
import SelectLocationMap from "../Screens/SelectLocationMap";
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
        name={ROUTES.APPROUTES.MAP}
        component={Map}
        options={{ tabBarVisible: false }}
      />
      <Stack.Screen
        component={DirectMsg}
        name={ROUTES.APPROUTES.DIRECT_MSGLIST}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SelectLocationMap" component={SelectLocationMap} />
      {/* <Stack.Screen
        name={ROUTES.APPROUTES.OTHERPROFILE}
        component={OtherProfiles}
      /> */}
    </Stack.Navigator>
  );
}
