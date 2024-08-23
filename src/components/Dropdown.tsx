import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';
import { Event_types } from '../types';

const Dropdown = ({ options, onChangeText }: { options: Event_types[], onChangeText: Function }) => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View>
            <Picker
                style={[styles.pickerInput]}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    onChangeText(itemValue);
                }}
            >
                {options.map(option => (
                    <Picker.Item label={option.label} value={option.value} key={option.value} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerInput: {
        backgroundColor: 'snow',
        borderRadius: 5,
    },
});

export default Dropdown;