import { View, Text } from "@/src/components/Themed";
import { Button, StyleSheet, TextInput } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/src/constants/Colors";

const SignUpScreen = () => {
    const [userName, setUserName] = useState(String);
    const [password, setPassword] = useState(String);
    const [errors, setErrors] = useState(String);
    const validateInput = () => {
        setErrors('');
        if(!userName) {
            setErrors('Nom d\'utilisateur obligatoire')
            return false;
        }
        if(!password) {
            setErrors('Mot de passe obligatoire')
            return false;
        }
        return true;
    };
    const signup = () => {
        if(!validateInput())
            return;
    };
    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Créer un compte' }} />
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <TextInput 
                placeholder="Nom d'utilisateur" 
                style={styles.input} 
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput 
                placeholder="Mot de passe" 
                style={styles.input} 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={signup} title="Créer un compte" />
            <Link href="/login" style={styles.textButton}>
                Se connecter
            </Link>
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
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
});

export default SignUpScreen;