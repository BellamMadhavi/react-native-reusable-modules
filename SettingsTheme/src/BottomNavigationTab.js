import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import { useLanguage } from "./settingScreenProperties/LanguageContext";
import { useFontSize } from "./settingScreenProperties/FontSizecontext";
import { useTheme } from "./settingScreenProperties/ThemeContext";

 
 
export default function BottomNavigationTab (){

  const { getTextForSelectedLanguage } = useLanguage();
  const { fontSize } = useFontSize();
  const { isDarkMode } = useTheme();

  const homeLabel = getTextForSelectedLanguage('homeLabel');
  const profileLabel = getTextForSelectedLanguage('profileLabel');
  const settingsLabel = getTextForSelectedLanguage('settingsLabel');
   
    const tab = createBottomTabNavigator();
    return(
        <tab.Navigator  screenOptions={{
            tabBarLabelStyle: {
              fontSize: fontSize,
              color: isDarkMode ? '#FFFFFF' : '#000000',
            },
            tabBarStyle : {
              backgroundColor: isDarkMode ? '#333' : 'white',
            }
          }}>
            <tab.Group screenOptions={{headerShown:false}}>
            <tab.Screen
           name='home'
           component={HomeScreen}
           options={{tabBarLabel:'Home',
           tabBarIcon:({color,size}) => (
            <AntDesign name='home' size={size} color={color} />
          ),
          tabBarLabel: homeLabel
          ,headerShown:false
          }}/>

 
                <tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarLabel:'Settings',
                    tabBarIcon:({color,size}) =>(
                        <Feather name="settings" color={color} size = {size} />
                    ),
                    tabBarLabel:settingsLabel,
                    headerShown:false
                }}
                >
                </tab.Screen>
 
            </tab.Group>
        </tab.Navigator>
    );
}