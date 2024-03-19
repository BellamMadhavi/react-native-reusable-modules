
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChoosingScreen from './src/screens/ChoosingScreen';
import ImageScreen from './src/screens/ImageScreen';
import VideoScreen from './src/screens/VideoScreen';
import FileScreen from './src/screens/FileScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ChoosingScreen" component={ChoosingScreen} options={{headerShown: false,headerTitleAlign:'center'}} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerStyle:{backgroundColor:'orange'},headerTitleAlign:'center'}}/>
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{headerStyle:{backgroundColor:'orange'},headerTitleAlign:'center'}}/>
        <Stack.Screen name="FileScreen" component={FileScreen} options={{headerStyle:{backgroundColor:'orange'},headerTitleAlign:'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;