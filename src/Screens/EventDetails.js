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
      <Text>EventDetails</Text>
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>{event.date}</Text>
      <Text>Duration {event.duration}</Text>
      <Text>{event.tags}</Text>
      <Text>{event.attendees}</Text>

      <Image
        source={{ uri: event.image }}
        style={{ height: 100, width: 100 }}
      />
      <TouchableOpacity>
        <Text
          style={{
            backgroundColor: "orange",
            height: 50,
            textAlign: "center",
            width: 100,
            lineHeight: 50, // Vertically align the text within the container
          }}
        >
          I'm Intersetd!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;
