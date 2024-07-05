import React, { useState } from "react";
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { View, Text } from "./Themed";

const Dropdown = ({options, onChangeText}: {options:Item[], onChangeText:Function}) => {
    const [selectedValue, setSelectedValue] = useState(String);
    const placeholder = {
        label: 'Sélectionnez une valeur...',
        value: null,
    };
    const handleTextChange = (text: string) => {
        setSelectedValue(text);
        onChangeText(text);
    };
    return (
        <View>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value:string) => handleTextChange(value)}
                value={selectedValue}
            />
        </View>
    );
};

export default Dropdown;