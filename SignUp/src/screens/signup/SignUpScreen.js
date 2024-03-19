
import React,{useState} from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView,Alert,Button } from 'react-native';
import AuthAPIService from '../AuthAPIService';
import Validations from '../validations';

export default function SignUpScreen(){

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
      Alert.alert('Validation Error', 'All Fields Are Required');
    } else if (!email) {
      Alert.alert('Validation Error','Invalid Email');
    } else if (!password) {
      Alert.alert('Validation Error', 'Invalid Password');
    }else if (!contactNumber) {
      Alert.alert('Validation Error', 'PhoneNumber must be 10 digits');
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
        Alert.alert(response.message);
      }catch(error){
        Alert.alert(error.message)
      }
    }
  }
  return (
  <ScrollView >
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
          <TextInput style={styles.input} placeholder='First Name' value={user.firstName} placeholderTextColor={'#ccc'} onChangeText={(text)=>setUser({...user, firstName:text.trim()})} />
          <TextInput style={styles.input} placeholder='Last Name' value={user.lastName} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,lastName:text.trim()})} />
          <TextInput style={styles.input} placeholder='Email Address' value={user.emailAddress} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,emailAddress:text.trim()})} />
          <TextInput style={styles.input} placeholder='Password' value={user.password} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,password:text.trim()})} secureTextEntry={true}/>
          <TextInput style={styles.input} placeholder='Contact Number' value={user.contactNumber.toString()} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,contactNumber:text.trim()})}/>
          <TextInput style={styles.input} placeholder='Country Code' value={user.countryCode} placeholderTextColor="#ccc" onChangeText={(text)=>setUser({...user,countryCode:text.trim()})}/>
      </View>
      <View style={{alignItems:'center',padding:5,marginTop:20}}>
        <Button title='Submit' onPress={()=>{handleRegistration(); }}/>
      </View>
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
