import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import ImageHandler from "../../Components/Shared/ImagePickerC";
import { useTheme } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import ROUTES from "../../Navigation";

const RegisterImageBirthdate = ({ route, navigation }) => {
  const { username, email, password } = route.params;
  console.log("username", username, email);
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({
    username: username,
    email: email,
    password: password,
    image: null,
  });

  const theme = useTheme();
  const handleNext = () => {
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER.INTERESTS, { data: data });
  };
  const handleDate = (date) => {
    setStartDate(date);
    setData({ ...data, dateOfBirth: date });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText2}>Step 2 out of 3</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pick an image</Text>
          <Text style={styles.subHeaderText}>
            Pick an image for your new account.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <ImageHandler
            image={image}
            setImage={setImage}
            onImagePicked={(imageUri) => setData({ ...data, image: imageUri })}
            style={styles.imageStyle}
          />

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Date of Birth</Text>
            <Text style={styles.subHeaderText}>Choose your date of birth</Text>
          </View>

          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={handleDate}
              width={250}
              height={250}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterImageBirthdate;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#1E1E1E",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 16,
    width: "85%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FAFAFA",
    marginBottom: 8,
  },
  headerText2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FAFAFA",
    marginBottom: 8,
    textAlign: "left",
  },
  subHeaderText: {
    fontSize: 14,
    textAlign: "center",
    color: "#FAFAFA",
    marginBottom: 15,
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 40,
  },
  calendarContainer: {
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FAFAFA",
    borderRadius: 8,
    padding: 5,
  },
  buttonContainer: {
    width: "85%",
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: "7.5%",
    marginBottom: 10,
  },
});
