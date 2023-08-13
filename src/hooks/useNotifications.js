import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../Navigation/index";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let token;
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;
    if (status !== "granted") {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      } catch (error) {
        console.log("erorr request getting permission", error);
      }
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "18032b8c-65a8-42c4-af6f-b2d370b67173",
    });

    console.log("Token:", token.data);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function useNotifications(notificationListener) {
  const [expoToken, setExpoToken] = useState("");

  const navigation = useNavigation();

  // when the app is started it will register the ExpoToken
  useEffect(() => {
    async function getToken() {
      const { data: token } = await registerForPushNotificationsAsync();
      setExpoToken(token);
    }
    getToken();
    // When the notification is sent
    const notificationReceivedListener =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log(notification);
        // setNotification(notification);
      });

    // When I click on the notification
    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { chatId, user } = response.notification.request.content.data;
        navigation.navigate(ROUTES.APPROUTES.DIRECT_MSG, {
          chatId,
          user,
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationReceivedListener
      );
      Notifications.removeNotificationSubscription(
        notificationResponseListener
      );
    };
  }, []);
  return expoToken;
}
