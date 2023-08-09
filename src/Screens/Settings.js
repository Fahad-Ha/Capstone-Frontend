import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import ROUTES from "../Navigation/index";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
      <View className="absolute top-10 left-1">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" rounded-full shadow p-2 "
        >
          <View className="flex-row items-center">
            <Feather name="arrow-left" size={32} color={"black"} />
            <Text className="text-xl mx-2 ">Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          setUser(false);
          removeToken();
        }}
      >
        <View className="flex-row bg-red-400 rounded-xl p-5 w-44 space-x-6 items-center">
          <MaterialCommunityIcons name="logout" size={24} color="black" />
          <Text className="text-lg font-semibold">Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
