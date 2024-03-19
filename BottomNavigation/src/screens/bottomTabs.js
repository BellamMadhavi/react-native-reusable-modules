import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';


const homeName='Home';
const settings='Settings';
const profile='Profile'
const Tab=createBottomTabNavigator();
const stack=createNativeStackNavigator();


const BottomTabNavigator=()=>{
  
  function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
          tabBarLabelStyle :{
            color:'#000000'
        },
        tabBarStyle:{
          backgroundColor:'white',
        },
        }}>
          <Tab.Screen
           name={homeName}
           component={HomeScreen}
           options={{tabBarLabel:'Home',
           tabBarIcon:({color,size}) => (
            <AntDesign name='home' size={size} color={color} />
          ),
          tabBarLabel:'Home',
          headerShown:false
          }}/>
        

 
          <Tab.Screen
           name={profile}
            component={ProfileScreen}
             options={{tabBarLabel:'Profile',
             tabBarIcon:({color,size}) => (
            <AntDesign name='profile' size={size} color={color} />
          ),
          tabBarLabel:'Profile',
          headerShown:false
          }}/>
 
          <Tab.Screen
           name={settings}
            component={SettingsScreen}
             options={{tabBarLabel:'Settings',
             tabBarIcon:({color,size}) => (
            <Feather name='settings' size={size} color={color} />
          ),
          tabBarLabel:'Settings',
          headerShown:false
          }}/>
 
        </Tab.Navigator>
      );
    }
  return(
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <NavigationContainer>

     
        <stack.Navigator>
          <stack.Screen
            name={'Main'}
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        </stack.Navigator>

    </NavigationContainer>
    </KeyboardAvoidingView>

  )
}
export default BottomTabNavigator;
