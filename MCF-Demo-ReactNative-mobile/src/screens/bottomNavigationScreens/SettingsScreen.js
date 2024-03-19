import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../settingsContent/ThemeContext";
import { useLanguage } from "../settingsContent/LanguageContent";
import { useFontSize } from "../settingsContent/FontSizeContent";
import APIs from "../api/api";
import AnalyticsScreen from "../analyticsCode/AnalyticsScreen";
import RoundButtonComp from "../../components/RoundButtonComp";

 
const SettingsScreen = ({navigation}) => {
    const {isDarkMode, toggleTheme} = useTheme();
    const { selectedLanguage, changeLanguage, getTextForSelectedLanguage } = useLanguage();
    const { fontSize, setFontSize } = useFontSize();
    const [data, setData] = useState(null); 
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    
    const getTextColor = () => {
      return isDarkMode ? '#fff' : '#333'; 
    };
 
    const handleFontSizeChange = (text) => {
      if (text.trim() !== '') {
        const inputFontSize = parseInt(text);
    
        if (!isNaN(inputFontSize) && inputFontSize >= 12 && inputFontSize <= 24) {
         
          setFontSize(inputFontSize);
        } 
        else{
          setFontSize(16);
        }
      } 
    };
    
    const syncData = async () => {
      try {
        const response = await fetch(APIs.getemployees);
 
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
 
        const newData = await response.json();
 
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
          setData(newData);
          setFilteredOrganizations(newData.map(item => item.organization));
         await AsyncStorage.setItem('offlineData', JSON.stringify(newData)); 
          Alert.alert(getTextForSelectedLanguage('syncSuccess'), getTextForSelectedLanguage('syncDataSucees'));
        } else {
          
          Alert.alert(getTextForSelectedLanguage('noChange'), getTextForSelectedLanguage('alreadySync'));
        }
      } catch (error) {
       
        Alert.alert(error.message);
      }
    };
 
    const handleSync = () => {
      syncData();
    };

    const handleLanguageChange = (language) => {
      changeLanguage(language); 
    };

    const getPickerColor = () => {
      return isDarkMode ? '#fff' : '#000'; 
    };
 
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { color: getTextColor(),fontSize:fontSize,marginRight:100}]}>{getTextForSelectedLanguage('theme')} :</Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
            <MaterialCommunityIcons
              name={isDarkMode ? 'weather-sunny' : 'weather-night'}
              size={24}
              color={getTextColor()}
            />
          </TouchableOpacity>
        </View>
  
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, {color: getTextColor(),fontSize:fontSize,marginRight:100}]}>{getTextForSelectedLanguage('syncData')}</Text>
          <TouchableOpacity onPress={handleSync} >
            <Text style={[styles.tableCell,{color: getTextColor(),fontSize:fontSize,marginRight:100,color:'blue'}]}>{getTextForSelectedLanguage('syncData')}</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, {color: getTextColor(),fontSize:fontSize,marginRight:100}]}>{getTextForSelectedLanguage('fontSize')}</Text>
          <TextInput
        placeholder={getTextForSelectedLanguage('enterFontSize')}
        placeholderTextColor={isDarkMode?'white':'#000'}
        style={[styles.inputBox,{fontSize:fontSize,color:isDarkMode?'white':'#000'}]}
        onChangeText={handleFontSizeChange}
        value={fontSize!== 16 ? fontSize.toString() : {handleFontSizeChange}}
        
      />
        </View>
  
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, {color: getTextColor(),fontSize:fontSize,marginRight:100}]}>{getTextForSelectedLanguage('selectLanguage')}</Text>
          <Picker
            style={[styles.pickerdata, { color: getPickerColor(), backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
          >
            <Picker.Item label="English" value="english" />
            <Picker.Item label="German" value="german" />
            <Picker.Item label="中國人" value="chinese" />
          </Picker>
        </View>
        <View style={{
        marginTop:10,
        alignItems:'center',
        flexDirection:'row',
        }} >
          <RoundButtonComp label={getTextForSelectedLanguage('feedback')} onPress={()=>navigation.navigate('Feedback')} />
          <RoundButtonComp label={getTextForSelectedLanguage('externalService')} onPress={()=>navigation.navigate('ExternalService')}/>
      </View>
        <AnalyticsScreen screenName='SettingsScreen' screenClass='SettingsScreen' />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 30,
      paddingTop: 230,
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'space-between',
      width:'60%'
    },
    tableCell: {
      marginRight: 50,
    },
    inputBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 8,
      marginRight:100,
      width:'60%'
    },
    toggleButton: {
      marginRight: 80,
    },
    pickerdata: {
      height: 50,
      width: 150,
    },
  });
 
export default SettingsScreen;