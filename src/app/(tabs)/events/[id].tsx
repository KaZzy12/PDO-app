import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";

const EventDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    return(
        <View>
            <Stack.Screen options={{ title: 'Details : ' + id }} />
            <Text>Event Details Screen : {id}</Text>
        </View>
    );
};

export default EventDetailsScreen;