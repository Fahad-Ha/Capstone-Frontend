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

      <BlurView
        intensity={90}
        tint="dark"
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderColor: "rgba(100, 0, 0, 0.3)",
        }}
        className=" overflow-hidden"

      <ScrollView

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
                source={Rectangle}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {" "}
                @{profile?.username}
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

          </TouchableOpacity>
        </View>
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
      </BlurView>

               
    </ImageBackground>
  );
};

export default Profile;
