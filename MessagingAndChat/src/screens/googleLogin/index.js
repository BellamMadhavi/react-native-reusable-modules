import React from 'react';
import { View, Button,Text } from 'react-native';
import { _signOutWithGoogle} from '../../config/firebase/GoogleSignOut';
const GoogleLogin = ({navigation}) => {

  const signOutWithGoogle = async () => {
    await _signOutWithGoogle();
    console.log('User signed out');
  };

  return (
    <View>
      <Button title="Sign Out" onPress={()=>{signOutWithGoogle();navigation.navigate('SignInScreen')} }/>
    </View>
  );
};

export default GoogleLogin;