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
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import HomeB from "../../assets/BGL1.png";
import HomeBB from "../../assets/BGL2.png";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

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

  const userHasRSVPd = event?.attendees.some(
    (attendee) => attendee._id === user._id
  );
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
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="black"></ActivityIndicator>
      </View>
    );
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

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Event Added",
      text2: "The event has been added to your calendar!",
      visibilityTime: 2000,
      onHide: () => {
        rsvpToEvent();
        navigation.goBack();
      },
    });
  };

  const showToastDelete = () => {
    Toast.show({
      type: "error",
      text1: "Event Deleted",
      text2: "The event has been deleted from your calendar!",
      visibilityTime: 2000,

      onHide: () => {
        unRSVPToEvent();
        navigation.goBack();
      },
    });
  };
  const handleRSVPAdd = () => {
    createCalAndEvent();
    showToast();
  };

  const handleRSVPDelete = () => {
    RemoveCalendar();
    showToastDelete();
  };
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
      handleRSVPDelete();
      unRSVPToEvent();
    } else {
      // User hasn't RSVP'd, so add RSVP and calendar event
      handleRSVPAdd();
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

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "green",
        }}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: "400",
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#79b1bf",
        }}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: "400",
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <ImageBackground source={HomeBB} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.45)" />
          <View style={{ flex: 1 }}>
            <Image
              style={{ height: 250, width: "100%" }}
              source={{ uri: `${BASE_URL}/${event?.image}` }}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute  top-10 left-2 rounded-full shadow p-2"
            >
              <View
                className="rounded-full p-1"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <View className="flex-row items-center ">
                  <Feather name="arrow-left" size={32} color={"white"} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <ImageBackground source={HomeB} style={{ flex: 1 }}>
            <BlurView
              intensity={70}
              tint="dark"
              style={{
                // backgroundColor: "rgba(0, 0, 0, 0.8)",

                borderRadius: 40,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

                overflow: "hidden",
              }}
              className="-mt-4 pt-6 overflow-hidden "
            >
              <View className="pb-72 items-center ">
                <Text className=" text-2xl text-white font-bold rounded-full  shadow-2xl shadow-gray-600 mb-2">
                  {event?.name} (
                  {event?.price === 0 ? "Free" : `${event?.price} KD`})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ROUTES.APPROUTES.DIRECT_MSG, {
                      user: event?.organizer,
                    });
                  }}
                >
                  <Text className="   text-white rounded-full text-center mx-2 justify-center mb-4">
                    Organizer:{" "}
                    {event?.organizer
                      ? event?.organizer?.username
                      : "Default User"}
                  </Text>
                </TouchableOpacity>
                <View className="flex-row justify-end mt-2 ">
                  {event?.organizer?._id === user?._id && (
                    <TouchableOpacity className="mx-4" onPress={handleDelete}>
                      <View
                        style={{
                          borderRadius: 15,
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          marginLeft: 330,
                        }}
                        // className="flex-row p-2 items-center absolute top-[-52] left-24 "
                      >
                        {showBox}
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={26}
                          color="white"
                        />
                        {/* <Text className="text-white font-semibold text-base ml-1">
                          Delete
                        </Text> */}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <BlurView
                  intensity={60}
                  tint="light"
                  style={{
                    height: 44,
                    marginHorizontal: 5,
                    flex: 0.1,
                    // backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderColor: "#FF1D61",

                    borderRadius: 30,
                    paddingVertical: "auto",
                  }}
                  className="overflow-hidden "
                >
                  <View className="flex-row justify-center align-baseline">
                    <FontAwesome
                      name="dot-circle-o"
                      size={30}
                      color="#FF1D61"
                      style={{ marginTop: 8, marginLeft: 10 }}
                    />
                    {event?.tags?.map((interest, index) => (
                      <View key={index}>
                        <Text
                          style={{
                            padding: 12,
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            marginHorizontal: 2,
                            overflow: "hidden",
                            textAlign: "center",
                            borderRadius: 15,
                            // backgroundColor: "rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {interest?.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </BlurView>

                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: 15,
                  }}
                  className="flex-row p-2 items-center shadow-2xl mt-4"
                >
                  <MaterialIcons name="date-range" size={24} color="#FF1D61" />
                  <Text className=" text-lg text-center mx-2 justify-center text-white ">
                    {formattedEventDate}
                  </Text>
                </View>
                <TouchableOpacity onPress={openGoogleMaps}>
                  <View
                    style={
                      {
                        // backgroundColor: "rgba(0, 0, 0, 0.1)",
                        // borderRadius: 15,
                      }
                    }
                    className="flex-row items-center p-2 my-1"
                  >
                    <MaterialCommunityIcons
                      name="google-maps"
                      size={24}
                      color="#FF1D61"
                    />
                    <Text className="text-white" style={{ marginLeft: 8 }}>
                      {location === "No location provided" && location}
                      {location?.countryName} {location?.city}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  className="mb-2 relative"
                  style={
                    {
                      // backgroundColor: "rgba(0, 0, 0, 0.1)",
                      // borderRadius: 15,
                    }
                  }
                ></View>

                <Text className="text-white text-xl font-bold mt-3">
                  ABOUT THE EVENT
                </Text>
                <ScrollView style={{ maxHeight: "40%" }}>
                  <View>
                    <BlurView
                      intensity={70}
                      tint="default"
                      style={{
                        // backgroundColor: "rgba(0, 0, 0, 0.8)",

                        borderRadius: 30,
                        width: 350,
                        height: 100,
                        marginTop: 5,
                        overflow: "hidden",
                      }}
                      // className="-mt-4 pt-6 overflow-hidden "
                    >
                      <Text className="text-white text-left px-4 mt-2">
                        {event?.description}
                      </Text>
                    </BlurView>
                  </View>
                  <View className="flex-ro rounded-lg  shadow-2xl mt-3 ">
                    <Text className="text-white text-lg text-center">
                      Attendees
                    </Text>
                    {event?.attendees?.length > 0 ? (
                      event?.attendees?.map((attendee, index) => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(
                              ROUTES.APPROUTES.USERS_EVENT_LIST,
                              {
                                attendees: event?.attendees,
                              }
                            );
                          }}
                        >
                          <View
                            style={
                              {
                                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                                // borderRadius: 15,
                              }
                            }
                            className="justify-center items-center  flex-row"
                            key={index}
                          >
                            <Ionicons name="people" size={24} color="#FF1D61" />
                            <Text className="p-2 text-lg text-center mx-2 justify-center text-white font-bold">
                              {event?.attendees?.length}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <View
                        style={
                          {
                            // backgroundColor: "rgba(0, 0, 0, 0.1)",
                            // borderRadius: 15,
                          }
                        }
                        className="justify-center items-center my-2"
                      >
                        <Text className="text-center mx-2 text-white p-2">
                          No attendees yet!
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
                <TouchableOpacity onPress={toggleRSVP}>
                  {eventDateIsFuture && (
                    <View
                      style={{
                        backgroundColor: userHasRSVPd ? "#FC6F99" : "#FF1D61",
                      }}
                      className={` rounded-full w-72 shadow-lg shadow-gray-900 z-50  mb-10 ${
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
          </ImageBackground>
        </View>
        <Toast config={toastConfig} />
      </ScrollView>
    </ImageBackground>
  );
};

export default EventDetails;
