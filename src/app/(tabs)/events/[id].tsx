import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { StyleSheet, Image, FlatList, Button, ActivityIndicator } from "react-native";
import Colors from '@/src/constants/Colors';
import { Event } from "@/src/types";
import { useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import { useEvent, useEventAttendees } from "@/src/api/events";

const EventDetailsScreen = () => {
    const [refreshList, setRefreshList] = useState(false);
    const { profile } = useAuth();
    if(!profile)
        return <Text>Issue with profile</Text>
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string'? idString : idString[0]);
    const { data: event, error: eventError, isLoading: isLoadingEvent } = useEvent(id);
    const { data: participants, error: eventAttendeeError, isLoading: isLoadingEventAttendee } = useEventAttendees(id);
    if(isLoadingEvent || isLoadingEventAttendee) {
        return <ActivityIndicator />
    }
    if(eventError || eventAttendeeError) {
        return <Text>Erreur lors de la récupération des events</Text>
    }
    if (!event)
        return <Text>Event not found</Text>
    const isParticiping = (participants.indexOf(profile.id) > -1);
    if(isParticiping) {
        setRefreshList(isParticiping);
    }
    
    const addToParticipants = (event: Event, profile:any) => {
        //participants.push(profile.full_name);
    }
    const removeFromParticipants = (event: Event, profile:any) => {
        const index = event.participants.indexOf(profile.full_name);
        //participants.splice(index);
    }

    return(
        <View style={styles.parent}>
            <Stack.Screen options={{ title: event.name}} />
            <Image style={styles.image} source={event.image} />
            <Text style={styles.date}>Date : {event.date}</Text>         
            {participants.length > 0 && (
              <>
                <Text style={styles.text}>Participants :</Text>
                <FlatList
                    data={participants}
                    renderItem={({ item }) => <Text style={styles.list}>{`\u2022 ${item.profiles.full_name}`}</Text>}
                    extraData={refreshList}
                />
                <View style={styles.buttons}>
                    <Button onPress={() => {addToParticipants(event, profile); setRefreshList(true)}} title="Je participe" disabled={refreshList}/>
                    <Button onPress={() => {removeFromParticipants(event, profile); setRefreshList(false)}} title="Je participe plus" disabled={!refreshList}/>
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