import React, { useState, useEffect } from "react";
import { Text, View, Platform, Button, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { getLocationAddress } from "../../apis/location";
import { useQuery } from "@tanstack/react-query";

const EventInfo2 = ({ route, navigation }) => {
  const { data: data1 } = route.params;
  const [data, setData] = useState({ ...data1 });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0, 0);
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
      console.log(
        "HERE WE ARE SETTING LOCATION",
        `
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      `,
        { ...route.params.location }
      );
    }
  }, [route.params?.location]);

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocationMap"); // Specify the screen name here
  };
  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setData({ ...data, date: currentDate });
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
  };

  const openDatePickHandler = () => {
    DateTimePickerAndroid.open({
      mode: "date",
      value: selectedDate,
      minimumDate: tomorrow,
      onChange: (event, newDate) => {
        setSelectedDate(newDate);
      },
    });
  };
  const openFromPickHandler = () => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: selectedDate,
      is24Hour: false,
      onChange: (event, from) => {
        setSelectedFromTime(from);
      },
    });
  };
  const openToPickHandler = () => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: selectedDate,
      is24Hour: false,
      onChange: (event, to) => {
        setSelectedToTime(to);
      },
    });
  };
  console.log(data);
  return (
    <View className="p-15">
      <View className="border border-gray-300 p-8 rounded-8 mb-16">
        <TouchableOpacity onPress={handleSelectLocation}>
          {location ? (
            <>
              <Text className="text-black text-lg">
                Country: {locationDetails?.countryName}
              </Text>
              <Text className="text-black text-lg">
                City: {locationDetails?.city}
              </Text>
            </>
          ) : (
            <Text className="text-blue-500 text-base">Select Location</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold mb-5">Date</Text>
      <Text>{moment(selectedDate).format("YYYY-MM-DD")}</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          minimumDate={tomorrow}
          display="default"
          onChange={handleDateChange}
        />
      ) : (
        <>
          <Button title="Select Date" onPress={openDatePickHandler} />
        </>
      )}

      <Text className="text-lg font-bold mb-5">From</Text>
      <Text>{moment(selectedFromTime).format("h:mm A")}</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedFromTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleFromTimeChange}
        />
      ) : (
        <>
          <Button title="Select From" onPress={openFromPickHandler} />
        </>
      )}

      <Text className="text-lg font-bold mb-5">To</Text>
      <Text>{moment(selectedToTime).format("h:mm A")}</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedToTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleToTimeChange}
        />
      ) : (
        <>
          <Button title="Select To" onPress={openToPickHandler} />
        </>
      )}
      <View className="p-15">
        <Button title="Next" onPress={handleNextPage} />
      </View>
    </View>
  );
};

export default EventInfo2;
