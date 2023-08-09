import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = ({ data, setData, setErrorText }) => {
  const handleTitleFocus = () => {
    setErrorText("");
  };

  const handleDescriptionFocus = () => {
    setErrorText("");
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setData({ ...data, date: currentDate });
    console.log(currentDate);
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
        onFocus={handleTitleFocus}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#A9A9A9"
        value={data.price}
        onChangeText={(value) => setData({ ...data, price: value })}
        onFocus={handleTitleFocus}
      />
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="#A9A9A9"
        value={selectedDate.toLocaleString()}
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
        onFocus={handleDescriptionFocus}
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
