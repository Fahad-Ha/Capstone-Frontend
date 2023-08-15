import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../apis/event";
import { getAllTags } from "../../apis/tags";
import ROUTES from "../../Navigation";
import bgLogin from "../../../assets/BGL1.png";
import { Feather } from "@expo/vector-icons";

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
    <ImageBackground source={bgLogin} style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute  top-10 left-1 rounded-full shadow p-2"
      >
        <View className="flex-row items-center ">
          <Feather name="arrow-left" size={32} color={"white"} />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 0.9, marginTop: 80 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 10,
            fontSize: 16,
          }}
        >
          Choose interests:
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            color: "white",
          }}
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
                color: "white",
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  color: "white",
                  backgroundColor: selectedTags.includes(item._id)
                    ? "#FC6F99"
                    : "rgba(0, 0,0, 0.3)",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              backgroundColor: "#FF005C",
              marginLeft: "auto",
              marginRight: "auto",
              width: 200,
              height: 50,
              marginTop: 10,
              borderRadius: 10,
              bottom: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSubmit}
            disabled={isCreatingEvent}
          >
            <Text className="text-white text-lg">
              {isCreatingEvent ? "Creating Event..." : "Create Event"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default EvenInfo3;
