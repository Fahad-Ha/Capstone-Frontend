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
import bgImage from "../../assets/bg4.jpeg";
import ShareBtn from "../Components/Events/ShareBtn";
import homeB from "../../assets/HomeBB.png";
import pfp from "../../assets/pfp.jpeg";

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
      <ScrollView
      // className="bg-gray-600"
      // style={{
      //   flex: 1,
      // }}

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
              className="h-full w-full"
              style={{
                borderRadius: 100,

                width: 120,
                height: 120,
              }}
              source={Rectangle}

            />

            <View
              style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
              className=" rounded-full p-2 shadow-2xl shadow-gray-600 mb-3 "
            >
              <Text className="pb-2 text-white  text-lg font-bold p-2 ">
                Interests: {profile?.interests}
              </Text>
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
              borderWidth: 1.5,
            }}
            className=" overflow-hidden"
          >
            <ImageBackground source={bgImage} style={{ flex: 1 }}>
              <BlurView
                intensity={40}
                tint="default"
                style={{
                  backgroundColor: "rgba(0, 0, 0)",
                  borderColor: "rgba(100, 0, 0, 0.3)",
                }}
                className=" overflow-hidden"
              >
                <ScrollView>
                  <View className="pb-50 items-center">
                    <Image
                      width={100}
                      height={100}
                      source={{ uri: `${profile?.image}` }}
                    />

                    <View
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                      className=" rounded-full p-2 shadow-2xl shadow-gray-600 mb-5 "
                    >
                      <Text className="pb-2 text-white  text-lg font-bold p-2 ">
                        Interests: {profile?.interests}
                      </Text>
                    </View>

                    <Text className="pb-5 text-white text-lg font-bold">
                      Created Events: {profile?.createdEvents}
                    </Text>

                    <View
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: 20,
                        marginBottom: 30,
                      }}
                      // className=" rounded-full p-2 shadow-2xl shadow-gray-600 mb-3"
                    >
                      <TouchableOpacity>
                        <Text className="text-lg p-8 font-semibold text-white">
                          Workshop for design
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: 20,
                        marginBottom: 30,
                      }}
                    >
                      <TouchableOpacity>
                        <Text className="text-lg p-8 font-semibold text-white">
                          Music Event
                        </Text>
                        <ShareBtn />
                      </TouchableOpacity>
                    </View>
                    {/* <Image source={{ uri: image }} style={{ height: 100, width: 100 }} /> */}
                  </View>
                </ScrollView>
              </BlurView>
            </ImageBackground>
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default Profile;
