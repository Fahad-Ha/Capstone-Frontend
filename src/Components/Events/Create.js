import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Haptics from "expo-haptics";

const Create = ({ data, setData }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setData({ ...data, date: currentDate });
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

  return (
    <View className="p-15">
      <Text className="text-lg font-bold mb-5">Event name</Text>
      <TextInput
        className="h-12 w-72 border border-gray-300 rounded-md mb-3 px-4 text-lg text-gray-700 bg-gray-100"
        placeholder="Title"
        placeholderTextColor="#A9A9A9"
        value={data.name}
        onChangeText={(value) => setData({ ...data, name: value })}
      />
      <Text className="text-lg font-bold mb-5">Price</Text>
      <TextInput
        className="h-12 w-72 border border-gray-300 rounded-md mb-3 px-4 text-lg text-gray-700 bg-gray-100"
        placeholder="Price"
        placeholderTextColor="#A9A9A9"
        value={data.price}
        onChangeText={(value) => setData({ ...data, price: value })}
      />
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

      <Text className="text-lg font-bold mb-5">Description</Text>
      <TextInput
        className="h-48 w-72 border border-gray-300 rounded-md mb-3 px-4 text-lg text-gray-700 bg-gray-100"
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
      />
    </View>
  );
};

export default Create;
