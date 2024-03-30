import { useLocalSearchParams } from "expo-router";
import { View, Text } from "../components/Themed";

const EventDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    return(
        <View>
            <Text>Event Details Screen : {id}</Text>
        </View>
    );
};

export default EventDetailsScreen;