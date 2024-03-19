import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, Image } from 'react-native';
import APIs from '../api/api';
import { useTheme } from "../settingsContent/ThemeContext";
import { useLanguage } from "../settingsContent/LanguageContent";
import { useFontSize } from "../settingsContent/FontSizeContent"; 
import RoundButtonComp from '../../components/RoundButtonComp';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
import Validations from '../validations';

const ProfileScreen = ({route}) => {
  const { useLoginResponse } = route.params;
  const [userProfile, setUserProfile] = useState(null);
  const authToken = useLoginResponse.accessToken;
  const email =useLoginResponse.email;
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isDataModified, setIsDataModified] = useState(false);
  const {fontSize}=useFontSize();
  const {getTextForSelectedLanguage} = useLanguage();
  const {isDarkMode}=useTheme();
  const apiUrl = APIs.userProfile+`/${encodeURIComponent(email)}`;

  const getUserProfile = async () => {
   
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setContactNumber(userData.contactNumber);
      } else {
        console.error('Failed to fetch user profile data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error.message);
    }
  };

  const updateUserProfile = async () => {
      
    const contactno =await Validations.isContactNumberValid(contactNumber);
    if (!firstName|| !lastName || !contactNumber) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('allFieldsRequired'));
    } else if (!contactno) {
      Alert.alert(getTextForSelectedLanguage('validationError'),getTextForSelectedLanguage('phnoValidation'));
    }else{
    
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          contactNumber,
        }),
      });

      if (response.ok) {
        const updatedUserProfile = await response.json();
        setUserProfile(updatedUserProfile);
        setEditMode(false); 
        setIsDataModified(false); 
      } else {
        console.error('Failed to update user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  }
  };

  useEffect(() => {
    getUserProfile();
  }, []); 

  useEffect(() => {
    if (userProfile) {
      setIsDataModified(
        firstName !== userProfile.firstName ||
        lastName !== userProfile.lastName ||
        contactNumber !== userProfile.contactNumber
      );
    }
  }, [firstName, lastName, contactNumber, userProfile]);

  return (
    
    <View style={[styles.usercontainer,{backgroundColor:isDarkMode?'#333':'white',}]}>
      <View>
        <Image style={styles.imageStyle}
        resizeMode={'contain'}
        source={require('../../asserts/motivity.jpg')} />
      </View>
      {editMode ? (
        <View>
         <View>
          <Text style={[styles.label,{marginBottom:2}]}>{getTextForSelectedLanguage('firstName')}</Text>
          <TextInput
            placeholder={getTextForSelectedLanguage('firstName')}
            value={firstName}
            onChangeText={(value) => {
              setFirstName(value);
              setIsDataModified(true);
            }}
            style={[styles.updatetextinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',marginBottom:3}]}
            placeholderTextColor={isDarkMode?'white':'#000'}
          />
          </View>
          <View>
          <Text style={styles.label}>{getTextForSelectedLanguage('lastName')}</Text>
          <TextInput
            placeholder={getTextForSelectedLanguage('lastName')}
            value={lastName}
            onChangeText={(value) => {
              setLastName(value);
              setIsDataModified(true);
            }}
            style={[styles.updatetextinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',marginBottom:3}]}
            placeholderTextColor={isDarkMode?'white':'#000'}
          />
          </View>
          <View>
          <Text style={styles.label}>{getTextForSelectedLanguage('contactNumber')}</Text>
          <TextInput
            placeholder={getTextForSelectedLanguage('contactNumber')}
            value={contactNumber.toString()}
            onChangeText={(value) => {
              setContactNumber(value);
              setIsDataModified(true);
            }}
            style={[styles.updatetextinput,{fontSize:fontSize,color:isDarkMode?'white':'#000',marginBottom:5}]}
            placeholderTextColor={isDarkMode?'white':'#000'}
          />
          </View>
          
          <View style={{alignItems:'center',padding:5,marginTop:20,flexDirection:'row'}}>
        <RoundButtonComp label={getTextForSelectedLanguage('saveProfile')} onPress={()=>{updateUserProfile(); }} />
        <RoundButtonComp label={getTextForSelectedLanguage('cancel')} onPress={() => setEditMode(false)} />
      </View>
      
          
        </View>
      ) : (
        <View>
           <View>
          <Text style={[styles.textinput,{color:isDarkMode?'white':'gray',fontSize:fontSize}]}>{getTextForSelectedLanguage('firstName')}:</Text>
          <Text style={{color:isDarkMode?'white':'#000',fontSize:fontSize,marginLeft:20,}}> {userProfile?.firstName}</Text>
          </View>
          <View>
          <Text style={[styles.textinput,{color:isDarkMode?'white':'gray',fontSize:fontSize}]}>{getTextForSelectedLanguage('lastName')}:</Text>
          <Text style={{color:isDarkMode?'white':'#000',fontSize:fontSize,marginLeft:20,}}> {userProfile?.lastName}</Text>
          </View>
          <View>
          <Text style={[styles.textinput,{color:isDarkMode?'white':'gray',fontSize:fontSize}]}>{getTextForSelectedLanguage('emailAddress')}:</Text>
          <Text style={{color:isDarkMode?'white':'#000',fontSize:fontSize,marginLeft:20,}}> {email}</Text>
          </View>
          <View>
          <Text style={[styles.textinput,{color:isDarkMode?'white':'gray',fontSize:fontSize}]}>{getTextForSelectedLanguage('contactNumber')}:</Text>
          <Text style={{color:isDarkMode?'white':'#000',fontSize:fontSize,marginLeft:20,}}> {userProfile?.contactNumber}</Text>
          </View>
          <View style={{alignItems:'center',padding:5,marginTop:60,justifyContent:'center',marginLeft:100}}>
        <RoundButtonComp label={getTextForSelectedLanguage('editProfile')} onPress={() => setEditMode(true)} />
      </View>
      
        </View>
      )}
      <AnalyticsScreen screenName='ProfileScreen' screenClass='ProfileScreen' />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  usercontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
   
  },
  textinput:{
    padding:12,
    marginLeft:10,
  },
  updatetextinput:{
    borderWidth:0.2,
    borderRadius:6,
    marginBottom:20,
    marginLeft:30,
    paddingLeft:20
  },
  buttoncontainer: {
    marginTop: 20,
    width:200,
    marginLeft:90,
  },
  label:{
    marginBottom:5,
    marginLeft:30,
  },
  imageStyle:{
    aspectRatio: 3.0,
    marginLeft:'8%',
    marginBottom:100,
    marginBottom:100,
  },
})