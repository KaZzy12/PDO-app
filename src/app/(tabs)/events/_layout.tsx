import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import LogoTitle from "@/src/components/LogoTitle";
import { Text } from "@/src/components/Themed";

import { useColorScheme } from '@/src/components/useColorScheme';
import { View } from "@/src/components/Themed";

export default function MenuStack() {
    const colorScheme = useColorScheme();
    return (
        <Stack>
            <Stack.Screen 
              name="index" 
              options={{
                title: 'Events',
                headerLeft: () => (<Text style= {{ fontSize: 20 }}>Events</Text>),
                headerTitle: () => (<LogoTitle />),
                headerTitleAlign: 'center',
                headerRight: () => (                  
                  <Link href="/events/create" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="plus-square-o"
                          size={25}
                          color={Colors[colorScheme ?? 'light'].text}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                  ),
              }}
            />
        </Stack>
    );
}