import { createStackNavigator } from "@react-navigation/stack";
import SelectLocationMap from "../Screens/SelectLocationMap";
import CreateEvent from "../Screens/CreateEvent";
import ROUTES from ".";

const Stack = createStackNavigator();
export default function CreateEventNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.APPROUTES.ADD_EVENT} component={CreateEvent} />
      <Stack.Screen name="SelectLocationMap" component={SelectLocationMap} />
    </Stack.Navigator>
  );
}
