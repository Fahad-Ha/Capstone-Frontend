import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Rectangle from "../../assets/Rectangle.png";

const formatDate = (date) => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const EventDetails = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { event } = route.params;

  const formattedDate = formatDate(new Date(event.date));

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.45)" />
      <View className="relative">
        <Image className="h-72 w-full" source={Rectangle} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute  top-10 left-2 rounded-full shadow p-2"
        >
          <View className="flex-row items-center">
            <Feather name="arrow-left" size={32} color={"white"} />
            <Text className="text-white text-xl mx-2 ">Event Details</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="bg-gray-300 -mt-12 pt-6 "
      >
        <View className="pb-36 items-center">
          <Text className="pb-2 text-lg font-bold bg-slate-100 p-2 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
            {event.name}
          </Text>
          <Text className="pb-2 text-lg text-center mx-2 justify-center">
            {event.description}
          </Text>
          <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
            <Text className="pb-2  text-lg font-bold p-2 ">
              {formattedDate}
            </Text>
          </View>

          <Text className="pb-2 text-lg">Duration {event.duration} hours</Text>
          <Text className="pb-2 text-lg">{event.tags}</Text>
          <Text className="pb-2 text-lg">{event.attendees}</Text>

          <Image
            source={{ uri: event.image }}
            style={{ height: 100, width: 100 }}
          />
          <View className="bg-red-500 rounded-full w-72 shadow-lg shadow-gray-900 z-50">
            <TouchableOpacity>
              <Text className=" text-center p-5 text-lg text-white font-semibold ">
                I'm Intersetd!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventDetails;
