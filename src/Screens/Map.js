import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Map = ({ route, navigation }) => {
  const { latitude, longitude, title } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
