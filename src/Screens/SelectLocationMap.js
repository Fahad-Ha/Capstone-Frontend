import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import ROUTES from "../Navigation/index";

const SelectLocationMap = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onMapPress = (event) => {
    const location = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(location);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      navigation.navigate(ROUTES.HEDERROUTES.CREATE, {
        location: selectedLocation,
      }); // Return location to CreateTrip
    }
  };

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 29.3759,
          longitude: 47.9774,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onPress={onMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
        <Text style={styles.buttonText}>Confirm Location</Text>
      </TouchableOpacity>
    </>
  );
};

export default SelectLocationMap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "97%",
  },
  button: {
    backgroundColor: "darkblue",
    padding: 10,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    width: "66%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
