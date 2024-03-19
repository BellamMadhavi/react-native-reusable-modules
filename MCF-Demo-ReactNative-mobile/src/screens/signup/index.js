
import React,{useState} from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView,Alert,Button } from 'react-native';
import RoundButtonComp from '../../components/RoundButtonComp';
import AuthAPIService from '../AuthAPIService';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import Validations from '../validations';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function SignUpScreen({navigation}){
  const {fontSize} =useFontSize();
  const {getTextForSelectedLanguage}=useLanguage();
  const {isDarkMode}=useTheme();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    contactNumber:0,
    countryCode:'',
    role:'user'
  });
  
  const handleRegistration =async () => {

    const email = await Validations.isEmailValid(user.emailAddress);
    const password = await Validations.isPasswordValid(user.password);
    const contactNumber = await Validations.isContactNumberValid(user.contactNumber);

    if (!user.firstName || !user.lastName || !user.contactNumber || !user.countryCode ) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('allFieldsRequired'));
    } else if (!email) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('invalidEmail'));
    } else if (!password) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('invalidPassword'));
    }else if (!contactNumber) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('phnoValidation'));
    }else {
      try{
        const registrationData = {
          "firstName": user.firstName,
          "lastName": user.lastName,
          "emailAddress": user.emailAddress,
          "password": user.password,
          "contactNumber":user.contactNumber,
          "countryCode": user.countryCode,
          "role": user.role
        };
        const response = await AuthAPIService.userSignUp(registrationData);
        console.log(JSON.stringify(user));
        navigation.navigate('SignInScreen')
      }catch(error){
        Alert.alert(error.message)
      }
    }
  }
  return (
  <ScrollView style={{backgroundColor:isDarkMode?'#333':'#fff'}}>
    <View style={{flex:1.5}}>
      <View>
        <Image style={{
          aspectRatio: 3.0,
          marginLeft:25,
          marginRight:10,
          marginTop:50,
          marginBottom:20,
         
        }}
        resizeMode={'contain'}
        source={require('../../asserts/motivity.jpg')} />
      </View>
      <View style={{
        borderBottomColor: 'black',
        borderBottom:1,
        }}>
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('firstName')} value={user.firstName} placeholderTextColor={'#ccc'} onChangeText={(text)=>setUser({...user, firstName:text.trim()})} />
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('lastName')} value={user.lastName} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,lastName:text.trim()})} />
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('emailAddress')} value={user.emailAddress} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,emailAddress:text.trim()})} />
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('password')} value={user.password} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,password:text.trim()})} secureTextEntry={true}/>
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('contactNumber')} value={user.contactNumber.toString()} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,contactNumber:text.trim()})}/>
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('countryCode')} value={user.countryCode} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,countryCode:text.trim()})}/>
      </View>
      <View style={{alignItems:'center',padding:5,marginTop:20}}>
        <RoundButtonComp label={getTextForSelectedLanguage('submit')} onPress={()=>{handleRegistration(); }}/>
      </View>
      <AnalyticsScreen  screenName='SignUpScreen' screenClass='SignUpScreen' />
    </View>
  </ScrollView>
  );
};
const styles=StyleSheet.create({
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
    backgroundColor: 'white',
  }
})
