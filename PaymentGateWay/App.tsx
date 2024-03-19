import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentScreen from './src/screens/payments/PaymentScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;