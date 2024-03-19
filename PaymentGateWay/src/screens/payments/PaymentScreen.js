import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet,Linking, Button } from 'react-native';
import APIs from '../api/API';

const PaymentScreen = () => {

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [plinkId, setPlinkId] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch(APIs.payments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount)*100, 
          name,
          contact,
          email,
          plinkId: parseInt(plinkId), 
        }),
      });

      const orderData = await response.json();
      const shorturldata= orderData["short_url"]
      console.log('response data', orderData);
      console.log('response success data', response.status);
      if (shorturldata) {
        await Linking.openURL(shorturldata);
      }

      setAmount('');
      setName('');
      setContact('');
      setEmail('');
      setPlinkId('');
      
    } catch (error) {
      console.error('Error fetching Razorpay order details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textData}>
        <Text>Amount:</Text>
        <TextInput
          placeholder='Enter Amount'
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.textinput}
          placeholderTextColor='#000'
        />
      </View>
      <View style={styles.textData}>
        <Text>Name:</Text>
        <TextInput
          placeholder='Enter Name'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textinput}
          placeholderTextColor='#000'
        />
      </View>
      <View style={styles.textData}>
        <Text>ContactNumber:</Text>
        <TextInput
          placeholder='Enter Valid Contact Number'
          keyboardType="phone-pad"
          value={contact}
          onChangeText={(text) => setContact(text)}
          style={styles.textinput}
          placeholderTextColor='#000'
        />
      </View>
      <View style={styles.textData}>
        <Text>Email:</Text>
        <TextInput
          placeholder='Enter Email'
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textinput}
          placeholderTextColor='#000'
        />
      </View>
      <View style={styles.textData}>
        <Text>PlinkId:</Text>
        <TextInput
          placeholder='Enter PlinkId'
          keyboardType="numeric"
          value={plinkId}
          onChangeText={(text) => setPlinkId(text)}
          style={styles.textinput}
          placeholderTextColor='#000'
        />
      </View>
      <View style={styles.button}>
      <Button title='Make Payment' onPress={handlePayment} />
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'flex-start',
      paddingLeft:30,
    },
    textData:{
      
      padding:5,
    },
    textinput:{
      borderWidth:0.3,
      borderRadius:5,
      width:250,
      
    },
    button:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
      marginLeft:70,
    }
})
