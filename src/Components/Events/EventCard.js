import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/index";
import { BlurView } from "expo-blur";
import fuel from "../../../assets/pxfuel.jpg";
import Rectangle from "../../../assets/Rectangle.png";
import moment from "moment";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

const EventCard = ({ event = {} }) => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const formattedEventDate = `${moment(event.date).format(
    "ddd, MMM D"
  )}       ${moment(event.from).format("HH:mm")} - ${moment(event.to).format(
    "HH:mm"
  )}`;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } catch (error) {
        console.log("Error fetching location:", error);
      }
    })();
  }, []);

  const calculateDistance = () => {
    if (!userLocation || !event.location || !event.location.coordinates) {
      return "...";
    }

    const userLat = userLocation.latitude;
    const userLon = userLocation.longitude;
    const eventLat = event.location.coordinates[1];
    const eventLon = event.location.coordinates[0];

    const R = 6371; // Earth's radius in kilometers
    const dLat = (eventLat - userLat) * (Math.PI / 180);
    const dLon = (eventLon - userLon) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat * (Math.PI / 180)) *
        Math.cos(eventLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return `${distance.toFixed(2)} km`;
  };
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.APPROUTES.OTHERPROFILE, {
            _id: event.organizer,
          });
        }}
      >
        <Text style={styles.name}>
          {event.organizer ? event.organizer.username : "Default User"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.APPROUTES.EVENT_DETAILS, {
            _id: event._id,
            event: event,
          });
        }}
      >
        <View>
          <Image source={fuel} style={styles.image} />
          <BlurView
            intensity={65}
            tint="default"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
              height: "30%", // 1/3 of the card height
              justifyContent: "flex-end",
            }}
          >
            {/* <View style={{ flex: 1, backgroundColor: "red" }}> */}
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={styles.name}>{event.name}</Text>
              <View className="flex-1 relative">
                <FontAwesome
                  style={styles.gps}
                  name="map-marker"
                  size={20}
                  color="#FF1D61"
                />
                <Text style={styles.distance}>{calculateDistance()}</Text>
              </View>
              <Text style={styles.date}>
                {/* {moment(event.date).format("YYYY-MM-DD")} */}
                {formattedEventDate}
                {/* {event.date} */}
              </Text>
              {/* <Text style={{ fontSize: 15, color: "white" }}>
                {event.location}
              </Text> */}
            </View>
            {/* </View> */}
          </BlurView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 40,
    height: 280,
    borderRadius: 45,
    overflow: "hidden",
    margin: 20,
    backgroundColor: "rgba(156,163,175, 0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 40,
    position: "relative",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    paddingLeft: 30,
    // backgroundColor: "rgba(255, 255, 255, 0.7)", // optional, you can set the background of the name to be slightly transparent
    position: "absolute",
    bottom: 45,
    color: "white",
    left: 0,
    right: 0,
    textAlign: "left",
  },
  date: {
    fontSize: 17,
    // fontWeight: "bold",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    // backgroundColor: "rgba(255, 255, 255, 0.7)", // optional, you can set the background of the name to be slightly transparent
    position: "absolute",
    bottom: 20,
    color: "#ffff",
    left: 0,
    right: 0,
    textAlign: "right",
  },
  distance: {
    fontSize: 16,
    color: "white",
    padding: 10,
    position: "absolute",
    bottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    right: 0,
    textAlign: "left",
  },
  gps: {
    color: "#FF1D61",
    padding: 10,
    position: "absolute",
    bottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    right: 70,
  },
});

export default EventCard;
