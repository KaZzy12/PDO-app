import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function TabIndex() {
    const { session, loading } = useAuth();
    if(loading) {
        return <ActivityIndicator />;
    }
    if(!session) {
        return <Redirect href={'/login'} />;
    }
    else {
        return <Redirect href={'/events'} />;
    }
}