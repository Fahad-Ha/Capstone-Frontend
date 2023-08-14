import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../apis/event";
import { getAllTags } from "../../apis/tags";
import ROUTES from "../../Navigation";

const EvenInfo3 = ({ route, navigation }) => {
  const { data: data2 } = route.params;
  const [data, setData] = useState({ ...data2 });
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState([]);
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags(),
  });
  console.log({ data2 });
  const { mutate: createEventFun, isLoading: isCreatingEvent } = useMutation({
    mutationFn: async () => {
      return createEvent({
        ...data,
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
        tags: selectedTags,
      });
    },
    onSuccess: () => {
      setData({});
      // setImage(null);
      // setLocation(null);
      setSelectedTags([]);
      queryClient.invalidateQueries(["events"]);
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
    },
  });
  const handleSubmit = () => {
    createEventFun();
    console.log(selectedTags);
  };
  console.log(data);
  return (
    <View style={{ flex: 0.7 }}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {tags?.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              if (selectedTags.includes(item._id)) {
                setSelectedTags(selectedTags.filter((id) => id !== item._id));
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
              } else {
                setSelectedTags([...selectedTags, item._id]);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
              }
            }}
            style={{
              width: "50%", // Two columns
              marginBottom: 5,
              paddingHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: selectedTags.includes(item._id)
                  ? "green"
                  : "gray",
                height: 40,
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          className="bg-blue-500 p-12 rounded-8 items-center mb-60"
          onPress={handleSubmit}
          disabled={isCreatingEvent}
        >
          <Text className="text-white text-lg">
            {isCreatingEvent ? "Creating Event..." : "Create Event"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EvenInfo3;
