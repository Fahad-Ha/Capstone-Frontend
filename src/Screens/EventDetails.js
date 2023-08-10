import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { getLocationAddress } from "../apis/location";
import Rectangle from "../../assets/Rectangle.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ROUTES from "../Navigation";
import { BASE_URL } from "../apis";
import UserContext from "../context/UserContext";
import { deleteEvent, getEventById } from "../apis/event";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const formatDate = (date) => {
//   const options = {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//   };
//   return new Intl.DateTimeFormat("en-US", options).format(date);
// };

const EventDetails = ({ navigation, route }) => {
  const [showBox, setShowBox] = useState(true);
  const { user } = useContext(UserContext);
  const _id = route.params._id;
  const queryClient = useQueryClient();
  // const formattedDate = formatDate(new Date(event.date));
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery(["event", _id], () => getEventById(_id));

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteEventFun();
            setShowBox(false);
          },
        },

        {
          text: "No",
        },
      ]
    );
  };
  const { mutate: deleteEventFun } = useMutation({
    mutationFn: () => deleteEvent(_id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["events"]);
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
      Alert.alert("Trip deleted successfully!");
    },
  });
  const handleDelete = () => {
    showConfirmDialog();
  };
  const { data: location } = useQuery({
    queryKey: ["location"],
    queryFn: () =>
      getLocationAddress(event.location.longitude, event.location.latitude),
    enabled: !!event?.location.longitude,
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !event) return <Text>Error fetching event details.</Text>;
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
          <TouchableOpacity
            onPress={() => {
              navigation.replace(ROUTES.APPROUTES.OTHERPROFILE, {
                _id: event.organizer,
              });
            }}
          >
            <Text className="pb-2 text-lg text-center mx-2 justify-center">
              {event.organizer ? event.organizer.username : "Default User"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.APPROUTES.MAP, {
                latitude: event.location.latitude,
                longitude: event.location.longitude,
                title: event.name,
              })
            }
          >
            <Text>
              {location === "No location provided" && location}
              {location?.countryName} {location?.city}
            </Text>
          </TouchableOpacity>
          <Text className="pb-2 text-lg text-center mx-2 justify-center">
            {event.description}
          </Text>
          <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
            {/* <Text className="pb-2  text-lg font-bold p-2 ">
              {formattedDate}
            </Text> */}
          </View>

          {/* <Text className="pb-2 text-lg">Duration {event.duration} hours</Text> */}
          {/* <Text className="pb-2 text-lg">{event.tags}</Text> */}
          {/* <Text className="pb-2 text-lg">{event.attendees}</Text> */}
          <View className="flex-row justify-end mt-10">
            {event?.organizer?._id === user?._id && (
              <TouchableOpacity className="mx-4" onPress={handleDelete}>
                <View className="flex-row items-center mb-10">
                  {showBox}

                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={18}
                    color="black"
                  />
                  <Text className="text-black font-semibold text-base ml-1">
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View className="bg-red-500 rounded-full w-72 shadow-lg shadow-gray-900 z-50">
            <TouchableOpacity>
              <Text className=" text-center p-5 text-lg text-white font-semibold ">
                I'm Interested!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventDetails;
