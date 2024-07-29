import { ImageSourcePropType } from "react-native";
import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type Event = {
    id: number,
    name: string,
    date: string,
    dayName?: string,
    type: string,
    image: ImageSourcePropType | undefined,
    participants: string[],
};

export type Profile = {
    full_name: string,
    id: string,
    updated_at: string | null,
};

export type Event_types = {
    value: string,
    label: string,
};