import React, { useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, Alert,Button } from 'react-native';
import RoundButtonComp from '../../components/RoundButtonComp';
import AuthAPIService from '../AuthAPIService';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import Validations from '../validations';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function OTPVerificationScreen({ navigation, route }) {
  
  const [otp, setOtp] = useState('');
  const [fontSize]=useFontSize();
  const [getTextForSelectedLanguage]=useLanguage();
  const {isDarkMode}=useTheme();

  const handleOtpVerification = async () => {
    const otpvalid = await Validations.isOtpValid(otp);
    if (!otp) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('allFieldsRequired'));
    } else if (!otpvalid) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('otpValidation'));
    } else {
      const receivedData = route.params?.data || 'No data received';
      const toPhoneNumber = receivedData;
      const verificationData = {
        "phone": toPhoneNumber,
        "otp": otp,
      };
    try {
      const response = await AuthAPIService.otpVerication(verificationData)
      Alert.alert('OTP Verified');
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert(error.message);
    }
    }
  };

  return (
    <ScrollView style={{backgroundColor:isDarkMode?'#333':'#fff'}}>
      <View style={{ flex: 1.5 }}>
        <View>
          <Image
            style={styles.imageStyle}
            resizeMode={'contain'}
            source={require('../../asserts/motivity.jpg')}
          />
        </View>

        <View
          style={{
            borderBottomColor: 'black',
          }}
        >
          <TextInput
            style={[styles.input,{fontSize:fontSize}]}
            placeholder={getTextForSelectedLanguage('phoneOtp')}
            placeholderTextColor="#ccc"
            value={otp}
            onChangeText={(text) => setOtp(text.trim())}
          />
        </View>

        <View style={{ alignItems: 'center', padding: 5, marginTop: 20 }}>
          <RoundButtonComp label={getTextForSelectedLanguage('submit')} onPress={() => handleOtpVerification()} />
        </View>
        <AnalyticsScreen screenName='OTPVerificationScreen' screenClass='OTPVerificationScreen' />
      </View>
    </ScrollView>
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
