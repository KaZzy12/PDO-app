import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { StyleSheet, Image, FlatList, Button, ActivityIndicator } from "react-native";
import Colors from '@/src/constants/Colors';
import { Event } from "@/src/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import { useEvent } from "@/src/api/events";
import { useDeleteAttendee, useEventAttendees, useInsertAttendee } from "@/src/api/eventsAttendees";
import RemoteImage from "@/src/components/RemoteImage";

const EventDetailsScreen = () => {
    const { profile } = useAuth();
    const [isParticipating, setIsParticipating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string'? idString : idString[0]);
    const { data: event, error: eventError, isLoading: isLoadingEvent } = useEvent(id);
    const { data: participants, error: eventAttendeeError, isLoading: isLoadingEventAttendee } = useEventAttendees(id); 
    const { mutate: insertAttendee } = useInsertAttendee();
    const { mutate: deleteAttendee } = useDeleteAttendee();
    useEffect(() => {
        if(participants && profile) {
            const isParticiping = participants.findIndex(x => x.profiles.id === profile.id) !== -1;
            setIsParticipating(isParticiping);
        }
    }, [participants, profile]); 
    if(isLoadingEvent || isLoadingEventAttendee) {
        return <ActivityIndicator />
    }
    if(!profile)
        return <Text>Issue with profile</Text> 
    if(eventError || eventAttendeeError) {
        return <Text>Erreur lors de la récupération des events</Text>
    }
    if (!event)
        return <Text>Event not found</Text>
    const addToParticipants = (profile:any) => {
        insertAttendee({ event_id: id, attendee_id: profile.id })
        setIsParticipating(true);
    }
    const removeFromParticipants = (profile:any) => {
        deleteAttendee({ event_id: id, attendee_id: profile.id });
        setIsParticipating(false);
    }
    const onRefresh = () => {
        setIsRefreshing(true);

        setIsRefreshing(false);
    }

    return(
        <View style={styles.parent}>
            <Stack.Screen options={{ title: event.name}} />
            <RemoteImage style={styles.image} path={event.events_types.image} fallback='@/assets/images/default.png' />
            <Text style={styles.date}>Date : {event.date}</Text>         
            {(participants.length > 0 || event.type != 'anniversaire') && (
              <>
                <Text style={styles.text}>Participants :</Text>
                <FlatList
                    data={participants}
                    renderItem={({ item }) => <Text style={styles.list}>{`\u2022 ${item.profiles.full_name}`}</Text>}
                    extraData={isParticipating}
                />  
                <View style={styles.buttons}>
                    <Button onPress={() => {addToParticipants(profile)}} title="Je participe" disabled={isParticipating}/>
                    <Button onPress={() => {removeFromParticipants(profile)}} title="Je participe plus" disabled={!isParticipating}/>
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