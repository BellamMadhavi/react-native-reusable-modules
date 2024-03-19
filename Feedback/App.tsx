import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedbackScreen from './src/screens/Feedback';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen}
        options={{
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: 'orange', 
          },          
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

