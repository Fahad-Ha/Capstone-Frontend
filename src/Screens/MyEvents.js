import {
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { getEvents } from "../apis/event/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EventCard from "../Components/Events/EventCard";
import UserContext from "../context/UserContext";
import homeB from "../../assets/BGL1.png";
import HomeB from "../../assets/BGL2.png";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const [showUpcoming, setShowUpcoming] = useState(true); // State to toggle between upcoming and previous events

  const clientQuery = useQueryClient();
  const navigation = useNavigation();

  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  if (isLoading)
    return (
      <ImageBackground
        source={homeB}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text className="text-white">Loading...</Text>
      </ImageBackground>
    );

  const now = new Date();
  const userRSVPDEvents = events.filter(
    (event) =>
      event.attendees.includes(user?._id) &&
      (showUpcoming ? new Date(event.from) >= now : new Date(event.to) < now)
  );

  return (
    <ImageBackground source={showUpcoming ? homeB : HomeB} style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute  top-8 left-0 rounded-full shadow p-2"
      >
        <View className="flex-row items-center">
          <Feather name="arrow-left" size={32} color={"white"} />
        </View>
      </TouchableOpacity>
      <BlurView style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showUpcoming && styles.selectedToggle]}
          onPress={() => setShowUpcoming(true)}
        >
          <Text style={styles.toggleText}>Upcoming Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showUpcoming && styles.selectedToggle]}
          onPress={() => setShowUpcoming(false)}
        >
          <Text style={[styles.toggleText, , styles.centeredText]}>
            Previous Events
          </Text>
        </TouchableOpacity>
      </BlurView>
      <FlatList
        data={userRSVPDEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "rgba(0, 0, 0,0.7)",
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedToggle: {
    // backgroundColor: "rgba(255, 255, 255, 0.2)", // Change to your selected color
    backgroundColor: "#FF005C",
  },
  centeredText: {
    textAlign: "center", // Center the text horizontally
  },
  toggleText: {
    fontSize: Platform.OS === "android" ? 18 : 14,

    color: "white",
  },
});

export default MyEvents;
