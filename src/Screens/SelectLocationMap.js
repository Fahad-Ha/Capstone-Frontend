import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      navigation.navigate(ROUTES.APPROUTES.ADD_EVENT, {
        location: {
          location: selectedLocation,
        },
      });
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
      <TouchableOpacity
        onPressOut={() => handleConfirmLocation()}
        style={{
          opacity: selectedLocation ? 100 : 0,
        }}
      >
        <View className="z-10 bottom-20 mb-5 p-5 rounded-2xl self-center bg-blue-900">
          <Text className="text-white text-base">Confirm Location</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SelectLocationMap;
