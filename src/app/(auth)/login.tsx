import { View, Text } from "@/src/components/Themed";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, Image } from "react-native";
import { Link, Redirect, Stack } from "expo-router";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";

const LoginScreen = () => {
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [errors, setErrors] = useState(String);
    const [loading, setLoading] = useState(false);
    const validateInput = () => {
        setErrors('');
        if(!email) {
            setErrors('Email obligatoire')
            return false;
        }
        if(!password) {
            setErrors('Mot de passe obligatoire')
            return false;
        }
        return true;
    };
    async function login() {
        setLoading(true);
        if(!validateInput())
            return;
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if(error) Alert.alert(error.message);
        setLoading(false);
    };
    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Se connecter' }} />
            <Image style={styles.image} source={require("@/assets/images/icon.png")} />
            <View style={styles.containerInput}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder="athlete@PDO.com" 
                    style={styles.input} 
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput 
                    placeholder="Mot de passe" 
                    style={styles.input} 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Text style={{ color: 'red' }}>{errors}</Text>
                <Button 
                    onPress={login} 
                    disabled={loading} 
                    title={loading? "Connexion en cours..." : "Se connecter"} 
                />
                <Link href="/sign-up" style={styles.textButton}>
                    Créer un compte
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    containerInput: {
        flex: 2,
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
    image: {
        resizeMode: 'center',
        alignSelf: 'center',
        flex: 1,
        aspectRatio: 1,
    },
});

export default LoginScreen;