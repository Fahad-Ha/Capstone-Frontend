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
import ROUTES from "../Navigation";

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
  console.log(profile);
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
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="bg-gray-300 -mt-12 pt-6 "
      >
        <View className="pb-64 items-center">
          <Image
            width={100}
            height={100}
            source={{ uri: `${profile?.image}` }}
          />

          <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
            <Text className="pb-2  text-lg font-bold p-2 ">
              Interests: {profile?.interests}
            </Text>
          </View>

          <Text className="pb-2 text-lg font-bold">
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
      </View>
    </ScrollView>
  );
};

export default Profile;
