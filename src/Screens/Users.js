import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis/auth";
import { removeToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const Users = () => {
  const { data } = useQuery(["users"], getAllUsers);
  const navigation = useNavigation();
  const { setUser, user: me } = useContext(UserContext);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        {data?.map((user) => {
          console.log(user.username, me.username);
          if (user.username == me.username) {
            return null;
          }
          return (
            <Pressable
              key={user._id}
              onPress={() => {
                navigation.navigate("Chat", {
                  user: user,
                });
              }}
            >
              <Text>{user.username}</Text>
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
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
