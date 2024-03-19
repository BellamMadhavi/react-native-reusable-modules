import React, { useState } from 'react';
import { Text, View, TextInput,Alert,Button } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleSubmitFeedback = () => {
    if(rating!=0 && feedback!=''){
      Alert.alert(`Thanks for Rating: ${rating} and saved your feedback: ${feedback}`);
    }else{
      Alert.alert('ValidationError','Rating and feedback must not be empty');
    }
  };

  return (
    <View style={{flex:1}}>
      <Text style={{ color: 'black', textAlign: 'center', marginVertical: 20 }}>
        React Native Ratings
      </Text>
      <AirbnbRating
        reviews={["Poor","Bad","OK", "Good","Excellent"]}
        count={5}
        showRating={true}
        onFinishRating={handleRating} 
      />
      <Text style={{ textAlign: 'center', marginVertical: 10}}>
        Rated: {rating}
      </Text>
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
        placeholder="Enter Feedback Here"
        onChangeText={handleFeedbackChange}
        placeholderTextColor='#000'
        multiline
      />
      <View style={{ alignItems: 'center' }}>
        <Button
          title='Submit'
          onPress={handleSubmitFeedback}
        />
      </View>
    </View>
  );
}

