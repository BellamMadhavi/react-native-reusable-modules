import React, { useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, Alert, ActivityIndicator, Button } from 'react-native';
import AuthAPIService from './AuthAPIService';
import Validations from './validations';

export default function ForgetPasswordScreen({ navigation }) {
  const [loginId, setLoginId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async() => {

    const email = await Validations.isEmailValid(loginId);
    const phoneNumber = await Validations.isPhoneNumberValid(loginId);

    if (!loginId) {
      Alert.alert('Validation Error','All Fields Are Required');
    } else if (email || phoneNumber) {
      setLoading(true);
      const encodedLoginId = encodeURIComponent(loginId);
      if (email) {
        try{
          console.log(`FORGOT PASSWORD LINK SENT SUCCESSFULLY TO ${encodedLoginId}`);
          const data = await AuthAPIService.forgetPassword(encodedLoginId);
          Alert.alert(`${data["data"]}`);
          navigation.navigate('ResetPasswordScreen', { data: loginId });
        }catch(error){
          Alert.alert(`${error.message}`);
        }finally{
          setLoading(false);
        }
      }else if (phoneNumber) {
        try{
          const response = await AuthAPIService.sendOtp(loginId);
          Alert.alert('OTP sent successfully.');
           navigation.navigate('OTPVerificationScreen', { data: loginId.toString() });
        }catch(error){
          if(error['statusCode'] =='500'){
              Alert.alert(error['errorMessage']);
          }else{
            Alert.alert(`${error.message}`);
          }
        }finally{ 
          setLoading(false);
        }
      }
    } else {
      Alert.alert('Validation Error', 'Invalid Email or Phone Number');
    }
  };

  return (
    <View style={{ flex: 1.5 }}>
      <View>
        <Image
          style={styles.imageStyle}
          resizeMode={'contain'}
          source={require('../asserts/motivity.jpg')}
        />
      </View>

      <View
        style={{
          borderBottomColor: 'black',
        }}>
        <TextInput
          style={[styles.input]}
          placeholder='Enter Email or PhoneNumber'
          value={loginId}
          onChangeText={(text) => setLoginId(text.trim())}
          placeholderTextColor="#ccc"
        />
      </View>

      <View style={{ alignItems: 'center', padding: 5, marginTop: 10 }}>
        <Button title='Submit' onPress={() =>{handleForgotPassword() 
                }} />
      </View>
      
      {loading && (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginTop: 10,
    borderWidth:0.5,
    borderColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 40,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  imageStyle:{
    aspectRatio: 3.0,
    marginLeft: 25,
    marginRight: 10,
    marginTop: 50,
    marginBottom: 20,
  }
});
