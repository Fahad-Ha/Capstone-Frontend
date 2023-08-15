import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuggested } from "../../apis/event/index";
import EventCard from "./EventCard";
import EventCardSuggestions from "./EventCardSuggestions";
const SuggestedEvents = () => {
  const {
    data: eventsSug,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Suggested"],
    queryFn: () => getSuggested(),
  });

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <>
      <FlatList
        data={eventsSug}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{ height: 100 }}
        renderItem={({ item }) => <EventCardSuggestions event={item} />}
      />
    </>
  );
};

export default SuggestedEvents;
