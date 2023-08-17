import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import the useQuery hook
import { getProfileData } from "../apis/auth/index";
import React, { useContext, useState } from "react";
import Rectangle from "../../assets/Rectangle.png";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import ProfileB from "../../assets/BGL.png";
import ROUTES from "../Navigation";
import useNotifications from "../hooks/useNotifications";
import bgImage from "../../assets/bg5.jpeg";
import ShareBtn from "../Components/Events/ShareBtn";
import homeB from "../../assets/BGL.png";
import HomeB from "../../assets/BGL2.png";
import pfp from "../../assets/Home1.png";
import EventCard from "../Components/Events/EventCard";
import { BASE_URL } from "../apis";
import { AntDesign } from "@expo/vector-icons";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";

const Profile = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [editedName, setEditedName] = useState(profile?.name || ""); // Initialize with the user's current name

  const queryClient = useQueryClient(); // Get the query client instance
  // Get profile data
  const {
    data: profile,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileData(),
  });

  const eventsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * eventsPerPage;
  const endIdx = startIdx + eventsPerPage;

  const visibleEvents = profile?.createdEvents?.slice(startIdx, endIdx);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const hasNextPage = endIdx < profile?.createdEvents?.length;
  const hasPrevPage = currentPage > 1;

  const [isSettingsDropdownVisible, setIsSettingsDropdownVisible] =
    useState(false);

  const handleLogout = () => {
    // Implement your logout logic here
    setUser(false);
    removeToken();
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      currentName: profile?.username,
      image: profile?.image,
    });
  };
  const settingsOptions = [
    {
      id: "editProfile",
      icon: "edit-2",
      iconPack: "Feather", // Specify the icon pack
      title: "Edit Profile",
      action: handleEditProfile,
    },
    {
      id: "logout",
      icon: "logout",
      iconPack: "MaterialCommunityIcons", // Specify the icon pack
      title: "Logout",
      action: handleLogout,
    },
  ];

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl">Error loading profile data!</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={HomeB} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <BlurView
          intensity={0}
          tint="default"
          style={{
            backgroundColor: "rgba(0, 0, 0)",
            borderColor: "rgba(100, 0, 0, 0.3)",
            height: "100%",
          }}
          className=" overflow-hidden"
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={isSettingsDropdownVisible}
              onRequestClose={() => setIsSettingsDropdownVisible(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setIsSettingsDropdownVisible(false)}
              >
                <View style={styles.modalBackground}>
                  <BlurView
                    tint={"light"}
                    intensity={75}
                    style={styles.dropdownContainer}
                  >
                    <FlatList
                      data={settingsOptions}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.dropdownItem}
                          onPress={() => {
                            setIsSettingsDropdownVisible(false);
                            item.action(); // Call the corresponding action
                          }}
                        >
                          <View className="flex-row justify-between">
                            <Text
                              className="font-semibold"
                              style={styles.dropdownItemText}
                            >
                              {item.title}
                            </Text>
                            {item.iconPack === "Feather" && (
                              <Feather
                                name={item.icon}
                                size={24}
                                color="black" // Customize the color of the icon
                              />
                            )}
                            {item.iconPack === "MaterialCommunityIcons" && (
                              <MaterialCommunityIcons
                                name={item.icon}
                                size={24}
                                color="black" // Customize the color of the icon
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </BlurView>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <StatusBar
              translucent
              backgroundColor="rgba(255, 255, 255, 0.45)"
            />
            <View className="relative h-72">
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 20,
                }}
              >
                <Image
                  className="h-full w-full"
                  style={{
                    borderRadius: 100,
                    width: 120,
                    height: 120,
                    marginBottom: 10,
                  }}
                  source={{ uri: `${BASE_URL}/${profile?.image}` }}
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
                className="absolute  top-3 left-1 rounded-full shadow p-2"
              >
                <View className="flex-row items-center ">
                  <Feather name="arrow-left" size={32} color={"white"} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setIsSettingsDropdownVisible(!isSettingsDropdownVisible)
                }
                className="absolute  top-3 right-1 rounded-full shadow p-2"
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
                height: "100%",
                elevation: 115,
                backgroundColor: "transparent",
                transform: [{ perspective: 1000 }, { translateY: -30 }],
              }}
            >
              <BlurView
                intensity={0}
                tint="default"
                style={{
                  marginTop: 22,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  backgroundColor: "rgba(0, 0, 0)",
                  borderColor: "rgba(100, 0, 0, 0.3)",
                  height: "100%",
                  // borderWidth: 1.5,
                }}
                className=" overflow-hidden"
              >
                <ImageBackground source={pfp} style={{ flex: 1 }}>
                  <BlurView
                    intensity={30}
                    tint="default"
                    style={{
                      backgroundColor: "rgba(0, 0, 0,0.2)",
                      borderColor: "rgba(100, 0, 0, 0.3)",
                      paddingHorizontal: 16,
                      height: "100%",
                    }}
                    className=" overflow-hidden"
                  >
                    <ScrollView>
                      <View className="pb-36 items-center ">
                        <Text className="text-white font-semibold text-lg mt-4">
                          Interests:
                        </Text>
                        {/*  */}

                        <ScrollView horizontal>
                          {profile?.interests?.map((interest, index) => (
                            <BlurView
                              intensity={60}
                              tint="light"
                              style={{
                                height: 44,
                                marginHorizontal: 5,
                                borderColor: "#FF1D61",
                                flexDirection: "row",
                                borderRadius: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 20,
                                gap: 5,
                              }}
                              className="overflow-hidden "
                            >
                              <FontAwesome
                                name="dot-circle-o"
                                size={30}
                                color="#5559BC"
                              />
                              <Text
                                style={{
                                  paddingHorizontal: 5,
                                  color: "white",
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  marginHorizontal: 2,
                                  overflow: "hidden",
                                  textAlign: "center",
                                  borderRadius: 15,
                                }}
                              >
                                {interest.name}
                              </Text>
                            </BlurView>
                          ))}
                        </ScrollView>

                        {/* <View className="rounded-full shadow-2xl shadow-gray-600 my-5">
                          <View className="flex-row flex-wrap ">
                            {profile?.interests?.map((interest, index) => (
                              <View key={index}>
                                <Text
                                  style={{
                                    padding: 20,
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginHorizontal: 10,
                                    overflow: "hidden",
                                    borderRadius: 15,
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  {interest?.name}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View> */}

                        {/*  */}
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
                          {visibleEvents?.length > 0 ? (
                            visibleEvents?.map((createdEvents) => (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate(
                                    ROUTES.APPROUTES.EVENT_DETAILS,
                                    {
                                      _id: createdEvents._id,
                                      event: createdEvents,
                                    }
                                  );
                                }}
                              >
                                <View key={createdEvents?._id} className="mb-5">
                                  <Image
                                    resizeMode="cover"
                                    height={140}
                                    width={350}
                                    source={{
                                      uri: `${BASE_URL}/${createdEvents?.image}`,
                                    }}
                                    style={{
                                      borderRadius: 30,
                                      overflow: "hidden",
                                    }}
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
                                      borderBottomLeftRadius: 30,
                                      borderBottomRightRadius: 30,
                                    }}
                                  >
                                    <Text className="text-lg p-10 font-semibold text-white text-center absolute">
                                      {createdEvents?.name}
                                    </Text>
                                  </BlurView>
                                </View>
                              </TouchableOpacity>
                            ))
                          ) : (
                            <Text
                              style={{
                                color: "white",
                                fontSize: 18,
                                textAlign: "center",
                                padding: 20,
                              }}
                            >
                              You haven't created any event!
                            </Text>
                          )}
                          {profile?.createdEvents?.length > eventsPerPage && (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginHorizontal: 20,
                                marginTop: 20,
                              }}
                            >
                              {hasPrevPage && (
                                <TouchableOpacity onPress={prevPage}>
                                  <View className="flex-row items-center mr-[15%]">
                                    <AntDesign
                                      name="left"
                                      size={30}
                                      color="white"
                                    />
                                    <Text className="text-white text-lg">
                                      Previous Page
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}

                              {hasNextPage && (
                                <TouchableOpacity onPress={nextPage}>
                                  <View className="flex-row">
                                    <Text className="text-white text-lg">
                                      Next Page
                                    </Text>

                                    <AntDesign
                                      name="right"
                                      size={30}
                                      color="white"
                                    />
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  </BlurView>
                </ImageBackground>
              </BlurView>
            </View>
          </ScrollView>
        </BlurView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // ... existing styles

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContainer: {
    backgroundColor: "rgba(0, 0, 0,0.5)", // Change to your selected color
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    // marginBottom: 20,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  dropdownItemText: {
    fontSize: 16,
    marginRight: 12,
  },
});

export default Profile;
