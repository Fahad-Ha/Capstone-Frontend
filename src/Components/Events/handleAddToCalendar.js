import { Platform, TouchableOpacity } from "react-native";

const handleAddToCalendar = () => {
  const formattedDate = moment(eventDate).toDate();
  const startDate = moment(formattedDate).toDate();
  const endDate = moment(formattedDate).add(1, "hour").toDate(); // Adjust end time as needed

  const eventConfig = {
    title: event.name,
    startDate,
    endDate,
  };

  if (Platform.OS === "ios") {
    CalendarEvents.presentEventCreatingDialog(eventConfig)
      .then((eventInfo) => {
        console.log("Event added to iOS Calendar", eventInfo);
      })
      .catch((error) => {
        console.warn("Error adding event to iOS Calendar", error);
      });
  } else if (Platform.OS === "android") {
    CalendarEvents.createEvent(eventConfig)
      .then((eventId) => {
        console.log("Event added to Android Calendar with ID:", eventId);
      })
      .catch((error) => {
        console.warn("Error adding event to Android Calendar", error);
      });
  }
};
