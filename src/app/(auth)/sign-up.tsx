import { View, Text } from "@/src/components/Themed";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { Link, Redirect, Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";

const SignUpScreen = () => {
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [errors, setErrors] = useState(String);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState(String);
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
    async function signup() {
        setLoading(true);
        if(!validateInput())
            return;
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullname,
                }
            }
        });
        if(error) Alert.alert(error.message);
        setLoading(false);
    };
    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Créer un compte' }} />
            <Text style={styles.label}>Nom complet</Text>
            <TextInput 
                placeholder="Nom complet" 
                style={styles.input} 
                value={fullname}
                onChangeText={setFullname}
            />
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
                onPress={signup} 
                disabled={loading} 
                title={loading? "Création du compte..." : "Créer un compte"}
            />
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