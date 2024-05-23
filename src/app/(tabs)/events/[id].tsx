import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { StyleSheet, Image, FlatList, Button } from "react-native";
import events from "@/assets/data/events";
import Colors from '@/src/constants/Colors';
import { Event } from "@/src/types";
import { useState } from "react";

const addToParticipants = (event: Event) => {
    event.participants.push("Loic");
}
const remofreFromParticipants = (event: Event) => {
    const index = event.participants.indexOf("Loic");
    event.participants.splice(index);
}

const EventDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const event = events.find((e) => e.id.toString() === id)
    if (!event)
        return <Text>Event not found</Text>
    const isParticiping = (event.participants.indexOf("Loic") > -1);
    const [refreshList, setRefreshList] = useState(isParticiping);
    return(
        <View style={styles.parent}>
            <Stack.Screen options={{ title: event.name}} />
            <Image style={styles.image} source={event.image} />
            <Text style={styles.date}>Date : {event.date}</Text>         
            {event.participants.length > 0 && (
              <>
                <Text style={styles.text}>Participants :</Text>
                <FlatList
                    data={event.participants}
                    renderItem={({ item }) => <Text style={styles.list}>{`\u2022 ${item}`}</Text>}
                    extraData={refreshList} 
                />
                <View style={styles.buttons}>
                    <Button onPress={() => {addToParticipants(event); setRefreshList(true)}} title="Je participe" disabled={refreshList}/>
                    <Button onPress={() => {remofreFromParticipants(event); setRefreshList(false)}} title="Je participe plus" disabled={!refreshList}/>
                </View>
              </>
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        flexGrow: 1,
    },
    image: {
        height: 200,
        display: 'flex',
        alignContent: 'stretch',
    },
    date: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        fontSize: 16,
    },
    list: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "500",
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
});

export default EventDetailsScreen;