import React,{useEffect} from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './signIn';
import GoogleLogin from './googleLogin';
import { KeyboardAvoidingView, Platform } from 'react-native';

const stack=createNativeStackNavigator();


const BottomTabNavigator=()=>{


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
       
    </stack.Navigator>
  </NavigationContainer>
  </KeyboardAvoidingView>
  )
}
export default BottomTabNavigator;
