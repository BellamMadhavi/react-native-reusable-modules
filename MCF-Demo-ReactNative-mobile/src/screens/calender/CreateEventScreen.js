import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import APIs from '../api/api';
import RoundButtonComp from '../../components/RoundButtonComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import Validations from '../validations';
import { useTheme } from "../settingsContent/ThemeContext";
import { useLanguage } from "../settingsContent/LanguageContent";
import { useFontSize } from "../settingsContent/FontSizeContent"; 
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

const CreateEventScreen = ({ route }) => {
  const { email, authToken, selectedDate } = route.params;
  const [name, setName] = useState('');
  const [createdBy, setCreatedBy] = useState(email);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage} = useLanguage();
  const {isDarkMode}=useTheme();


  const apiUrl = APIs.event;

  const onChange = (event, selectedTime) => {
    if (event.type === 'set') {
      const selectedHours = selectedTime.getHours();
      const selectedMinutes = selectedTime.getMinutes();
      const formattedTime = `${selectedHours}:${selectedMinutes}`;
      setTime(formattedTime);
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const createEvent = async() => {
    const timeValid = await Validations.isValidTime(time);

    if (!name.trim() || !location.trim() || !time.trim()) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('allFieldsRequired'));
    } else if(!timeValid){
        Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('invalidTime'))
    }else {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            createdBy,
            location: location.trim(),
            date: selectedDate, 
            time: time.trim(),
          }),
        });

        if (response.ok) {
          console.log('response',response)
          Alert.alert(getTextForSelectedLanguage('eventCreatedAlert'));
          setName('');
          setLocation('');
          setTime('');
        } else {
          console.log(response.statusText);
          Alert.alert(response.statusText);
        }
      } catch (error) {
        Alert.alert(error);
      }
    }
  };

  return (
    <ScrollView style={[{backgroundColor:isDarkMode?'#333':'white',}]}>
      <View style={{ flex: 1.5 }}>
        <View>
          <Image
            style={{
              aspectRatio: 3.0,
              marginLeft: 25,
              marginRight: 10,
              marginTop: 50,
              marginBottom: 20,
            }}
            resizeMode={'contain'}
            source={require('../../asserts/motivity.jpg')}
          />
        </View>
        <View style={[styles.inputContainer,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>
          <Text style={[styles.label,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>{getTextForSelectedLanguage('name')}:</Text>
          <TextInput
            style={[styles.input,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}
            placeholder={getTextForSelectedLanguage('enterEventName')}
            value={name}
            onChangeText={text => setName(text.trim())}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={[styles.inputContainer,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>
          <Text style={[styles.label,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>{getTextForSelectedLanguage('location')}:</Text>
          <TextInput
            style={[styles.input,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}
            placeholder={getTextForSelectedLanguage('enterLocation')}
            value={location}
            onChangeText={text => setLocation(text.trim())}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={[styles.inputContainer,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>
          <Text style={[styles.label,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>{getTextForSelectedLanguage('time')}:</Text>
          <TextInput
            style={[styles.input,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}
            placeholder={getTextForSelectedLanguage('enterTime')}
            value={time}
            onChangeText={text => setTime(text.trim())}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Image source={require('../../asserts/time1.jpg')} style={styles.icon} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <RoundButtonComp label={getTextForSelectedLanguage('createEvent')} onPress={createEvent} />
        </View>
        <AnalyticsScreen screenName='CreateEventScreen' screenClass='CreateEventScreen' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
});

export default CreateEventScreen;
