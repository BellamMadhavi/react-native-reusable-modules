import React,{useEffect} from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAvoidingView, Platform } from 'react-native';
import ProfileScreen from './userprofile/UserProfileScreen';
import SignInScreen from './signIn/SignInScreen';
const profile='Profile';
const Tab=createBottomTabNavigator();
const stack=createNativeStackNavigator();
const BottomTabNavigator=()=>{
  function BottomTabs() {
    const { params } = useRoute();
const loginResponse = params?.loginResponse;
    return (
        <Tab.Navigator screenOptions={{
          tabBarLabelStyle :{
            fontSize: 12,
            color:'#000000'
        },
        tabBarStyle:{
          backgroundColor:'white',
          height:36+12,
        }
        }} >
 
          <Tab.Screen
           name={profile}
            component={ProfileScreen}
            initialParams={{ useLoginResponse: loginResponse }} 
             options={{tabBarLabel:'Profile',
             tabBarIcon:({color,size}) => (
            <AntDesign name='profile' size={size} color={color} />
          ),
          tabBarLabel:'Profile',
          headerShown:false
          }}/>
 
        </Tab.Navigator>
      );
    }
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
  <NavigationContainer>
    <stack.Navigator screenOptions={{
      headerTitleStyle:{
        fontSize:12
      }
    }}>
      <stack.Screen name={'SignInScreen'} component={SignInScreen} options={{
        headerTitle: 'Login',
        headerTitleAlign: 'center',
        headerStyle:{
          backgroundColor:'orange'
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
