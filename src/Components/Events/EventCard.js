import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/index";
import { BlurView } from "expo-blur";
import fuel from "../../../assets/pxfuel.jpg";
import * as Location from "expo-location";


const EventCard = ({ event = {} }) => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);

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
            <Text style={styles.name}>{event.name}</Text>
            <Text style={styles.distance}>{calculateDistance()}</Text>
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
    position: "absolute",
    bottom: 0,
    color: "white",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  distance: {
    fontSize: 16,
    color: "white",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

export default EventCard;
