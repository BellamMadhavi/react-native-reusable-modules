import React from 'react';
import {Text,View} from 'react-native';
import RoundButtonComp from '../../components/RoundButtonComp';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
export default function ChoosingScreen({navigation}){
    const {fontSize}=useFontSize();
    const {getTextForSelectedLanguage}=useLanguage();
    const {isDarkMode}=useTheme();
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:isDarkMode?'#333':'white',}}>
            <View style={{flexDirection:'row'}}>
                <RoundButtonComp label={getTextForSelectedLanguage('image')} onPress={()=>navigation.navigate('ImageScreen')}/>
                <RoundButtonComp label={getTextForSelectedLanguage('video')} onPress={()=>navigation.navigate('VideoScreen')}/>
                <RoundButtonComp label={getTextForSelectedLanguage('music')} onPress={()=>navigation.navigate('AudioPlay')}/>
            </View>
            <AnalyticsScreen screenName='ChoosingScreen' screenClass='ChoosingScreen'/>
        </View>
    )
}