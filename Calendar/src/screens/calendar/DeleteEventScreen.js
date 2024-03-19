import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet,Alert } from 'react-native';
import APIs from '../api/APIs'; 

export default function DeleteEvent({route}) {
    const {authToken } = route.params;
  const [id, setId] = useState('');

  const deleteEvents = async () => {
    if(!id.trim()){
      Alert.alert('Validation Error','All Fields Are Required');
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
        Alert.alert('Event Deleted Succesfully',response.body);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
}

  return (
    <View style={{flex:1}}>   
    <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter ID:</Text>
          <TextInput
            style={styles.input}
            placeholder='Please Enter Id'
            value={id}
            onChangeText={text => setId(text.trim())}
            placeholderTextColor="#ccc"
          />
        </View>
    <View style={{alignItems:'center'}}>
      <Button title='Delete Event' onPress={deleteEvents} /> 
    </View>
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