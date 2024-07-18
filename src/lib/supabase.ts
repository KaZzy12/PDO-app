import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://neznbflspfhgxhqwykao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lem5iZmxzcGZoZ3hocXd5a2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1OTI0NjMsImV4cCI6MjAzNjE2ODQ2M30.UxymvPsaQFdNOICCV9qQbFP_5N_aGrejfIO0RvfZXEQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    //storage: ExpoSecureStoreAdapter as any,
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});