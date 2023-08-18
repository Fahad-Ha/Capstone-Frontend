import React from "react";
import { FlatList, View } from "react-native";
import EventCard from "./EventCard";
import { useQueryClient } from "@tanstack/react-query";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EventList = ({ searchQuery, events }) => {
  const clientQuery = useQueryClient();

  // Get the current date
  const now = new Date();

  // Apply search filter and date filter
  const filteredEvents = events?.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      new Date(event.to) >= now
  );

  return (
    <View style={{ paddingBottom: hp(16) }}>
      <FlatList
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
};

export default EventList;
