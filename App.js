import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigation from "./src/Navigation/AppNavigation";
import { useEffect, useState } from "react";
import { getToken } from "./src/apis/auth/storage";
import UserContext from "./src/context/UserContext";
import jwt_decode from "jwt-decode";
import { StatusBar } from "expo-status-bar";

export default function App() {
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
          <StatusBar style="auto" />
          {<AppNavigation />}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
