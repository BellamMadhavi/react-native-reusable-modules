import React,{useEffect} from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/signIn';
import ForgetPasswordScreen from './screens/forgetpassword';
import ResetPasswordScreen from './screens/forgetpassword/resetpassword';
import HomeScreen from './screens/bottomNavigationScreens/home';
import GoogleLogin from './screens/googleLogin';
import OTPVerificationScreen from './screens/forgetpassword/otpverification';
import MapScreen from './screens/home/map';
import SignUpScreen from './screens/signup';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/bottomNavigationScreens/SettingsScreen';
import ProfileScreen from './screens/bottomNavigationScreens/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFontSize } from './screens/settingsContent/FontSizeContent';
import { useLanguage } from './screens/settingsContent/LanguageContent';
import { useTheme } from './screens/settingsContent/ThemeContext';
import { KeyboardAvoidingView, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PaymentScreen from './screens/bottomNavigationScreens/PaymentScreen';
import CreateEventScreen from './screens/calender/CreateEventScreen';
import DeleteEvent from './screens/calender/DeleteEventScreen';
import CalenderScreen from './screens/bottomNavigationScreens/CalendarScreen';
import Feedback from './screens/feedback&ratings/Feedback';
import ChoosingScreen from './screens/bottomNavigationScreens/ChoosingScreen';
import ImageScreen from './screens/share/ImageScreen';
import VideoScreen from './screens/share/VideoScreen';
import MessageScreen from './screens/bottomNavigationScreens/MessageScreen';
import ExternalService from './screens/share/ExternalService';
import AudioPlay from './screens/share/audioPlay';

const homeName='Home';
const MapName='Maps';
const settings='Settings';
const profile='Profile';
const calendar='Calender';
const payments = 'paymentScreen';
const share = 'Share';
const message='Messages';
const Tab=createBottomTabNavigator();
const stack=createNativeStackNavigator();


const BottomTabNavigator=()=>{
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage}=useLanguage();
  const {isDarkMode}=useTheme();
  function BottomTabs() {
    const { params } = useRoute();
const loginResponse = params?.loginResponse;
    return (
        <Tab.Navigator screenOptions={{
          tabBarLabelStyle :{
            fontSize: fontSize,
            color:isDarkMode?'#FFFFFF':'#000000'
        },
        tabBarStyle:{
          backgroundColor:isDarkMode?'#333':'white',
          height:36+fontSize,
        }
        }} >
          <Tab.Screen
           name={homeName}
           component={HomeScreen}
           options={{tabBarLabel:'Home',
           tabBarIcon:({color,size}) => (
            <AntDesign name='home' size={size} color={color} />
          ),
          tabBarLabel:getTextForSelectedLanguage('homeLabel'),
          headerShown:false
          }}/>
          
 
          <Tab.Screen
          name={MapName}
           component={MapScreen}
            options={{tabBarLabel:'Map'
            ,tabBarIcon:({color,size}) => (
            <Feather name='map-pin' size={size} color={color} />
          ),
          tabBarLabel:getTextForSelectedLanguage('mapLabel'),
          headerShown:false
          }}/>
 
          <Tab.Screen
           name={profile}
            component={ProfileScreen}
            initialParams={{ useLoginResponse: loginResponse }} 
             options={{tabBarLabel:'Profile',
             tabBarIcon:({color,size}) => (
            <AntDesign name='profile' size={size} color={color} />
          ),
          tabBarLabel:getTextForSelectedLanguage('profileLabel'),
          headerShown:false
          }}/>
             
             <Tab.Screen
           name={payments}
            component={PaymentScreen}
             options={{tabBarLabel:'Settings',
             tabBarIcon:({color,size}) => (
            <MaterialIcons name='payment' size={size} color={color} />
          ),
          tabBarLabel:getTextForSelectedLanguage('payments'),
          headerShown:false
          }}/>

          <Tab.Screen
           name={settings}
            component={SettingsScreen}
             options={{tabBarLabel:'Settings',
             tabBarIcon:({color,size}) => (
            <Feather name='settings' size={size} color={color} />
          ),
          tabBarLabel:getTextForSelectedLanguage('settingsLabel'),
          headerShown:false
          }}/>
          <Tab.Screen
          name={calendar}
          component={CalenderScreen} 
          initialParams={{ useLoginResponse: loginResponse }} 
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} /> 
            ),
            tabBarLabel:getTextForSelectedLanguage('calendarLabel'),
            headerShown:false          }}
        />
        <Tab.Screen
           name={share}
           component={ChoosingScreen}
           options={{tabBarLabel:'Share',
           tabBarIcon:({color,size}) => (
            <AntDesign name="sharealt" size={size} color={color} />
            ),
          tabBarLabel:getTextForSelectedLanguage('share'),
          headerShown:false
          }}/>
        <Tab.Screen
        name={message}
        component={MessageScreen}
        initialParams={{ useLoginResponse: loginResponse }} 
        options={{
          tabBarLabel: getTextForSelectedLanguage('messages'),
          tabBarIcon: ({ color, size }) => (
          <AntDesign name="message1" size={size} color={color} />
          ),
          headerShown: false,
          }}/>
 
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
      headerTitleStyle:{
        fontSize:fontSize
      }
    }}>
      <stack.Screen name={'SignInScreen'} component={SignInScreen} options={{
        headerTitle: getTextForSelectedLanguage('login'),
        headerTitleAlign: 'center',
        headerStyle:{
          backgroundColor:'orange'
        }}} />

      <stack.Screen name={'SignUpScreen'} component={SignUpScreen} options={{
        headerTitle: getTextForSelectedLanguage('signUp'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} />

      <stack.Screen name={'ForgetPasswordScreen'} component={ForgetPasswordScreen} options={{
        headerTitle: getTextForSelectedLanguage('forgotPasswordScreen'),
        headerTitleAlign: 'center',
        headerStyle: {

          backgroundColor: 'orange',
        }}} />

      <stack.Screen name={'ResetPasswordScreen'} component={ResetPasswordScreen} options={{
        headerTitle: getTextForSelectedLanguage('resetPassword'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} />

      <stack.Screen name={'OTPVerificationScreen'} component={OTPVerificationScreen} options={{
        headerTitle: getTextForSelectedLanguage('oTPVerification'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 
         
      <stack.Screen name={'GoogleLogin'} component={GoogleLogin} options={{
        headerTitle: getTextForSelectedLanguage('googleSignOut'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 

      <stack.Screen name={'CreateEventScreen'} component={CreateEventScreen} 
        options={{
        headerTitle: getTextForSelectedLanguage('createEvent'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 

      <stack.Screen name={'DeleteEvent'} component={DeleteEvent} 
        options={{
        headerTitle: getTextForSelectedLanguage('deleteEvent'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 

      <stack.Screen name={'Feedback'} component={Feedback}
        options={{
        headerTitle: getTextForSelectedLanguage('feedback'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 
        <stack.Screen name={'ExternalService'} component={ExternalService}
        options={{
        headerTitle: getTextForSelectedLanguage('externalService'),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'orange',
        }}} /> 
        

      <stack.Screen name={'ImageScreen'} component={ImageScreen}
        options={{
        headerShown:false
        }} /> 

      <stack.Screen name={'VideoScreen'} component={VideoScreen}
        options={{
          headerShown:false
        }} /> 
        <stack.Screen name={'AudioPlay'} component={AudioPlay}
        options={{
          headerShown:false
        }} />

      <stack.Screen name={'Main'} component={BottomTabs} options={{ 
        // headerTitle: getTextForSelectedLanguage('login'),
        // headerTitleAlign: 'center',
        // headerStyle:{
        //   backgroundColor:'orange'
        // }
        headerShown:false,
        }} /> 
    </stack.Navigator>
  </NavigationContainer>
  </KeyboardAvoidingView>
  )
}
export default BottomTabNavigator;
