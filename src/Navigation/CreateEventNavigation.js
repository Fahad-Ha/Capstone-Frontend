// CreateEventNavigation.js
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventInfo1 from "../Screens/Event/EventInfo1";
import EventInfo2 from "../Screens/Event/EventInfo2";
import EventInfo3 from "../Screens/Event/EventInfo3";
import SelectLocationMap from "../Screens/SelectLocationMap";
import ROUTES from ".";

const Stack = createStackNavigator();

export default function CreateEventNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.APPROUTES.ADD_EVENT.EVENT_INFO1}
        component={EventInfo1}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.ADD_EVENT.EVENT_INFO2}
        component={EventInfo2}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.ADD_EVENT.EVENT_INFO3}
        component={EventInfo3}
      />
      <Stack.Screen name="SelectLocationMap" component={SelectLocationMap} />
    </Stack.Navigator>
  );
}
