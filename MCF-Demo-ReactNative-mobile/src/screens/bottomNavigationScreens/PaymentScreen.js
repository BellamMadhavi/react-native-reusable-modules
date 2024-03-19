import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet,Linking } from 'react-native';
import RoundButtonComp from '../../components/RoundButtonComp';
import APIs from '../api/api';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import { useFontSize } from '../settingsContent/FontSizeContent';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

const PaymentScreen = () => {
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage} = useLanguage();
  const {isDarkMode}=useTheme();

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
    <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
      <View style={styles.textData}>
        <Text style={{fontSize:fontSize,color:isDarkMode?'white':'#000'}}>{getTextForSelectedLanguage('amount')}:</Text>
        <TextInput
          placeholder={getTextForSelectedLanguage('enterAmount')}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={[styles.textinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',borderColor:isDarkMode?'white':'#333'}]}
          placeholderTextColor={isDarkMode?'white':'#000'}
        />
      </View>
      <View style={styles.textData}>
        <Text style={{fontSize:fontSize,color:isDarkMode?'white':'#000'}}>{getTextForSelectedLanguage('name')}:</Text>
        <TextInput
          placeholder={getTextForSelectedLanguage('enterName')}
          value={name}
          onChangeText={(text) => setName(text)}
          style={[styles.textinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',borderColor:isDarkMode?'white':'#333'}]}
          placeholderTextColor={isDarkMode?'white':'#000'}
        />
      </View>
      <View style={styles.textData}>
        <Text style={{fontSize:fontSize,color:isDarkMode?'white':'#000'}}>{getTextForSelectedLanguage('contact')}:</Text>
        <TextInput
          placeholder={getTextForSelectedLanguage('enterValidContact')}
          keyboardType="phone-pad"
          value={contact}
          onChangeText={(text) => setContact(text)}
          style={[styles.textinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',borderColor:isDarkMode?'white':'#333'}]}
          placeholderTextColor={isDarkMode?'white':'#000'}
        />
      </View>
      <View style={styles.textData}>
        <Text style={{fontSize:fontSize,color:isDarkMode?'white':'#000'}}>{getTextForSelectedLanguage('email')}:</Text>
        <TextInput
          placeholder={getTextForSelectedLanguage('enterEmail')}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.textinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',borderColor:isDarkMode?'white':'#333'}]}
          placeholderTextColor={isDarkMode?'white':'#000'}
        />
      </View>
      <View style={styles.textData}>
        <Text style={{fontSize:fontSize,color:isDarkMode?'white':'#000'}}>{getTextForSelectedLanguage('plinkId')}:</Text>
        <TextInput
          placeholder={getTextForSelectedLanguage('enterPlinkid')}
          keyboardType="numeric"
          value={plinkId}
          onChangeText={(text) => setPlinkId(text)}
          style={[styles.textinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',borderColor:isDarkMode?'white':'#333'}]}
          placeholderTextColor={isDarkMode?'white':'#000'}
        />
      </View>
      <View style={styles.button}>
      <RoundButtonComp label={getTextForSelectedLanguage('makepayment')} onPress={handlePayment} />
      </View>
      <AnalyticsScreen screenClass='PaymentScreen' screenName='PaymentScreen' />
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
