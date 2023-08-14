import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { getAllTags } from "../../apis/tags";
import * as Haptics from "expo-haptics";
import { register } from "../../apis/auth";
import { saveToken } from "../../apis/auth/storage";
import UserContext from "../../context/UserContext";
import ROUTES from "../../Navigation";
import useNotifications from "../../hooks/useNotifications";

const RegisterInterests = ({ route, navigation }) => {
  const { data } = route.params;
  // data = {{.}}
  // console.log("JSON.parse(data.dateOfBirth)", JSON.parse(data.dateOfBirth));
  const [selectedIntres, setSelectedIntres] = useState([]);

  const expoToken = useNotifications();

  const { setUser } = useContext(UserContext);
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags(),
  });
  const {
    mutate: RegisterFn,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => {
      return register({
        ...JSON.parse(data),
        // dateOfBirth: JSON.parse(data.dateOfBirth),
        interests: selectedIntres,
      });
    },
    onSuccess: (data) => {
      saveToken(data.token);
      setUser(true);
      navigation.navigate(ROUTES.APPROUTES.LOCATION_NAVIGATION);
    },
    onError: (err) => {
      console.log("========>", err);
    },
  });
  const handleRegister = () => {
    console.log({ ...data, interests: selectedIntres });
    RegisterFn();
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Select your INTERESTS</Text>
      </View>
      <View
        style={{
          flex: 0.7,
        }}
      >
        <FlatList
          data={tags}
          numColumns={2}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  selectedIntres.includes(item._id)
                    ? (() => {
                        setSelectedIntres(
                          selectedIntres.filter((id) => id !== item._id)
                        );

                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Error
                        );
                      })()
                    : (() => {
                        setSelectedIntres([...selectedIntres, item._id]);
                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Success
                        );
                      })();

                  console.log({ ...data, interests: selectedIntres });
                }}
                style={{
                  flex: 1,

                  width: "100%",
                  marginBottom: 5,
                  marginHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    paddingHorizontal: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 12,
                    backgroundColor: selectedIntres.includes(item._id)
                      ? "green"
                      : "gray",
                    height: 40,
                  }}
                >
                  <Text> {item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View
        style={{
          flex: 0.2,
        }}
      >
        <Button title="Register" onPress={handleRegister}></Button>
      </View>
    </View>
  );
};

export default RegisterInterests;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
