import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet,Alert } from 'react-native';
import APIs from '../api/api';
import { useTheme } from "../settingsContent/ThemeContext";
import { useLanguage } from "../settingsContent/LanguageContent";
import { useFontSize } from "../settingsContent/FontSizeContent"; 
import RoundButtonComp from '../../components/RoundButtonComp';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function DeleteEvent({route}) {
    const {authToken } = route.params;
  const [id, setId] = useState('');
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage} = useLanguage();
  const {isDarkMode}=useTheme();

  const deleteEvents = async () => {
    if(!id.trim()){
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('allFieldsRequired'))
    }else{
    const apiUrl = APIs.event + `${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        Alert.alert(getTextForSelectedLanguage('eventDeletedAlert'),response.body);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
}

  return (
    <View style={[{backgroundColor:isDarkMode?'#333':'white',flex:1}]}>   
    <View style={[styles.inputContainer,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>
          <Text style={[styles.label,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}>{getTextForSelectedLanguage('enterId')}:</Text>
          <TextInput
            style={[styles.input,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}
            placeholder={getTextForSelectedLanguage('enterId')}
            value={id}
            onChangeText={text => setId(text.trim())}
            placeholderTextColor="#ccc"
          />
        </View>
    <View style={[{fontSize:fontSize,color:isDarkMode?'white':'#000',alignItems:'center'}]}>
      <RoundButtonComp label={getTextForSelectedLanguage('deleteEvent')} onPress={deleteEvents} /> 
    </View>
    <AnalyticsScreen screenName='DeleteEvent' screenClass='DeleteEvent'/>
    </View>

  );
}

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