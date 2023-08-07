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
import { getEvents } from "../../apis/events/index";

const EventList = () => {
  const clientQuery = useQueryClient();
  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <>
      <FlatList
        data={events}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default EventList;
