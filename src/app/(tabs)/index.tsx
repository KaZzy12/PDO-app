import { View, Text } from '@/src/components/Themed';
import events from '@/assets/data/events';
import EventListItem from '@/src/components/EventListItem';
import { SectionList } from 'react-native';
import { Event } from '@/src/types';
import Month from '@/src/components/Month';
type EventListItemProps = {
  event: Event;
};

const eventSorted = events.sort((a,b) => {return new Date(a.date).getTime() - new Date(b.date).getTime();});

export default function TabOneScreen() {
  return (
    <View>
      <SectionList
        sections={getEventGroupedByMonth(events)}
        renderItem={({ item }) => <EventListItem event={item}/>}
        renderSectionHeader={({ section:item }) => <Month month={item.month}/>}
      />
    </View>
  );
}

function getEventGroupedByMonth(event: Event[]) {
  const holding: {data: Event[], month: string, eventDate: string}[] = [];
  for(var eventEntry in events) {
    const eventObj = events[eventEntry];
    const month = getMonth(eventObj.date);
    const year = getYear(eventObj.date)
    const exists = holding.findIndex(element => element.month === month && getYear(element.eventDate) === year);
    if(exists == -1) {
      holding.push({
        data: [{
          id: eventObj.id,
          name: eventObj.name,
          date: getDay(eventObj.date),
          type: eventObj.type,
          image: eventObj.image,
        }],
        month,
        eventDate: eventObj.date,
      });
    }
    else {
      holding.at(exists)?.data.push({
          id: eventObj.id,
          name: eventObj.name,
          date: getDay(eventObj.date),
          type: eventObj.type,
          image: eventObj.image,
      });
    }
  }
  holding.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
  //const groupNames = Array.from(new Set(holding.map(k => k.month)));
  return holding;
}

function getMonth(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {month: 'long'});
}
function getDay(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {day: '2-digit'});
}
function getYear(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {year: 'numeric'});
}