import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Picker,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import ImageHandler from "../../Components/Shared/ImagePickerC";
import { useNavigation, useTheme } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import ROUTES from "../../Navigation";
import bgLogin from "../../../assets/BGL1.png";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const RegisterImageBirthdate = ({ route, navigation }) => {
  const { username, email, password } = route.params;
  console.log("username", username, email);
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [data, setData] = useState({
    username: username,
    email: email,
    password: password,
    image: image,
  });
  const navigate = useNavigation();
  console.log(data);
  const theme = useTheme();
  const handleNext = () => {
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER.INTERESTS, {
      data: JSON.stringify(data),
    });
  };
  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setData({ ...data, dateOfBirth: currentDate });

    if (Platform.OS === "android") {
      setDatePickerVisibility(false); // Close the date picker
    }
  };
  // const openDatePickHandler = () => {
  //   DateTimePickerAndroid.open({
  //     mode: "date",
  //     value: selectedDate,
  //     maximumDate: new Date(),
  //     onChange: (event, newDate) => {
  //       setSelectedDate(newDate);
  //     },
  //   });
  // };
  const openDatePickHandler = () => {
    if (Platform.OS === "android") {
      setDatePickerVisibility(true);
    }
  };

  return (
    <ImageBackground source={bgLogin} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity className="absolute  top-10 left-1 rounded-full shadow p-2">
          <View className="flex-row items-center ">
            <Feather
              name="arrow-left"
              size={32}
              color={"white"}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableOpacity>
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
            {/* <CalendarPicker
              onDateChange={handleDate}
              width={250}
              height={250}
            /> */}
            {/* <Text style={{ color: "white" }}>
              {moment(selectedDate).format("YYYY-MM-DD")}
            </Text> */}
            <BlurView
              intensity={70}
              tint="light"
              style={{
                backgroundColor: "rgba(0, 0, 0)",
                borderColor: "rgba(100, 0, 0, 0.3)",
                flex: 1,
                width: 300,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              className=" overflow-hidden"
            >
              <DateTimePicker
                value={selectedDate}
                mode="date"
                is24Hour={true}
                color={"white"}
                maximumDate={new Date()}
                onChange={handleDateChange}
                textAlign={"center"}
              />
            </BlurView>
          </View>
        </View>

        <Pressable onPress={handleNext}>
          <View
            style={{
              backgroundColor: "#FF005C",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              width: 200,
              height: 50,
              borderRadius: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>NEXT</Text>
          </View>
        </Pressable>
      </ScrollView>
    </ImageBackground>
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

    marginBottom: 8,
    marginTop: 15,
    color: "white",
  },
  headerText2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "left",
    marginTop: 80,
  },
  subHeaderText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
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
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 40,
  },
  calendarContainer: {
    width: 300,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    borderColor: "white",
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
