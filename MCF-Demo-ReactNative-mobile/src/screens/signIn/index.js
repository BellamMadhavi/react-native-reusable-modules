import React,{useState,useEffect} from 'react';
import {ScrollView, Text,View, Image,TextInput, StyleSheet, Alert, Dimensions} from 'react-native';
import RoundButtonComp from "../../components/RoundButtonComp";
import FullRoundButtonComp from "../../components/FullRoundButtonComp";
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import { _signOutWithGoogle} from '../../config/firebase/GoogleSignOut';
import { LoginManager, AccessToken, Settings, GraphRequest } from 'react-native-fbsdk-next';
import AuthAPIService from '../AuthAPIService';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import GDPRPopup from '../../GDPRContent';
import Validations from '../validations';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SIZES,COLORS } from '../../constants/theme';
import { useUser } from '../../UserContent';
const slides=[
  {
    id:1,
    title:'',
    description:'',
    // title: "onBording Screen1",
    // description: "onbording screen1",
    image: require('../../asserts/onboarding1.jpg')
  },
  {
    id:2,
    // title: "onboading screen2",
    // description: 'onboarding screen2',
    image: require('../../asserts/onboarding2.jpg')
  },
  {
    id:3,
    // title:'onbording screen3',
    // description:'onboarding screen3',
    image: require('../../asserts/onboarding3.jpg')
  }
  
]
export default function SignInScreen({navigation}){
  const {setUser} = useUser(); 
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage}=useLanguage();
  const {isDarkMode}=useTheme();
  const [showPopUp,setShowPopUp]=useState(false);
  const { width, height } = Dimensions.get('window');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
    
  const handleLogin = async() => {

    const email = await Validations.isEmailValid(credentials.email);
    const password = await Validations.isPasswordValid(credentials.password);

    if (!credentials.email|| !credentials.password) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('allFieldsRequired'));
    } else if (!email) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('invalidEmail'));
    } else if (!password) {
      Alert.alert(getTextForSelectedLanguage('validationError'), getTextForSelectedLanguage('invalidPassword'));
    }else{
      try{
        const loginData = {
          "email": credentials.email,
          "password": credentials.password,
        };
        const response = await AuthAPIService.userLogin(loginData)
        console.log(JSON.stringify(credentials));
        navigation.navigate('Main', { loginResponse: response });
      }catch(error){
        console.log('Login failed:', error.message);
        Alert.alert(error.message);
      }
    }
  }
    
  //facebook setup
  try{
    Settings.setAppID('363709662709849');
    Settings.initializeSDK();
  }catch{
    console.log('=>error data')
  }

    
  const signInWithGoogle = async () => {
    const userInfo = await _signInWithGoogle();
    if (userInfo) {
      setUser(userInfo);
      console.log('User signed in:', userInfo); 
    } else {
      console.log('Sign-in failed');
    }
  };
  
  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    const data = await AccessToken.getCurrentAccessToken();
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    return auth().signInWithCredential(facebookCredential);
  }

  useEffect(()=>{
    setShowPopUp(true)
  },[])

  const [showHomePage, setShowHomePage] = useState(false);
    const buttonLabel = (label)=>{
      return(
        <View style={{padding:12}}>
          <Text style={{color:COLORS.title,fontWeight:600,fontSize:SIZES.h4}}>
            {label}
        </Text>
        </View>
      )
    }
    if(!showHomePage){
      return(
        <AppIntroSlider 
        data={slides}
        renderItem={({item})=>{
          return(
            <View style={{flex:1,alignItems:'center',padding:15,paddingTop: 100}}> 
              <Image 
              source={item.image}
              style={{
                width: SIZES.width = 80,
                height: 400,
              }}
              resizeMode='contain'
              />
              <Text style={{fontWeight:'bold',color:COLORS.title,fontSize:SIZES.h1}}>{item.title}</Text>
              <Text style={{textAlign:'center',paddingTop:5,color:COLORS.title}}>{item.description}</Text>
            </View>
          )
        }}
        activeDotStyle={{ 
          backgroundColor:COLORS.primary,
          width:30
        }}
        showSkipButton
        renderNextButton={()=>buttonLabel("Next")}
        renderSkipButton={()=>buttonLabel('Skip')}
        renderDoneButton={()=>buttonLabel("Done")}
        onDone={()=>{
          setShowHomePage(true)
        }}
        />
      )
    }

  return(
  <ScrollView style={{backgroundColor:isDarkMode?'#333':'#fff',width, height}} > 
  {showPopUp && (<GDPRPopup  onClose={()=>setShowPopUp(false)}/>)}
    <View style={{flex:1.5}}>
      <View >
        <Image style={styles.imageStyle}
        resizeMode={'contain'}
        source={require('../../asserts/motivity.jpg')} />
      </View>
        
      <View style={{
        borderBottomColor: 'black',
        borderBottom:1,
        marginBottom: 10,}}>
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('email')} placeholderTextColor='#ccc' value={credentials.email} onChangeText={(text)=>setCredentials({...credentials,email: text.trim()})} />
          <TextInput style={[styles.input,{fontSize:fontSize}]} placeholder={getTextForSelectedLanguage('password')} value={credentials.password} onChangeText={(text)=>setCredentials({...credentials,password: text.trim()})} placeholderTextColor='#ccc' secureTextEntry={true} />
      </View>

      <View style={{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'center'}}>
          <RoundButtonComp label={getTextForSelectedLanguage('forgotPassword')}  onPress={()=>navigation.navigate('ForgetPasswordScreen')} />
          <RoundButtonComp label={getTextForSelectedLanguage('login')} onPress={()=>{handleLogin(); }}  />
      </View>
        
      <View style={{
        marginTop:30,
        flexDirection:'row',}} >
          <Text style={{color: '#666',marginLeft:50,marginBottom:20,marginTop:10,fontSize:fontSize}}>{getTextForSelectedLanguage('noAccount')}</Text> 
          <Text><RoundButtonComp label={getTextForSelectedLanguage('signUp')} onPress={()=>navigation.navigate('SignUpScreen')} /></Text>
      </View>

      <View style={{
        flexDirection:'row',
         marginTop:20,
        alignItems:'center',
        justifyContent:'center',
      }}>
          <FullRoundButtonComp image={require('../../asserts/google.png')} onPress={()=>{signInWithGoogle();navigation.navigate('GoogleLogin');}}  ></FullRoundButtonComp>
          <FullRoundButtonComp image={require('../../asserts/facebook.png')} onPress={()=>{onFacebookButtonPress();}} ></FullRoundButtonComp>
      </View>
      <AnalyticsScreen screenName='SignInScreen' screenClass='SignInScreen'/>
    </View>
  </ScrollView>
  )
}

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
      backgroundColor: 'white',
      },
      imageStyle:{
        aspectRatio: 3.0,
        marginLeft:'10%',
        marginTop:40,
        marginBottom:20
      }

})



