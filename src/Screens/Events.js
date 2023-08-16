import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import EventList from "../Components/Events/EventList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import DMButton from "../Components/DMButton";
import HomeBB from "../../assets/BGL1.png";
import UserContext from "../context/UserContext";
import { BlurView } from "expo-blur";
import { getEvents, getSuggestedEvents } from "../apis/event";
import { BASE_URL } from "../apis";
import moment from "moment";
import ROUTES from "../Navigation";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const Explore = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["events"]);
      return () => {};
    }, [])
  );

  const {
    data: events,
    isFetching,
    refetch: eventRefecth,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
  const { data: sugEvents, refetch: sugRefecth } = useQuery({
    queryKey: ["suggestedEvents"],
    queryFn: () => getSuggestedEvents(),
  });
  console.log(sugEvents);

  return (
    <ImageBackground source={HomeBB} style={{ flex: 1 }}>
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderColor: "rgba(100, 0, 100, 0.1)",
        }}
        className=" overflow-hidden"
      >
        <SafeAreaView>
          <View
            style={{
              width: "100%",

              // backgroundColor: "grey",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="arrow-drop-down" size={28} color="#FF005C" />
            <Text style={{ color: "white", fontSize: 17 }}>
              current location
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              textAlign: "center",
              marginLeft: 20,
            }}
          >
            Kuwait,Kuwait
          </Text>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  eventRefecth();
                  sugRefecth();
                }}
              />
            }
          >
            <View style={{ flex: 1, marginBottom: 100 }}>
              {user && sugEvents?.length > 0 ? (
                <View style={{ flex: 1, height: 265 }}>
                  <Text className="text-2xl font-bold text-center mb-5 mt-2 text-white">
                    Suggested events!
                  </Text>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                  >
                    {sugEvents
                      ?.filter((item) => item.organizer._id != user._id)
                      .map((item) => {
                        // console.log(item);
                        return (
                          <View
                            style={{
                              height: 200,

                              width: 250,
                              borderRadius: 60,
                              marginRight: 10,
                              overflow: "hidden",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate(
                                  ROUTES.APPROUTES.EVENT_DETAILS,
                                  {
                                    _id: item._id,
                                    event: item,
                                  }
                                );
                              }}
                            >
                              <BlurView
                                intensity={65}
                                tint="default"
                                style={{
                                  height: "100%", // 1/3 of the card height
                                  width: "100%",
                                }}
                              >
                                <Image
                                  source={{ uri: BASE_URL + "/" + item.image }}
                                  height={100}
                                  width={250}
                                />
                                <Text className="text-2xl font-bold text-left mb-5 px-4 mt-1 text-white">
                                  {item.name}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 20,
                                  }}
                                >
                                  <Text
                                    style={{ color: "#FF005C" }}
                                    className="text-sm  text-center  font-semibold"
                                  >
                                    {moment(item.date).format("ddd, MMM D")}{" "}
                                  </Text>
                                  <Text
                                    style={{ color: "#fff" }}
                                    className="text-sm  text-center   font-semibold"
                                  >
                                    {moment(item.from).format("HH:mm")}-
                                    {moment(item.to).format("HH:mm")}
                                  </Text>
                                </View>
                              </BlurView>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
              ) : null}

              <View style={{ flex: 1, position: "relative" }}>
                <Text className="text-2xl pt-3 font-bold text-center mb-5  text-white">
                  Explore The Events Around Us!
                </Text>
                <TextInput
                  placeholderTextColor={(color = "rgba(255, 255, 255, 0.61)")}
                  // className="bg-white py-2 px-2 ml-4 mr-4 rounded-lg mb-2"
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(232, 232, 232, 0.45)",
                    textAlign: "left",
                    height: 40,
                    color: "white",
                    borderRadius: 15,
                    paddingLeft: 20,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  placeholder="Search by Event name..."
                ></TextInput>

                <View className="flex right-0 items-end py-2 px-4 absolute ">
                  {/* {user ? <DMButton /> : null} */}
                </View>
                <EventList events={events} searchQuery={searchQuery} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </BlurView>
    </ImageBackground>
  );
};

export default Explore;
