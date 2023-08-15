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
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
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
import { Fontisto } from "@expo/vector-icons";

const EventDetails = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height; // Get window height

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
  const removeAlert = () =>
    Alert.alert(
      "Event Removed",
      "The event has been removed to your calendar.",
      [
        {
          text: "OK",
          onPress: () => {
            RemoveCalendar(), navigation.goBack();
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  const toggleRSVP = () => {
    if (!user) {
      // User is not logged in, show an alert message
      Alert.alert("Login Required", "Please log in to RSVP for this event.", [
        {
          text: "OK",
          onPress: () => navigation.navigate(ROUTES.AUTHROUTES.LOGIN),
        },
      ]);
      return;
    }
    if (userHasRSVPd) {
      // User has RSVP'd, so remove RSVP and calendar event
      unRSVPToEvent();
      removeAlert();
    } else {
      // User hasn't RSVP'd, so add RSVP and calendar event
      addAlert();
      rsvpToEvent();
    }
  };

  const eventDateIsFuture = moment(event.from).isAfter(moment());
  const formattedEventDate = `${moment(eventDate).format(
    "ddd, MMM D"
  )}  -  ${moment(event.from).format("HH:mm")} - ${moment(event.to).format(
    "HH:mm"
  )}`;

  // console.log("this is tags", event.tags[0].name);
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
            <Text className=" text-2xl text-white font-bold rounded-full  shadow-2xl shadow-gray-600 mb-2">
              {event?.name}
            </Text>
            <View className="flex-row justify-end mt-2 ">
              {event?.organizer?._id === user?._id && (
                <TouchableOpacity className="mx-4" onPress={handleDelete}>
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                    className="flex-row p-2 items-center absolute top-[-65] left-20 "
                  >
                    {showBox}
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-semibold text-base ml-1">
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-row mb-6">
              {event?.tags?.map((interest, index) => (
                <View className="justify-start" key={index}>
                  <Text
                    style={{
                      padding: 12,
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      marginHorizontal: 3,
                      overflow: "hidden",
                      borderRadius: 15,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {interest?.name}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={openGoogleMaps}>
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 15,
                }}
                className="flex-row items-center p-2 my-2"
              >
                <MaterialCommunityIcons
                  name="google-maps"
                  size={24}
                  color="#F2583E"
                />
                <Text className="text-white" style={{ marginLeft: 8 }}>
                  {location === "No location provided" && location}
                  {location?.countryName} {location?.city}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: 15,
              }}
              className="flex-row p-2 items-center shadow-2xl shadow-gray-600 mb-3"
            >
              <MaterialIcons name="date-range" size={24} color="#F2583E" />
              <Text className=" text-lg text-center mx-2 justify-center text-white ">
                {formattedEventDate}
              </Text>
            </View>
            <View
              className="mb-2 relative"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.replace(ROUTES.APPROUTES.OTHERPROFILE, {
                    _id: event?.organizer,
                  });
                }}
              >
                <Text className=" p-2  text-white rounded-full text-center mx-2 justify-center">
                  Organizer:{" "}
                  {event?.organizer
                    ? event?.organizer?.username
                    : "Default User"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-ro rounded-lg  shadow-2xl shadow-gray-600 mb-3">
              <Text className="text-white text-lg text-center">Attendees</Text>

              {event?.attendees?.length > 0 ? (
                event?.attendees?.map((attendee, index) => (
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      borderRadius: 15,
                    }}
                    className="justify-center items-center my-2"
                    key={index}
                  >
                    <Text className="p-2 text-lg text-center mx-2 justify-center text-white font-bold">
                      {event?.attendees?.length}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: 15,
                  }}
                  className="justify-center items-center my-2"
                >
                  <Text className="text-center mx-2 text-white p-2">
                    No attendees yet!
                  </Text>
                </View>
              )}
            </View>

            <Text className="text-white text-xl font-bold">
              About the event
            </Text>
            <ScrollView style={{ maxHeight: "40%" }}>
              <View>
                <Text className="text-white text-center mt-2">
                  {event?.description}
                </Text>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={toggleRSVP}>
              {eventDateIsFuture && (
                <View
                  className={`bg-red-500 rounded-full w-72 shadow-lg shadow-gray-900 z-50 mt-10 mb-10 ${
                    userHasRSVPd ? "bg-red-700" : ""
                  }`}
                >
                  <Text className="text-center p-5 text-lg text-white font-semibold">
                    {userHasRSVPd
                      ? "I'm no longer Interested"
                      : "I'm Interested!"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </ScrollView>
  );
};

export default EventDetails;
