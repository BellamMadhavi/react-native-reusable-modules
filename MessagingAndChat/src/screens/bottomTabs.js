import React,{useEffect} from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './signIn';
import GoogleLogin from './googleLogin';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAvoidingView, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessageScreen from './bottomTabsScreens/MessagingScreen';


const message='Messages';
const Tab=createBottomTabNavigator();
const stack=createNativeStackNavigator();


const BottomTabNavigator=()=>{

  function BottomTabs() {
    const { params } = useRoute();
const loginResponse = params?.loginResponse;
    return (
        <Tab.Navigator screenOptions={{headerShown:false}} >  
        <Tab.Screen
  name={message}
  component={MessageScreen} 
  initialParams={{ useLoginResponse: loginResponse }} 
  options={{
    tabBarLabel: 'Messages',
    tabBarIcon: ({ color, size }) => (
      <AntDesign name="message1" size={size} color={color} /> 
    ),
    headerShown: false,
  }}
/>
        </Tab.Navigator>
      );
    }
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Token = ', token);
    }
  
    useEffect(() => {
      requestUserPermission();
      getToken();
        const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
  
      return unsubscribe; 
    }, []);
  return(
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
  <NavigationContainer>
    <stack.Navigator screenOptions={{
    }}>
      <stack.Screen name={'SignInScreen'} component={SignInScreen} options={{
        headerTitle: 'login',
        headerTitleAlign: 'center',
        headerStyle:{
          backgroundColor:'orange'
        }}} />
 
         
      <stack.Screen name={'GoogleLogin'} component={GoogleLogin} options={{
        headerTitle: 'googleSignOut',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 
       


      <stack.Screen name={'Main'} component={BottomTabs} options={{ 
       
        headerShown:false,
        }} /> 
    </stack.Navigator>
  </NavigationContainer>
  </KeyboardAvoidingView>
  )
}
export default BottomTabNavigator;
