import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { StyleSheet, Image, FlatList } from "react-native";
import events from "@/assets/data/events";
import Colors from '@/src/constants/Colors';

const EventDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const event = events.find((e) => e.id.toString() === id)
    if (!event)
        return <Text>Event not found</Text>
    return(
        <View>
            <Stack.Screen options={{ title: event.name}} />
            <Image style={styles.image} source={event.image} />
            <Text style={styles.date}>Date : {event.date}</Text>         
            {event.participants.length > 0 && (
              <>
                <Text>Participants :</Text>
                <FlatList
                    data={event.participants}
                    renderItem={({ item }) => <Text>{item}</Text>} 
                />
              </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        display: 'flex',
        alignContent: 'stretch',
    },
    date: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});

export default EventDetailsScreen;