import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../apis/index";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/index";
import { BlurView } from "expo-blur";
import fuel from "../../../assets/pxfuel.jpg";
import Rectangle from "../../../assets/Rectangle.png";

const EventCardSuggestions = ({ event = {} }) => {
  const navigation = useNavigation();
  return (
    <View
      // intensity={80}
      // // tint="dark"
      // className="rounded-3xl overflow-hidden"
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.APPROUTES.OTHERPROFILE, {
            _id: event.organizer,
          });
        }}
      >
        <Text style={styles.name}>
          {event.organizer ? event.organizer.username : "Default User"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.APPROUTES.EVENT_DETAILS, {
            _id: event._id,
            event: event,
          });
        }}
      >
        <View>
          <Image
            // source={{ uri: `${BASE_URL}/${event.image}` }}
            source={fuel}
            style={styles.image}
          />

          <BlurView
            intensity={65}
            tint="default"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
              height: "30%", // 1/3 of the card height
              justifyContent: "flex-end",
            }}
          >
            {/* <View style={{ flex: 1, backgroundColor: "red" }}> */}
            <Text style={styles.name}>{event.name}</Text>
            {/* </View> */}
          </BlurView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "rgba(156,163,175, 0.1)",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 75,
    shadowColor: "white",
    height: 350,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",

    position: "relative",
  },
  // name: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    // backgroundColor: "rgba(255, 255, 255, 0.7)", // optional, you can set the background of the name to be slightly transparent
    bottom: 0,
    color: "white",
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

export default EventCardSuggestions;
