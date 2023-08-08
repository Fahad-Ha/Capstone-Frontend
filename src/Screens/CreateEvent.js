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
  const { mutate: createEventFun } = useMutation({
    mutationFn: () =>
      createEvent({
        ...data,
        location: {
          latitude: location?.location?.latitude,
          longitude: location?.location?.longitude,
        },
      }),
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
    navigation.navigate("SelectLocationMap"); // Navigate to Map screen
  };
  const handleSubmit = () => {
    createEventFun();
  };
  return (
    <SafeAreaView className="flex-1 bg-red-200 justify-center items-center">
      <View>
        <ScrollView className="bg-red-500 ">
          <View style={styles.container} className="flex-1 p-2 bg-green-300">
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
            <Text style={styles.label} className="bg-red-200">
              Choose an Image to Represent Your Event
            </Text>
            <ImagePickerC
              image={image}
              setImage={setImage}
              height={100}
              width={100}
              className="max-h-52 rounded-xl overflow-hidden"
              style={styles.image}
              onImagePicked={(imageUri) =>
                setData({ ...data, image: imageUri })
              }
            >
              <View
                className="my-2 bg-gray-300 h-full"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "grey" }}>
                  Tap to select a event image
                </Text>
              </View>
            </ImagePickerC>

            <Create data={data} setData={setData} setErrorText={setErrorText} />
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            <View>
              <TouchableOpacity
                className="bg-red-500 rounded"
                style={styles.buttonContainer}
                onPress={handleSubmit}
              >
                <Text
                  className="text-white text-lg text-center py-4"
                  style={styles.buttonText}
                >
                  Create event
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  locationText: {
    fontSize: 16,
    color: "black",
  },
});
