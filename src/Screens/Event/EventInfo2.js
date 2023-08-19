import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { getLocationAddress } from "../../apis/location";
import { useQuery } from "@tanstack/react-query";
import HomeB from "../../../assets/BGL1.png";
import homeB from "../../../assets/BGL.png";
import { Blur } from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EventInfo2 = ({ route, navigation }) => {
  const { data: data1 } = route.params;
  const [data, setData] = useState({ ...data1 });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0, 0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFromPickerVisible, setFromPickerVisibility] = useState(false);
  const [isToPickerVisible, setToPickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());
  const [location, setLocation] = useState(route.params?.location || null);

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

  useEffect(() => {
    if (route.params?.location?.location) {
      setLocation(route.params.location);
      setData({ ...data, ...route.params.location });
    }
  }, [route.params?.location]);

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocationMap"); // Specify the screen name here
  };
  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setData({ ...data, date: currentDate });

    if (Platform.OS === "android") {
      setDatePickerVisibility(false); // Close the date picker
    }
  };
  const handleNextPage = () => {
    navigation.navigate("Add Event 3", { data });
  };

  const handleFromTimeChange = (event, selected) => {
    const selectedTime = selected || selectedFromTime;
    setSelectedFromTime(selectedTime);
    const formattedTime = moment(selectedTime).format("HH:mm:ss");
    const isoFormattedTime =
      moment(selectedDate).format("YYYY-MM-DD") + "T" + formattedTime;
    setData({
      ...data,
      from: isoFormattedTime,
    });

    if (Platform.OS === "android") {
      setFromPickerVisibility(false); // Close the from time picker
    }
  };

  const handleToTimeChange = (event, selected) => {
    const selectedTime = selected || selectedToTime;
    setSelectedToTime(selectedTime);
    const formattedTime = moment(selectedTime).format("HH:mm:ss");
    const isoFormattedTime =
      moment(selectedDate).format("YYYY-MM-DD") + "T" + formattedTime;
    setData({
      ...data,
      to: isoFormattedTime,
    });

    if (Platform.OS === "android") {
      setToPickerVisibility(false); // Close the to time picker
    }
  };

  const openDatePickHandler = () => {
    if (Platform.OS === "android") {
      setDatePickerVisibility(true);
    }
  };

  const openFromPickHandler = () => {
    if (Platform.OS === "android") {
      setFromPickerVisibility(true);
    }
  };
  const openToPickHandler = () => {
    if (Platform.OS === "android") {
      setToPickerVisibility(true);
    }
  };

  return (
    <ImageBackground source={homeB} style={{ flex: 1 }}>
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
          flex: 1,

          marginLeft: 50,
          marginRight: 50,
          marginTop: 120,
          borderRadius: 30,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "rgba(232, 232, 232, 0.30)",
        }}
      >
        <TouchableOpacity onPress={handleSelectLocation}>
          {location ? (
            <>
              <Text className="text-white text-lg">
                Country: {locationDetails?.countryName}
              </Text>
              <Text className="text-white text-lg">
                City: {locationDetails?.city}
              </Text>
            </>
          ) : (
            <Entypo name="location" size={44} color="#FF005C" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            marginTop: 30,
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Date
        </Text>
        <Text style={{ color: "white", marginTop: 0, marginBottom: 20 }}>
          {moment(selectedDate).format("YYYY-MM-DD")}
        </Text>
        <BlurView
          intensity={100}
          tint="default"
          style={{
            backgroundColor: "rgba(0, 0, 0)",
            borderColor: "rgba(100, 0, 0, 0.3)",
            marginBottom: 20,
            width: 300,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          className=" overflow-hidden"
        >
          <Pressable onPress={() => openDatePickHandler()}>
            <Text
              style={{
                padding: hp(1.75),
                width: wp(60),
                fontSize: hp(2.4),
                borderRadius: 15,
                marginTop: hp(3),
                marginHorizontal: wp(10),
                paddingHorizontal: wp(3),
                color: "white",
                justifyContent: "center",
                textAlign: "center", // Center the text
              }}
            >
              test
            </Text>
          </Pressable>

          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour={true}
              textColor="white"
              minimumDate={tomorrow}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </BlurView>
        <Text style={{ color: "white", fontSize: 20 }}>From</Text>
        <Text style={{ color: "white", fontSize: 15 }}>
          {moment(selectedFromTime).format("h:mm A")}
        </Text>
        <BlurView
          intensity={50}
          tint="default"
          style={{
            backgroundColor: "rgba(0, 0, 0)",
            borderColor: "rgba(100, 0, 0, 0.3)",
            marginBottom: 20,
            width: 300,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          className=" overflow-hidden"
        >
          <Pressable onPress={() => openFromPickHandler()}>
            <Text
              style={{
                padding: hp(1.75),
                width: wp(60),
                fontSize: hp(2.4),
                borderRadius: 15,
                marginTop: hp(3),
                marginHorizontal: wp(10),
                paddingHorizontal: wp(3),
                color: "white",
                justifyContent: "center",
                textAlign: "center", // Center the text
              }}
            >
              From
            </Text>
          </Pressable>
          {isFromPickerVisible && (
            <DateTimePicker
              value={selectedFromTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleFromTimeChange}
            />
          )}
        </BlurView>
        <Text style={{ color: "white", fontSize: 20 }}>To</Text>
        <Text style={{ color: "white", fontSize: 15 }}>
          {moment(selectedToTime).format("h:mm A")}
        </Text>
        <BlurView
          intensity={100}
          tint="default"
          style={{
            backgroundColor: "rgba(0, 0, 0)",
            borderColor: "rgba(100, 0, 0, 0.3)",
            marginBottom: 20,
            width: 300,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          className=" overflow-hidden"
        >
          <Pressable onPress={() => openToPickHandler()}>
            <Text
              style={{
                padding: hp(1.75),
                width: wp(60),
                fontSize: hp(2.4),
                borderRadius: 15,
                marginTop: hp(3),
                marginHorizontal: wp(10),
                paddingHorizontal: wp(3),
                color: "white",
                justifyContent: "center",
                textAlign: "center", // Center the text
              }}
            >
              To
            </Text>
          </Pressable>
          {isToPickerVisible && (
            <DateTimePicker
              value={selectedToTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleToTimeChange}
            />
          )}
        </BlurView>
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
          onPress={handleNextPage}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EventInfo2;
