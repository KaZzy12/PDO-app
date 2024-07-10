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