import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import the useQuery hook
import { getProfileData } from "../apis/auth/index";
import React from "react";
import Rectangle from "../../assets/Rectangle.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import ProfileB from "../../assets/banner2.png";
import ROUTES from "../Navigation";
import useNotifications from "../hooks/useNotifications";
import bgImage from "../../assets/bg5.jpeg";
import ShareBtn from "../Components/Events/ShareBtn";
import homeB from "../../assets/home4.jpg";
import pfp from "../../assets/LOGO.png";
import EventCard from "../Components/Events/EventCard";
import { BASE_URL } from "../apis";

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
    <ImageBackground source={homeB} style={{ flex: 1 }}>
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderColor: "rgba(100, 0, 0, 0.3)",
        }}
        className=" overflow-hidden"
      >
        <ScrollView
        // className="bg-gray-600"
        // style={{
        //   flex: 1,
        // }}
        >
          <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.45)" />
          <View className="relative h-72">
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginTop: 67,
              }}
            >
              <Image
                className="h-full w-full"
                style={{
                  borderRadius: 100,
                  width: 120,
                  height: 120,
                }}
                source={pfp}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                @{profile?.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute  top-10 left-1 rounded-full shadow p-2"
            >
              <View className="flex-row items-center ">
                <Feather name="arrow-left" size={32} color={"white"} />
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
              borderWidth: 0,
              elevation: 115,
              backgroundColor: "transparent",
              transform: [{ perspective: 1000 }, { translateY: -30 }],
            }}
          >
            <BlurView
              intensity={50}
              tint="dark"
              style={{
                marginTop: 22,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                backgroundColor: "rgba(0, 0, 0)",
                borderColor: "rgba(100, 0, 0, 0.3)",

                // borderWidth: 1.5,
              }}
              className=" overflow-hidden"
            >
              <ImageBackground source={ProfileB} style={{ flex: 1 }}>
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={{
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(100, 0, 0, 0.3)",
                    paddingHorizontal: 16,
                  }}
                  className=" overflow-hidden"
                >
                  <ScrollView>
                    <View className="pb-36 items-center">
                      <Image
                        className=" rounded-full overflow-hidden"
                        width={100}
                        height={100}
                        source={{ uri: `${BASE_URL}/${profile?.image}` }}
                      />

                      <View
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                        className=" rounded-full p-2 shadow-2xl shadow-gray-600 mb-5 "
                      >
                        <Text className="pb-2 text-white  text-lg font-bold p-2 ">
                          Interests: {profile?.interests}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-white font-semibold mb-2 text-lg">
                          Created Events:
                        </Text>
                      </View>

                      <View
                        style={{
                          overflow: "hidden",
                          borderRadius: 30,
                        }}
                        className=" items-center   shadow-gray-600 mb-5"
                      >
                        <TouchableOpacity>
                          {profile?.createdEvents?.map((createdEvents) => (
                            <View key={createdEvents?._id}>
                              <Image
                                resizeMode="contain"
                                height={140}
                                width={350}
                                source={{
                                  uri: `${BASE_URL}/${createdEvents?.image}`,
                                }}
                                style={{ borderRadius: 30, overflow: "hidden" }}
                              />
                              <BlurView
                                intensity={65}
                                tint="default"
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  overflow: "hidden",
                                  height: "30%", // 1/3 of the card height
                                  justifyContent: "center",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Text className="text-lg p-10 font-semibold text-white text-center absolute">
                                  {createdEvents?.name}
                                </Text>
                              </BlurView>
                            </View>
                          ))}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </BlurView>
              </ImageBackground>
            </BlurView>
          </View>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
};

export default Profile;
