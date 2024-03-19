import react,{useState} from 'react';
import {View,Image,TextInput,StyleSheet,ScrollView,Alert} from 'react-native';
import RoundButtonComp from '../../components/RoundButtonComp';
import AuthAPIService from '../AuthAPIService';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import Validations from '../validations';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function ResetPasswordScreen({navigation,route}){
  const [changePasswordId, setChangePasswordId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage}=useLanguage();
  const {isDarkMode}=useTheme();

  const handleResetPassword = async () => {
    const newpassword = Validations.isNewPasswordValid(newPassword);
    if (!changePasswordId|| !newPassword || !confirmPassword) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('allFieldsRequired'));
    } else if (!newpassword) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('invalidPassword') );
    }else if(newPassword !== confirmPassword) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('newAndConfirmPasswordSame'))
      console.error("New Password and Confirm Password must be same");
    }else{
      const receivedData = route.params?.data || 'No data received';
      try{
        const resetData = {
          "email": receivedData,
          "changePasswordId": changePasswordId,
          "newPassword": newPassword,
        };
        const response = await AuthAPIService.Reset_Password(resetData);
        Alert.alert('reset successful')
        navigation.navigate('Main')
      }
      catch(error){
        console.log(error.message);
        Alert.alert(error.message);
      }
    }
  }

  return(
  <ScrollView style={{backgroundColor:isDarkMode?'#333':'#fff'}}>
    <View style={{flex:1.5}}>
      <View >
        <Image style={styles.imageStyle}
            resizeMode={'contain'}
            source={require('../../asserts/motivity.jpg')} />
        </View>

        <View style={{
                borderBottomColor: 'black',
                borderBottom:1,
                }}>
                <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('emailOTP')} placeholderTextColor="#ccc" value={changePasswordId} onChangeText={(text) => setChangePasswordId(text.trim())} />
                <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('newPassword')} placeholderTextColor="#ccc" value={newPassword} onChangeText={(text)=>setNewPassword(text.trim())} secureTextEntry={true} />
                <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('confirmPassword')} placeholderTextColor="#ccc" value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text.trim())} secureTextEntry={true} />

        </View>
        <View style={{alignItems:'center',padding:5,marginTop:20,marginBottom:5}}>
            <RoundButtonComp label={getTextForSelectedLanguage('submit')} onPress={()=>{handleResetPassword();}} />
        </View>
        <AnalyticsScreen screenName='ResetPasswordScreen' screenClass='ResetPasswordScreen' />
      </View>
       </ScrollView> 
  )
};
const styles=StyleSheet.create({
  input: {
    width: 300,
    marginTop: 10,
    borderWidth:0.5,
    borderColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 40,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  imageStyle:{
    aspectRatio: 3.0,
    marginLeft:25,
    marginRight:10,
    marginTop:50,
    marginBottom:20
  }

})