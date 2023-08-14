import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  Linking,
  ScrollView,
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
import { deleteEvent, getEventById, rsvp, removeRSVP } from "../apis/event";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { BlurView } from "expo-blur";
import useCalendar from "@atiladev/usecalendar";

const EventDetails = ({ navigation, route }) => {
  const [showBox, setShowBox] = useState(true);
  const { user } = useContext(UserContext);
  const _id = route.params._id;
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    isThereEvents,
  } = useCalendar("EventlyApp", "#5351e0", "EventlyApp_Calendar_Events");

  const queryClient = useQueryClient();
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery(["event", _id], () => getEventById(_id));
  const eventDateParts = event?.date ? event.date.split("T") : [];
  const eventDate = eventDateParts[0];

  const userHasRSVPd = event?.attendees?.includes(user._id);
  console.log(userHasRSVPd);

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
  const { mutate: rsvpToEvent } = useMutation({
    mutationFn: () => rsvp(_id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["events"]);
    },
  });
  const { mutate: unRSVPToEvent } = useMutation({
    mutationFn: () => removeRSVP(_id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["events"]);
    },
  });
  const handleDelete = () => {
    showConfirmDialog();
  };
  const { data: location } = useQuery({
    queryKey: ["location"],
    queryFn: () =>
      getLocationAddress(
        event?.location?.coordinates[0],
        event?.location?.coordinates[1]
      ),
    enabled: !!event?.location?.coordinates[0],
  });
  const openGoogleMaps = () => {
    const { coordinates } = event.location;
    const destination = `${coordinates[1]},${coordinates[0]}`;
    let url;

    if (Platform.OS === "ios") {
      // Open Google Maps on iOS using URL scheme
      url = `comgooglemaps://?daddr=${destination}&directionsmode=driving`;
    } else {
      // Open Google Maps on Android using geo URI
      url = `geo:${destination}?q=${destination}&mode=d`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Fallback to opening in a web browser if Google Maps app is not available
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch((error) => {
        console.error("Error opening Google Maps:", error);
      });
  };
  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !event) return <Text>Error fetching event details.</Text>;

  // Add to Calander
  const createCalAndEvent = async () => {
    const granted = await getPermission();

    if (granted) {
      await createCalendar();
      let eventExists = await isThereEvents();

      const dateFrom = new Date(event?.from);
      const dateTo = new Date(event?.to);

      if (!eventExists) {
        try {
          addEventsToCalendar(event?.name, dateFrom, dateTo);
        } catch (e) {
          // Something went wrong
          console.log("error", e);
        }
      }
    } else {
      openSettings();
    }
  };

  const RemoveCalendar = () => deleteCalendar();

  const addAlert = () =>
    Alert.alert(
      "Event Added",
      "The event has been added to your calendar!",
      [
        {
          text: "OK",
          onPress: () => {
            createCalAndEvent(), navigation.goBack();
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  const toggleRSVP = () => {
    if (userHasRSVPd) {
      // User has RSVP'd, so remove RSVP and calendar event
      unRSVPToEvent();
      RemoveCalendar();
    } else {
      // User hasn't RSVP'd, so add RSVP and calendar event
      addAlert();
      rsvpToEvent();
      createCalAndEvent();
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.45)" />
        <View style={{ flex: 1 }}>
          <Image
            style={{ height: 200, width: "100%" }}
            source={{ uri: `${BASE_URL}/${event.image}` }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute  top-10 left-2 rounded-full shadow p-2"
          >
            <View
              className="rounded-full p-1"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            >
              <View className="flex-row items-center">
                <Feather name="arrow-left" size={32} color={"white"} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* blurred Background */}
        <BlurView
          intensity={30}
          tint="dark"
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: "rgba(0, 0, 0,0.5)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1.5,
          }}
          className="bg-gray-300 -mt-12 pt-6 overflow-hidden"
        >
          <View className="pb-72 items-center ">
            <Text
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              className="pb-2 text-lg text-white font-bold p-2 rounded-full  shadow-2xl shadow-gray-600 mb-3"
            >
              {event.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(ROUTES.APPROUTES.OTHERPROFILE, {
                  _id: event.organizer,
                });
              }}
            >
              <Text
                style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                className="pb-2 p-2 text-lg text-white rounded-full text-center mx-2 justify-center"
              >
                {event.organizer ? event.organizer.username : "Default User"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGoogleMaps}>
              <Text>
                {location === "No location provided" && location}
                {location?.countryName} {location?.city}
              </Text>
            </TouchableOpacity>
            <Text className="pb-2 text-lg text-center mx-2 justify-center">
              {event.description}
            </Text>
            <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
              <Text className="pb-2 text-lg text-center mx-2 justify-center">
                {eventDate}
              </Text>
            </View>
            <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
              <Text className="pb-2 text-lg text-center mx-2 justify-center">
                {moment(event.from).format("h:mm A")}
              </Text>
            </View>
            <View className="bg-slate-100 rounded-lg  shadow-2xl shadow-gray-600 mb-3">
              <Text className="pb-2 text-lg text-center mx-2 justify-center">
                {moment(event.to).format("h:mm A")}
              </Text>
            </View>
            <View className="flex-row justify-end mt-10 ">
              {event?.organizer?._id === user?._id && (
                <TouchableOpacity className="mx-4" onPress={handleDelete}>
                  <View className="flex-row items-center mb-10 ">
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
            <TouchableOpacity onPress={toggleRSVP}>
              <View
                className={`bg-red-500 rounded-full w-72 shadow-lg shadow-gray-900 z-50 ${
                  userHasRSVPd ? "bg-red-700" : ""
                }`}
              >
                <Text className="text-center p-5 text-lg text-white font-semibold">
                  {userHasRSVPd
                    ? "I'm no longer Interested"
                    : "I'm Interested!"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </ScrollView>
  );
};

export default EventDetails;
