import { View, Text, Image } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import the useQuery hook
import { getProfileData } from "../apis/auth/index";
import React from "react";

const Profile = () => {
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
    <View className="flex-1 items-center justify-center">
      <Text>{profile?.username}</Text>
      <Image width={100} height={100} source={{ uri: `${profile?.image}` }} />
      <Text>Interests: {profile?.interests}</Text>
      <Text>{profile?.dateOfBirth}</Text>
    </View>
  );
};

export default Profile;
