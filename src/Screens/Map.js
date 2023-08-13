import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

const Map = ({ route }) => {
  const { latitude, longitude, title } = route.params;

  return (
    <View>
      <MapView
        className="w-full h-full"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
        />
      </MapView>
    </View>
  );
};

export default Map;
