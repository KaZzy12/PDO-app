import { View, Text } from "../../../components/Themed";
import { ActivityIndicator, Button, StyleSheet, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import moment from "moment";
import eventTypes from "@/src/constants/eventsTypes";
import Dropdown from "@/src/components/Dropdown";
import { Stack, useRouter } from "expo-router";
import { useInsertEvent } from "@/src/api/events";
import { useEventsTypes } from "@/src/api/eventsTypes";

const CreateEventScreen = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [name, setName] = useState(String);
    const [type, setType] = useState(String);
    const [errors, setErrors] = useState(String);
    const { mutate: insertEvent } = useInsertEvent();
    const { data: eventTypes, error, isLoading } = useEventsTypes();
    if(isLoading) {
        return <ActivityIndicator />
    }
    if(error) {
        return <Text>Issue with event types</Text> 
    }
    if(!eventTypes) {
        return <Text>Erreur lors de la récupération des types d'évènements</Text>
    }
    const router = useRouter();
    const displayDatePicker= () => {
        setShow(true);
    };
    const onChange = (event, selectedDate:Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        if(typeof(currentDate) !== 'undefined')
            setDate(currentDate);
    };
    const resetFields = () => {
        setDate(new Date());
        setName('');
    };
    const validateInput = () => {
        setErrors('');
        if(!name) {
            setErrors('Nom obligatoire');
            return false;
        }
        if(!type) {
            setErrors('Type obligatoire');
            return false;
        }
        return true;
    };
    const onCreate = () => {
        if(!validateInput())
            return;
        insertEvent({ name, date, type }, {
            onSuccess: () => {
                resetFields();
                router.back();
            },
            onError(error, variables, context) {
                setErrors(error.message);
            },
        });
    };
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Ajouter un évènement' }} />
            <Text style={styles.label}>Nom</Text>
            <TextInput 
                placeholder="Nom" 
                style={styles.input} 
                value={name}
                onChangeText={setName}
            />
            
            <Text style={styles.label}>Type</Text>
            <Dropdown options={eventTypes} onChangeText={setType}/>

            <Text style={styles.label}>Date</Text>
            <TextInput 
                placeholder="Date" 
                style={styles.input}
                value={moment(date).format('YYYY-MM-DD')}
                inputMode="none"
                onPressIn={displayDatePicker}
            />
            {show && (
            <DateTimePicker
                value={date}
                onChange={onChange}
            />
            )}
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onCreate} title="Ajouter évènement" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'snow',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
});

export default CreateEventScreen;