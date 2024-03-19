
import React, { useState } from 'react';
import { View, Text, StyleSheet,Button,FlatList, Alert } from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import APIs from '../api/APIs';
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};
LocaleConfig.defaultLocale = 'en';

const CalenderScreen = ({route,navigation}) => {
    const { useLoginResponse } = route.params;
    const authToken =  useLoginResponse.accessToken;
    const email= useLoginResponse.email;
    const [eventDetails, setEventDetails] = useState(null);
    
  const [events, setEvents] = useState({
    '2024-01-31': [{ name: 'Event 1', startTime: '10:00 AM', endTime: '12:00 PM' }],
    '2024-02-01': [{ name: 'Event 2', startTime: '02:00 PM', endTime: '04:00 PM' }],
  });

  const [selectedDate, setSelectedDate] = useState('');
  const handleDayPress = (day) => {
    const selectedDateObject = new Date(day.dateString);
    const formattedSelectedDate = selectedDateObject.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    setSelectedDate(formattedSelectedDate);
    console.log('authToken:',authToken);
    console.log('email',email)
  };

  const getEvents=async=>{
    if(!selectedDate){
      Alert.alert('Validation Error','Please Select Date');
    }else{

    const encodedEmail = encodeURIComponent(email);

      const createdBy = encodedEmail; 
      const apiUrl =APIs.event+`${createdBy}?date=${selectedDate}`;   
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setEventDetails(data);
        })
        .catch(error => {
          console.error(error);
        });
  }
}
  

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...events,
          [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: 'blue' },
        }}
      />

      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
        {events[selectedDate] && (
          <View style={styles.eventsContainer}>
            <Text style={styles.eventsTitle}>Events:</Text>
            {events[selectedDate].map((event, index) => (
              <Text key={index} style={styles.eventText}>{`${event.name} (${event.startTime} - ${event.endTime})`}</Text>
            ))}
          </View>
        )}
              <Button style={{}} title="+" onPress={()=>{
                if(selectedDate){
                navigation.navigate('CreateEventScreen',{ email,selectedDate, authToken })}
                }}/>
      </View>
      <View style={{alignItems:'center',marginTop:20,flexDirection:'row',justifyContent:'center'}}>
      <Button title='Event Details' onPress={()=>getEvents()}/>
      <View style={{marginRight:10}}/>
      <Button title='Delete Event' onPress={()=>{navigation.navigate('DeleteEvent',{authToken})}} />

      </View>
      <FlatList
        data={eventDetails}
        renderItem={({ item }) => (
          <View style={styles.eventDetailsContainer}>
            <Text>Id:{item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>CreatedBy: {item.createdBy}</Text>
            <Text>Status:{item.status}</Text>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  selectedDateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventText: {
    fontSize: 14,
    marginBottom: 3,
  },
  eventDetailsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
    paddingBottom: 10,
    
  },
});

export default CalenderScreen; 

