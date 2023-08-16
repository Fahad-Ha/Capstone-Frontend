import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../apis/event";
import { getAllTags } from "../../apis/tags";
import ROUTES from "../../Navigation";
import bgLogin from "../../../assets/BGL1.png";
import { Feather } from "@expo/vector-icons";

const ITEMS_PER_PAGE = 10;
const EvenInfo3 = ({ route, navigation }) => {
  const { data: data2 } = route.params;
  const [data, setData] = useState({ ...data2 });
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState([]);
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags(),
  });
  console.log({ data2 });
  const { mutate: createEventFun, isLoading: isCreatingEvent } = useMutation({
    mutationFn: async () => {
      return createEvent({
        ...data,
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
        tags: selectedTags,
      });
    },
    onSuccess: () => {
      setData({});
      // setImage(null);
      // setLocation(null);
      setSelectedTags([]);
      queryClient.invalidateQueries(["events"]);
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
    },
  });
  const handleSubmit = () => {
    createEventFun();
    console.log(selectedTags);
  };
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const sortedTags = tags?.sort((a, b) => a.name.localeCompare(b.name));

  const paginatedTags = sortedTags?.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tags?.length / ITEMS_PER_PAGE)) {
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute  top-10 left-1 rounded-full shadow p-2"
      >
        <View className="flex-row items-center ">
          <Feather name="arrow-left" size={32} color={"white"} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
          marginBottom: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>
          Select your INTERESTS:
        </Text>
      </View>
      <View
        style={{
          flex: 0.8,
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
                  selectedTags.includes(item._id)
                    ? (() => {
                        setSelectedTags(
                          selectedTags.filter((id) => id !== item._id)
                        );

                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Error
                        );
                      })()
                    : (() => {
                        setSelectedTags([...selectedTags, item._id]);
                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Success
                        );
                      })();

                  console.log({ ...data, tags: selectedTags });
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

                    backgroundColor: selectedTags.includes(item._id)
                      ? "#FC6F99"
                      : "rgba(0, 0,0, 0.3)",
                    height: 70,
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
            <Text style={styles.paginationButtonText}>Prev Tags</Text>
          </TouchableOpacity>
        )}

        {currentPage < Math.ceil(tags?.length / ITEMS_PER_PAGE) && (
          <TouchableOpacity
            onPress={handleNextPage}
            style={[styles.paginationButton, { backgroundColor: "#FF005C" }]}
          >
            <Text style={styles.paginationButtonText}>Next Tags</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FF005C",
          marginLeft: "auto",
          marginRight: "auto",
          width: 200,
          height: 50,
          marginTop: 80,
          borderRadius: 10,
          bottom: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleSubmit}
        disabled={isCreatingEvent}
      >
        <Text className="text-white text-lg">
          {isCreatingEvent ? "Creating Event..." : "Create Event"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 100,
  },
  paginationButton: {
    paddingVertical: 10,
    marginBottom: 80,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  paginationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default EvenInfo3;
