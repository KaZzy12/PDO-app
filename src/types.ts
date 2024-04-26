import { ImageSourcePropType } from "react-native";

export type Event = {
    id: number,
    name: string,
    date: string,
    type: string,
    image: ImageSourcePropType | undefined,
    participants: string[],
};