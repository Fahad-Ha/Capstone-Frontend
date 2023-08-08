// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { socket } from "./socket";

// import { useEffect, useState } from "react";

// import ConnectionState from "./src/Components/ConnectionState";
// import ConnectionManager from "./src/Components/ConnectionManager";
// import MyEvents from "./src/Components/MyEvents";
// import MyForm from "./src/Components/MyForm";
// import Chat from "./Screens/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigation from "./src/Navigation/AppNavigation";
import TabNavigation from "./src/Navigation/TabNavigation";

import { useEffect, useState } from "react";
import { getToken } from "./src/apis/auth/storage";
import AuthNavigation from "./src/Navigation/AuthNavigator";
import UserContext from "./src/context/UserContext";
import jwt_decode from "jwt-decode";

export default function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value) {
  //     setFooEvents((previous) => [...previous, value]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("foo", onFooEvent);
  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("foo", onFooEvent);
  //   };
  // }, []);

  const [user, setUser] = useState(false);
  const getUserFromStorage = async () => {
    const token = await getToken();
    if (token) {
      const user = jwt_decode(token);
      setUser(user);
    }
  };
  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? <AppNavigation /> : <AuthNavigation />}
          {/* {user ? <TabNavigation /> : <AuthNavigation />} */}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
