import React, { useContext } from "react";
import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis/auth";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../Navigation";
import { ActivityIndicator } from "react-native-paper";
import ProfileB from "../../assets/BGL2.png";
import { AntDesign, Feather } from "@expo/vector-icons";
import { BASE_URL } from "../apis";

const Users = ({ route }) => {
  const { data, isLoading } = useQuery(["users"], getAllUsers);
  const navigation = useNavigation();
  const { attendees } = route.params;

  const { setUser, user: me } = useContext(UserContext);
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="black"></ActivityIndicator>
      </View>
    );

  return (
    <ImageBackground source={ProfileB} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute  top-8 left-0 rounded-full shadow p-2"
        >
          <View className="flex-row items-center">
            <Feather name="arrow-left" size={32} color={"white"} />
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>Attendees List</Text>
        <View style={styles.usersContainer}>
          {attendees?.map((user) => {
            if (user._id === me._id) {
              // Don't render the Pressable for the current user
              return (
                <Pressable style={styles.userCard} key={user._id}>
                  <View
                    style={{
                      marginRight: "auto",
                      flexDirection: "row",
                      gap: 15,
                      justifyContent: "center",
                      alignContent: "center",
                      width: "85%",
                    }}
                  >
                    <Image
                      style={styles.profilePicture}
                      source={{
                        uri: `${BASE_URL}/${user?.image}`,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                      }}
                    ></View>
                    <Text
                      className="text-center mt-1.5 mr-16"
                      style={styles.username}
                    >
                      {user?.username}
                    </Text>
                  </View>
                </Pressable>
              );
            }

            return (
              <Pressable
                style={styles.userCard}
                key={user._id}
                onPress={() => {
                  navigation.navigate(ROUTES.APPROUTES.DIRECT_MSG, {
                    user: user,
                  });
                }}
              >
                <View
                  style={{
                    marginRight: "auto",
                    flexDirection: "row",
                    gap: 15,
                    justifyContent: "center",
                    alignContent: "center",
                    width: "85%",
                  }}
                >
                  <Image
                    style={styles.profilePicture}
                    source={{
                      uri: `${BASE_URL}/${user?.image}`,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  ></View>
                  <Text
                    className="text-center mt-1.5 mr-16"
                    style={styles.username}
                  >
                    {user?.username}
                  </Text>
                </View>
                <View>
                  <AntDesign name="right" size={24} color="#758DE2" />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1E1E1E",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    marginTop: 60,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 60,
  },
  usersContainer: {
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0,0, 0.8)",
    // backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,

    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System", // Replace with the actual custom font
  },
  noiseEffect: {
    backgroundColor: "yellow", // Change color for noise effect
    opacity: 40,
  },
});

export default Users;
