import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EventCard from "./EventCard";
import { getEvents } from "../../apis/event/index";

const EventList = ({ searchQuery, events }) => {
  const clientQuery = useQueryClient();

  // Apply search filter
  const filteredEvents = events?.filter((event) =>
    event?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <FlatList
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        // }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default EventList;
