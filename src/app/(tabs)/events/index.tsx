import { View, Text } from '@/src/components/Themed';
import EventListItem from '@/src/components/EventListItem';
import { ActivityIndicator, SectionList } from 'react-native';
import { Event } from '@/src/types';
import Month from '@/src/components/Month';
import { useEventsList } from '@/src/api/events';

type EventListItemProps = {
  event: Event;
};

export default function EventsScreen() {
  const { data: events, error, isLoading } = useEventsList(new Date().toISOString());

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text>Erreur lors de la récupération des events {error.message}</Text>
  }

  return (
    <View>
      <SectionList
        sections={getEventGroupedByMonth(events)}
        renderItem={({ item }) => <EventListItem event={item}/>}
        renderSectionHeader={({ section:item }) => <Month month={item.month}/>}
        stickySectionHeadersEnabled= {true}
      />
    </View>
  );
}

function getEventGroupedByMonth(events: any) {
  const eventSorted = events.sort((a: any,b:any) => {return new Date(a.date).getTime() - new Date(b.date).getTime();});
  const holding: {data: Event[], month: string, eventDate: string}[] = [];
  for(var eventEntry in events) {
    const eventObj = events[eventEntry];
    const month = getMonthName(eventObj.date);
    if(eventObj.type === 'anniversaire') {
      let date = new Date(eventObj.date);
      date.setHours(0,0,0,0);
      let today = new Date();
      today.setHours(0,0,0,0);
      date.setFullYear(new Date().getFullYear());
      if(date < today) {
        date.setFullYear(new Date().getFullYear() + 1);
      }
      eventObj.date = convertToStringDate(date.toDateString());
    }
    const year = getYear(eventObj.date);
    const exists = holding.findIndex(element => element.month === month && getYear(element.eventDate) === year);
    if(exists == -1) {
      holding.push({
        data: [{
          id: eventObj.id,
          name: eventObj.name,
          date: getDay(eventObj.date),
          dayName: getDayName(eventObj.date),
          type: eventObj.type,
          image: eventObj.image,
          participants: eventObj.participants,
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
          dayName: getDayName(eventObj.date),
          type: eventObj.type,
          image: eventObj.image,
          participants: eventObj.participants,
      });
    }
  }
  holding.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
  //const groupNames = Array.from(new Set(holding.map(k => k.month)));
  return holding;
}
function getMonth(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {month: '2-digit'});
}
function getMonthName(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {month: 'long'});
}
function getDay(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {day: '2-digit'});
}
function getDayName(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('fr-BE', {weekday: 'short', timeZone: "UTC"}).toUpperCase();
}
function getYear(sDate:string) {
  let date = new Date(sDate);
  return date.toLocaleString('default', {year: 'numeric'});
}
function convertToStringDate(sDate:string) {
  return getYear(sDate) + "-" + getMonth(sDate) + "-" + getDay(sDate);
}