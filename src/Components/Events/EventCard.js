import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../apis/index";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/index";

const EventCard = ({ event = {} }) => {
  const navigation = useNavigation();
  console.log(event?.organizer);
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.HEDERROUTES.OHERPROFILES, {
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
          navigation.navigate(ROUTES.HEDERROUTES.TRIPDETAILS, {
            _id: event._id,
          });
        }}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: `${BASE_URL}/${event.eventImage}` }}
            style={styles.image}
          />
          <Text style={styles.name}>{event.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 26,
    height: 400,
    margin: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // optional, you can set the background of the name to be slightly transparent
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

export default EventCard;
