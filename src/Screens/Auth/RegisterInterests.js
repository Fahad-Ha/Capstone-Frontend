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
  ImageBackground,
} from "react-native";
import { getAllTags } from "../../apis/tags";
import * as Haptics from "expo-haptics";
import { register } from "../../apis/auth";
import { saveToken } from "../../apis/auth/storage";
import UserContext from "../../context/UserContext";
import ROUTES from "../../Navigation";
import useNotifications from "../../hooks/useNotifications";
import jwt_decode from "jwt-decode";
import bgLogin from "../../../assets/BGL1.png";
import { Feather } from "@expo/vector-icons";

const ITEMS_PER_PAGE = 10;
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
      const user = jwt_decode(data.token);
      saveToken(data.token);
      setUser(user);
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

  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name));

  const paginatedTags = sortedTags.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tags.length / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ImageBackground source={bgLogin} style={{ flex: 1 }}>
      <TouchableOpacity className="absolute  top-10 left-1 rounded-full shadow p-2">
        <View className="flex-row items-center ">
          <Feather
            name="arrow-left"
            size={32}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 200,
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>
            Select your INTERESTS:
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
          }}
        >
          <FlatList
            data={paginatedTags}
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
                    marginBottom: 10,
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
                      borderRadius: 10,

                      backgroundColor: selectedIntres.includes(item._id)
                        ? "#FC6F99"
                        : "rgba(0, 0,0, 0.3)",
                      height: 40,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {" "}
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Pagination Buttons */}
        <View style={styles.paginationContainer}>
          {currentPage > 1 && (
            <TouchableOpacity
              onPress={handlePrevPage}
              style={[styles.paginationButton, { backgroundColor: "#FF005C" }]}
            >
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
          )}

          {currentPage < Math.ceil(tags.length / ITEMS_PER_PAGE) && (
            <TouchableOpacity
              onPress={handleNextPage}
              style={[styles.paginationButton, { backgroundColor: "#FF005C" }]}
            >
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        <Pressable onPress={handleRegister}>
          <View
            style={{
              backgroundColor: "#FF005C",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 50,
              width: 200,
              height: 50,
              borderRadius: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>REGISTER</Text>
          </View>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default RegisterInterests;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 100,
  },
  paginationButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  paginationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
