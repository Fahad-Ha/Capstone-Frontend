import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImagePickerC from "../Components/Shared/ImagePickerC";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../apis/event/index";
import Create from "../Components/Events/Create";
import ROUTES from "../Navigation/index";
import { getLocationAddress } from "../apis/location";

const CreateEvent = ({ navigation, route }) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(route.params?.location || null);
  const [errorText, setErrorText] = useState("");

  const { data: locationDetails } = useQuery({
    queryKey: [
      "location",
      location?.location?.latitude,
      location?.location?.longitude,
    ],
    queryFn: () =>
      getLocationAddress(
        location?.location?.longitude,
        location?.location?.latitude
      ),
    enabled: !!location,
  });

  const { mutate: createEventFun, isLoading: isCreatingEvent } = useMutation({
    mutationFn: async () => {
      return createEvent({
        ...data,
        location: {
          latitude: location?.location?.latitude,
          longitude: location?.location?.longitude,
        },
      });
    },
    onSuccess: () => {
      setData({});
      setImage(null);
      setLocation(null);
      queryClient.invalidateQueries(["events"]);
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
    },
  });

  useEffect(() => {
    if (route.params?.location?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocationMap");
  };

  const handleSubmit = () => {
    createEventFun();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.label}>Set Your Event Location</Text>
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={handleSelectLocation}>
            {location ? (
              <>
                <Text style={styles.locationText}>
                  Country: {locationDetails?.countryName}
                </Text>
                <Text style={styles.locationText}>
                  City: {locationDetails?.city}
                </Text>
              </>
            ) : (
              <Text style={styles.selectLocation}>Select Location</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>
          Choose an Image to Represent Your Event
        </Text>
        <ImagePickerC
          image={image}
          setImage={setImage}
          height={100}
          width={100}
          style={styles.image}
          onImagePicked={(imageUri) => setData({ ...data, image: imageUri })}
        >
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: "grey" }}>Tap to select an event image</Text>
          </View>
        </ImagePickerC>

        <Create data={data} setData={setData} setErrorText={setErrorText} />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit}
          disabled={isCreatingEvent}
        >
          <Text style={styles.buttonText}>
            {isCreatingEvent ? "Creating Event..." : "Create Event"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    padding: 16,
  },
  locationText: {
    fontSize: 16,
    color: "black",
  },
  image: {
    maxWidth: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    height: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  locationContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectLocation: {
    fontSize: 16,
    color: "blue",
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 60,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 8,
  },
});

export default CreateEvent;
