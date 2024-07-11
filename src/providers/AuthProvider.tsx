import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";

type AuthData = {
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSession = async() => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);    
            if(session) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                if(data) {
                    const profile = {
                        full_name: data.full_name,
                        id: data.id,
                        updated_at: data.updated_at,
                    };
                    setProfile(profile);
                }
                else {
                    setProfile(null);
                }
            }
            setLoading(false);
        };
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    return (
        <AuthContext.Provider value={{ session, profile, loading }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);