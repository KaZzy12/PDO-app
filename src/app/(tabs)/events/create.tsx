import { View, Text } from "../../../components/Themed";
import { StyleSheet, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import moment from "moment";

const CreateEventScreen = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const displayDatePicker= () => {
        setShow(true);
    };
    const onChange = (event, selectedDate:Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        if(typeof(currentDate) !== 'undefined')
            setDate(currentDate);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom</Text>
            <TextInput placeholder="Nom" style={styles.input}/>

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
            <Text style={styles.label}>Type</Text>
            <TextInput placeholder="Type" style={styles.input}/>
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