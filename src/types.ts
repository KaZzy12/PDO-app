import { ImageSourcePropType } from "react-native";

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
}