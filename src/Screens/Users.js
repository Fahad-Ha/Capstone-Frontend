import React, { useContext } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis/auth";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../Navigation";

const Users = () => {
  const { data } = useQuery(["users"], getAllUsers);
  const navigation = useNavigation();
  const { setUser, user: me } = useContext(UserContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Direct Messages</Text>
      <View style={styles.usersContainer}>
        {data?.map((user) => {
          if (user.username === me.username) {
            return null;
          }
          return (
            <Pressable
              style={styles.userCard}
              key={user._id}
              onPress={() => {
                navigation.navigate(ROUTES.APPROUTES.DIRECT_MSGLIST, {
                  user: user,
                });
              }}
            >
              <Image source={user.image} style={styles.profilePicture} />
              <Text style={styles.username}>{user.username}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        title="LOGOUT"
        onPress={() => {
          removeToken();
          setUser(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
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
    marginBottom: 30,
  },
  usersContainer: {
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#222",
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

    color: "#fff",
    fontFamily: "System", // Replace with the actual custom font
  },
});

export default Users;
