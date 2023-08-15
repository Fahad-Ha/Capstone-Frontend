import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import homeB from "../../assets/BGL1.png";
import ImageHandler from "../Components/Shared/ImagePickerC";
import { BASE_URL } from "../apis";
import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../apis/tags";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const EditProfileScreen = ({ route, navigation }) => {
  const [editedName, setEditedName] = useState(route.params.currentName);

  // const [image, setImage] = useState(
  //   "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  // );
  const { image } = route.params;
  const [selectedIntres, setSelectedIntres] = useState([]);

  const handleSave = () => {
    // Implement logic to save the edited name (API call, storage, etc.)
    // For example:
    // saveEditedNameAPI(editedName);
    navigation.goBack(); // Navigate back to the profile screen
  };
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags(),
  });
  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;

  const sortedTags = tags?.sort((a, b) => a.name.localeCompare(b.name));

  const paginatedTags = sortedTags?.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  console.log("t", image);
  return (
    <ImageBackground source={homeB} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container} className="mt-24">
          <Text style={styles.label}>Edit Name:</Text>
          <TextInput
            placeholderTextColor={"rgba(256,256,256, 0.5)"}
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder={editedName}
          />
          {/* Placeholder for another component */}
          <View />
          <View
            style={styles.imageContainer}
            className="rounded-3xl overflow-hidden"
          >
            <ImageHandler
              image={`${BASE_URL}/${image}`}
              style={styles.imageStyle}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Edit Image</Text>
            </View>
          </View>
        </View>
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
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10%",
            }}
          >
            <Text style={{ color: "white", fontSize: 17 }}>
              Select your INTERESTS:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
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

                      console.log({ interests: selectedIntres });
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
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <Pressable>
          <View
            style={{
              backgroundColor: "#FF005C",
              marginLeft: "auto",
              marginRight: "auto",
              width: 200,
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20%",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Update Profile
            </Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "white",
    backgroundColor: "rgba(232, 232, 232, 0.40)",
    textAlign: "left",
    height: 45,
    borderRadius: 10,
    marginTop: 15,
    color: "white",
  },
  imageContainer: {
    width: "100%",
    marginVertical: 40,
  },
  imageStyle: {
    width: "100%",
    height: 140,
    borderRadius: 15,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none", // Allow touch events to pass through
  },
  overlayText: {
    color: "white",
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    fontWeight: "bold",
    borderRadius: 30,
    padding: 10,
  },
});

export default EditProfileScreen;
