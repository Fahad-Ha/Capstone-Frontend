import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import ROUTES from "../Navigation/index";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import homeB from "../../assets/BGL1.png";
import { StatusBar } from "expo-status-bar";

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <ImageBackground source={homeB} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute  top-8 left-0 rounded-full shadow p-2"
        >
          <View className="flex-row items-center">
            <Feather name="arrow-left" size={32} color={"white"} />
            <Text className="text-xl mx-2 text-white">Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setUser(false);
            removeToken();
            navigation.navigate(ROUTES.APPROUTES.LOCATION_NAVIGATION);
          }}
        >
          <View className="flex-row bg-red-400 rounded-xl p-5 w-44 space-x-6 items-center">
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text className="text-lg font-semibold">Logout</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}
