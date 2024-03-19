import React,{useState,useEffect} from 'react';
import {ScrollView, Text,View, Image,TextInput, StyleSheet,StatusBar, Alert,TouchableOpacity,SafeAreaView, Button} from 'react-native';
import RoundButtonComp from "../../components/RoundButtonComp";
import FullRoundButtonComp from "../../components/FullRoundButtonComp";
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import { _signOutWithGoogle} from '../../config/firebase/GoogleSignOut';
import { LoginManager, AccessToken, Settings, GraphRequest } from 'react-native-fbsdk-next';
import AuthAPIService from '../AuthAPIService';
import analytics  from '@react-native-firebase/analytics';
import Validations from '../validations';
import { useUser } from '../UserContent';


export default function SignInScreen({navigation}){
  const {setUser} = useUser(); 
    const [message, setMessage] = useState('login successfull !');
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
    
      const handleLogin = async() => {
        const isEmailValid = await Validations.isEmailValid(credentials.email);
        const isPasswordValid = await Validations.isPasswordValid(credentials.password)

    
        if (!credentials.email|| !credentials.password) {
          Alert.alert('validation Error','All fields are required');
        } else if (!isEmailValid) {
          Alert.alert('validation Error','Invalid Email');
        } else if (!isPasswordValid) {
          Alert.alert('validation Error','Invalid Password format');
        }else{
          try{
            const loginData = {
              "email": credentials.email,
              "password": credentials.password,
            };
            const response = await AuthAPIService.userLogin(loginData)
            console.log(JSON.stringify(credentials));
            Alert.alert('Login successfull')            
          }catch(error){
            console.log('Login failed:', error.message);
            Alert.alert(error.message);
          }
        }
      }

    try{
        Settings.setAppID('363709662709849');
        Settings.initializeSDK();
    }
    catch{
        console.log('=>error data')
    }

      const signInWithGoogle = async () => {
    const userInfo = await _signInWithGoogle();
    if (userInfo) {
      setUser(userInfo);
      console.log('User signed in:', userInfo); 
    } else {
      console.log('Sign-in failed');
    }
  };
      

  async function loginWithMicrosoft() {
    try {
      const result = await authorize(config);
      console.log('Authentication Result:', result);
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };
    
    async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        return auth().signInWithCredential(facebookCredential);
    }


    return(
        <ScrollView >
            <View style={{flex:1.5}}>
            <View >
                <Image style={{
                     aspectRatio: 3.0,
                     marginLeft:25,
                     marginRight:10,
                     marginTop:50,
                     marginBottom:20
                }}
                    resizeMode={'contain'}
                    source={require('../../asserts/motivity.jpg')}
                />
            </View>
        
            <View style={{
                borderBottomColor: 'black',
                borderBottom:1,
                marginBottom: 10,
            }}>
               <TextInput style={styles.input} placeholder="Email" value={credentials.email} onChangeText={(text)=>setCredentials({...credentials,email: text.trim()})} placeholderTextColor="#ccc" />
               <TextInput style={styles.input} placeholder="Password" value={credentials.password} onChangeText={(text)=>setCredentials({...credentials,password: text.trim()})} placeholderTextColor="#ccc" secureTextEntry={true} />
            </View>
            <View style={{
                    flexDirection:'row',
                    marginTop:20,
                    justifyContent:'center'
                }}>
                    <RoundButtonComp label={'Login'} onPress={()=>{handleLogin(); }}  />
                
            </View>
        

                    <View style={{
                        flexDirection:'row',
                        marginTop:30,
                        alignItems:'center',
                        justifyContent:'center'
                        }}>
                    <FullRoundButtonComp image={require('../../asserts/google.png')} onPress={()=>{signInWithGoogle();navigation.navigate('GoogleLogin');}}  ></FullRoundButtonComp>
                    <FullRoundButtonComp image={require('../../asserts/facebook.png')} onPress={()=>{
                       onFacebookButtonPress();
                      }}></FullRoundButtonComp>
                    </View>

                </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    input: {
        width:300,
        marginTop:10,
        borderColor:'black',
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:10,
        marginLeft:40,
        marginBottom:20,
        backgroundColor:'white'
      }

})



