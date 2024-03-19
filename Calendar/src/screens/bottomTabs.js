import React,{ useEffect } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAvoidingView, Platform } from 'react-native';
import SignInScreen from './signIn/SignInScreen';
import CreateEventScreen from './calendar/CreateEventScreen';
import DeleteEvent from './calendar/DeleteEventScreen';
import CalenderScreen from './calendar/CalenderScreen';

const calendar='Calender';
const Tab=createBottomTabNavigator();
const stack=createNativeStackNavigator();

const BottomTabNavigator=()=>{
    function BottomTabs() {
        const { params } = useRoute();
        const loginResponse = params?.loginResponse;
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name={calendar}
                    component={CalenderScreen} 
                    initialParams={{ useLoginResponse: loginResponse }} 
                    options={{
                        tabBarLabel: 'Events',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="calendar" size={size} color={color} /> 
                        ),
                        headerShown: false
                    }}
                />
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
                <stack.Navigator>
                    <stack.Screen 
                        name={'SignInScreen'} 
                        component={SignInScreen} 
                        options={{
                            headerTitle: 'Login',
                            headerTitleAlign: 'center',
                            headerStyle:{
                                backgroundColor:'orange'
                            }
                        }} 
                    />
                    <stack.Screen 
                        name={'CreateEventScreen'} 
                        component={CreateEventScreen} 
                        options={{ headerShown: false }} 
                    />
                    <stack.Screen 
                        name={'DeleteEvent'} 
                        component={DeleteEvent} 
                        options={{ headerShown: false }} 
                    />
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
