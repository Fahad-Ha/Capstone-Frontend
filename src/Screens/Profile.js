import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import the useQuery hook
import { getProfileData } from "../apis/auth/index";
import React from "react";
import Rectangle from "../../assets/Rectangle.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

import ROUTES from "../Navigation";
import useNotifications from "../hooks/useNotifications";

const Profile = () => {
  const navigation = useNavigation();

  const queryClient = useQueryClient(); // Get the query client instance
  // Get profile data
  const { data: profile, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileData(),
  });

  if (isError) {
    return (
      <View>
        <Text>Error loading profile data</Text>
      </View>
    );
  }
  return (
    <ScrollView
      className="bg-gray-600"
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.45)" />
      <View className="relative h-72">
        <View className="items-center my-14">
          <Image className="h-28 w-28 rounded-full" source={Rectangle} />
          <Text className="pb-2 text-lg font-bold bg-slate-100 p-2 rounded-lg  shadow-2xl shadow-gray-600 my-2">
            {profile?.username}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute  top-10 left-1 rounded-full shadow p-2"
        >
          <View className="flex-row items-center ">
            <Feather name="arrow-left" size={32} color={"white"} />
            <Text className="text-white text-xl mx-2 ">Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.APPROUTES.SETTINGS)}
          className="absolute  top-10 right-1 rounded-full shadow p-2"
        >
          <View className="flex-row items-center">
            <Feather name="settings" size={32} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Background for details  */}
      <View
        style={{
          borderWidth: 1,
          elevation: 8,
          transform: [{ perspective: 1000 }, { translateY: -30 }],
        }}
      >
        <BlurView
          intensity={30}
          tint="dark"
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: "rgba(0, 0, 0)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1.5,
          }}
          className="-mt-12 pt-6  overflow-hidden"
        >
          <View className="pb-64 items-center">
            <Image
              width={100}
              height={100}
              source={{ uri: `${profile?.image}` }}
            />

            <View
              style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
              className=" rounded-full p-2 shadow-2xl shadow-gray-600 mb-3 "
            >
              <Text className="pb-2 text-white  text-lg font-bold p-2 ">
                Interests: {profile?.interests}
              </Text>
            </View>

            <Text className="pb-2 text-white text-lg font-bold">
              Created Events: {profile?.createdEvents}
            </Text>

            <View className="bg-slate-100 rounded-lg shadow-2xl shadow-gray-600 mb-3 items-center mx-2 w-72">
              <TouchableOpacity>
                <Text className="text-lg p-8 font-semibold">
                  Workshop for design
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-slate-100 rounded-lg shadow-2xl shadow-gray-600 mb-3 items-center mx-2 w-72">
              <TouchableOpacity>
                <Text className="text-lg p-8 font-semibold">Music Event</Text>
              </TouchableOpacity>
            </View>
            {/* <Image source={{ uri: image }} style={{ height: 100, width: 100 }} /> */}
          </View>
        </BlurView>
      </View>
    </ScrollView>
  );
};

export default Profile;
