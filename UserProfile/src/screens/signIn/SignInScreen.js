import React,{useState,useEffect} from 'react';
import {ScrollView, Button,View, Image,TextInput, StyleSheet, Alert, Dimensions} from 'react-native';
import AuthAPIService from '../AuthAPIService';
import Validations from '../validations';
export default function SignInScreen({navigation}){
  const { width, height } = Dimensions.get('window');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
    
  const handleLogin = async() => {

    const email = await Validations.isEmailValid(credentials.email);
    const password = await Validations.isPasswordValid(credentials.password);

    if (!credentials.email|| !credentials.password) {
      Alert.alert('Validation Error', 'All Fields Are Required');
    } else if (!email) {
      Alert.alert('Validation Error', 'Invalid Email');
    } else if (!password) {
      Alert.alert('Validation Error', 'Invalid Password');
    }else{
      try{
        const loginData = {
          "email": credentials.email,
          "password": credentials.password,
        };
        const response = await AuthAPIService.userLogin(loginData)
        console.log(JSON.stringify(credentials));
        navigation.navigate('Main', { loginResponse: response });
      }catch(error){
        console.log('Login failed:', error.message);
        Alert.alert(error.message);
      }
    }
  }

  return(
  <ScrollView style={{width, height}} > 
    <View style={{flex:1.5}}>
      <View >
        <Image style={styles.imageStyle}
        resizeMode={'contain'}
        source={require('../../asserts/motivity.jpg')} />
      </View>
        
      <View style={{
        borderBottomColor: 'black',
        borderBottom:1,
        marginBottom: 10,}}>
          <TextInput style={styles.input} placeholder='Enter Email' placeholderTextColor='#ccc' value={credentials.email} onChangeText={(text)=>setCredentials({...credentials,email: text.trim()})} />
          <TextInput style={styles.input} placeholder='Password' value={credentials.password} onChangeText={(text)=>setCredentials({...credentials,password: text.trim()})} placeholderTextColor='#ccc' secureTextEntry={true} />
      </View>

      <View style={{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'center'}}>
          <Button title='Login' onPress={()=>{handleLogin(); }}  />
      </View>

    </View>
  </ScrollView>
  )
}

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
      },
      imageStyle:{
        aspectRatio: 3.0,
        marginLeft:'10%',
        marginTop:40,
        marginBottom:20
      }

})



