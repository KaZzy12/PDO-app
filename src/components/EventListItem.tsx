import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Event } from '../types';
import { Link } from 'expo-router';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
  return(
    <Link href={`/events/${event.id}`} asChild>
      <Pressable style={styles.container}>
        <View  style={styles.tab}>
          <Text style={styles.dayName}>{event.dayName}</Text>
          <Text style={styles.date}>{event.date}</Text>
        </View>
        <View style={styles.tabCenter}>
          <Text style={styles.title}>{event.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

/*<Image style={styles.image} source={event.image} resizeMode='contain'/>
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  date: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    display: 'flex',
    alignItems: 'stretch',
  },
});*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: "row",
		borderBottomColor: "lightsteelblue",
		borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
		flex: 2,
		backgroundColor: "dodgerblue",
		justifyContent: "center",
		alignItems: "center",
	},
	tabCenter: {
		flex: 10,
		padding: 12,
	},
  title: {
    fontSize: 18,
  },
  date: {
    color: "white",
		fontSize: 18,
  },
  dayName: {
    color: "white",
		fontSize: 14,
  },
  image: {
    height: 200,
    display: 'flex',
    alignItems: 'stretch',
  },
});

export default EventListItem;