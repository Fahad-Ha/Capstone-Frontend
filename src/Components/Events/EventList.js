import React from "react";
import { FlatList } from "react-native";
import EventCard from "./EventCard";
import { useQueryClient } from "@tanstack/react-query";
import { getEvents } from "../../apis/event/index";

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
    <>
      <FlatList
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </>
  );
};

export default EventList;
