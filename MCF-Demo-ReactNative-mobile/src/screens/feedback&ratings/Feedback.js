import React, { useState } from 'react';
import { Text, View, TextInput,Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import RoundButtonComp from '../../components/RoundButtonComp';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import { useFontSize } from '../settingsContent/FontSizeContent';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage} = useLanguage();
  const {isDarkMode}=useTheme();

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleSubmitFeedback = () => {
    if(rating!=0 && feedback!=''){
      Alert.alert(`${getTextForSelectedLanguage('feedbackalert')}: ${rating}, ${getTextForSelectedLanguage('feedback')}: ${feedback}`);
    }else{
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('ratingalert'));
    }
  };

  return (
    <View style={[{backgroundColor:isDarkMode?'#333':'white',flex:1}]}>
      <Text style={{ fontSize:fontSize, color: 'black', textAlign: 'center', marginVertical: 20 ,color:isDarkMode?'white':'#000'}}>
        {getTextForSelectedLanguage('reactnativeratings')}
      </Text>
      <AirbnbRating
      style={{fontSize:fontSize}}
        reviews={[getTextForSelectedLanguage('poor'),getTextForSelectedLanguage('bad'), getTextForSelectedLanguage('ok'), getTextForSelectedLanguage('good'), getTextForSelectedLanguage('excellent')]}
        count={5}
        showRating={true}
        onFinishRating={handleRating} 
      />
      <Text style={{ textAlign: 'center', marginVertical: 10,fontSize:fontSize,color:isDarkMode?'white':'#000'}}>
        {getTextForSelectedLanguage('rated')}: {rating}
      </Text>
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10,fontSize:fontSize }}
        placeholder={getTextForSelectedLanguage('enterFeedback')}
        onChangeText={handleFeedbackChange}
        placeholderTextColor={isDarkMode?'white':'#000'}
        multiline
      />
      <View style={{ alignItems: 'center' }}>
        <RoundButtonComp
          label={getTextForSelectedLanguage('submit')}
          onPress={handleSubmitFeedback}
        />
      </View>
      <AnalyticsScreen screenName='Feedback' screenClass='Feedback' />
    </View>
  );
}

