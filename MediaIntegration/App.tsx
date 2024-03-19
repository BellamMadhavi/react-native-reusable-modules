import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChoosingScreen from './src/screens/ChoosingScreen';
import VideoScreen from './src/screens/VideoScreen';
import AudioPlay from './src/screens/AudioPlay';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ChoosingScreen" component={ChoosingScreen} options={{headerShown:false}} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{headerShown:false}} />
        <Stack.Screen name="AudioPlay" component={AudioPlay} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;