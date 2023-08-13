import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Button,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";

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
    <View style={styles.container}>
      <Text style={styles.label}>Event name</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#A9A9A9"
        value={data.name}
        onChangeText={(value) => setData({ ...data, name: value })}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#A9A9A9"
        value={data.price}
        onChangeText={(value) => setData({ ...data, price: value })}
      />
      <Text style={styles.label}>Date</Text>
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
          <Text>{selectedDate}</Text>
          <Button title="Select Date" onPress={openDatePickHandler} />
        </>
      )}
      <Text style={styles.label}>From</Text>
      <Text>{moment(selectedFromTime).format("h:mm A")}</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedDate}
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
      <Text style={styles.label}>From</Text>
      <Text>{moment(selectedFromTime).format("h:mm A")}</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedDate}
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
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 45,
    width: 360,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#F8F8F8",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default Create;
