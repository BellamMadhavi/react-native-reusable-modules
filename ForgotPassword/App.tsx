import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPassword';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{headerShown:false}} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown:false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;