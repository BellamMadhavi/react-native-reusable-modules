import React from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { _signOutWithGoogle } from '../../config/firebase/GoogleSignOut';
import { useTheme } from '../settingsContent/ThemeContext';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import RoundButtonComp from '../../components/RoundButtonComp';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

const GoogleLogin = ({ navigation }) => {
  const { fontSize } = useFontSize();
  const { getTextForSelectedLanguage } = useLanguage();
  const { isDarkMode } = useTheme();

  const signOutWithGoogle = async () => {
    await _signOutWithGoogle();
    console.log('User signed out');
  };

  return (
    <ScrollView style={{backgroundColor: isDarkMode ? '#333' : '#fff'}}>
    <View style={{ felx:1 }}>
       <View style={{alignItems:'center',justifyContent:'center',marginTop:30}}> 
            <RoundButtonComp label={getTextForSelectedLanguage('signOut')} onPress={()=>{signOutWithGoogle();
          navigation.navigate('SignInScreen');}} />
       </View> 
       <AnalyticsScreen screenName='GoogleLogin' screenClass='GoogleLogin' />
    </View>
    </ScrollView>
  );
};

export default GoogleLogin;
