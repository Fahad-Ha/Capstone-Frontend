import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const EventDetails = () => {
  const route = useRoute();
  const { event } = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="pb-2 text-lg">EventDetails</Text>
      <Text className="pb-2 text-lg font-bold">{event.name}</Text>
      <Text className="pb-2 text-lg text-center">{event.description}</Text>
      <Text className="pb-2 text-lg">Date {event.date}</Text>
      <Text className="pb-2 text-lg">Duration {event.duration}</Text>
      <Text className="pb-2 text-lg">{event.tags}</Text>
      <Text className="pb-2 text-lg">{event.attendees}</Text>

      <Image
        source={{ uri: event.image }}
        style={{ height: 100, width: 100 }}
      />
      <TouchableOpacity>
        <Text className="bg-red-500 rounded-md p-5 text-lg text-white font-semibold">
          I'm Intersetd!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;
