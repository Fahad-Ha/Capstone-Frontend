import {
  Button,
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
      location?.location.latitude,
      location?.location.longitude,
    ],
    queryFn: () =>
      getLocationAddress(
        location?.location.longitude,
        location?.location.latitude
      ),
    enabled: !!location,
  });
  const { mutate: createEventFun } = useMutation({
    mutationFn: () =>
      createEvent({
        ...data,
        location: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
      }),
    onSuccess: () => {
      setData({});
      setImage(null);
      setLocation(null);
      queryClient.invalidateQueries(["events"]);
    },
  });
  useEffect(() => {
    if (route.params?.location) {
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
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
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
              style={styles.image}
              onImagePicked={(imageUri) =>
                setData({ ...data, image: imageUri })
              }
            >
              <View
                style={{
                  flex: 1,
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
                style={styles.buttonContainer}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Create event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
