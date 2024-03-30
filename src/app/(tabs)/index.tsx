import { View, Text } from '@/src/components/Themed';
import events from '@/assets/data/events';
import EventListItem from '@/src/components/EventListItem';
import { FlatList, SectionList } from 'react-native';
import { Event } from '@/src/types';
type EventListItemProps = {
  event: Event;
};

const eventSorted = events.sort((a,b) => {return new Date(a.date).getTime() - new Date(b.date).getTime();});

export default function TabOneScreen() {
  return (
    <View>
      {/*<FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item}/>}
      />
      <FlatList
        data={events.sort((a,b) =>
          {return new Date(a.date).getTime() - new Date(b.date).getTime();})}
        renderItem={({ item }) => <EventListItem event={item}/>}
      />
      <SectionList
        sections={setEventGroupedByMonth(events)}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <EventListItem event={item.data}/>}
      />*/}
    
      <FlatList
        data={getEventGroupedByMonth(events)}
        renderItem={({ item }) => <EventListItem event={item.data}/>}
      />
    </View>
  );
}

function getEventGroupedByMonth(event: Event[]) {
  const holding: {data: Event, month: string, eventDate: string}[] = [];
  for(var eventEntry in events) {
    const eventObj = events[eventEntry];
    const month = getMonth(eventObj.date);

    holding.push({
      data: {
        id: eventObj.id,
        name: eventObj.name,
        date: eventObj.date,
        type: eventObj.type,
        image: eventObj.image,
      },
      month,
      eventDate: eventObj.date,
    });
  }
  holding.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
  //const groupNames = Array.from(new Set(holding.map(k => k.month)));
  return holding;
}

function getMonth(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {month: 'long'});
}