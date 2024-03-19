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
import { useTheme } from "./settingScreenProperties/ThemeContext";
import { useLanguage } from "./settingScreenProperties/LanguageContext";
import { useFontSize } from "./settingScreenProperties/FontSizecontext";


 
 
 
const SettingsScreen = () => {
    const {isDarkMode, toggleTheme} = useTheme();
    const { selectedLanguage, changeLanguage, getTextForSelectedLanguage } = useLanguage();
    const { fontSize, setFontSize } = useFontSize();
    const [data, setData] = useState(null); 
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    
 
    const getTextColor = () => {
      return isDarkMode ? '#fff' : '#333'; 
    };
 
    const containerStyle = {
      ...styles.container,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center', 
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
        const response = await fetch('http://172.18.2.82:7071/api/user/getAllEmployees');
 
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
 
        const newData = await response.json();
 
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
          setData(newData);
          setFilteredOrganizations(newData.map(item => item.organization));
         await AsyncStorage.setItem('offlineData', JSON.stringify(newData));
 
          
          Alert.alert('Sync Successful', 'Data has been synchronized.');
        } else {
          
          Alert.alert('No Changes', 'Data is already up to date.');
        }
      } catch (error) {
       
        Alert.alert('Sync Failed', error.message);
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
      <View style={[containerStyle, styles.screen]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: getTextColor(),fontSize:fontSize,marginRight:150 }]}>
        {getTextForSelectedLanguage('theme')}               :
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <MaterialCommunityIcons
            name={isDarkMode ? 'weather-sunny' : 'weather-night'}
            size={24}
            color={getTextColor()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: getTextColor(),fontSize:  fontSize,marginRight:20 }]}>
        {getTextForSelectedLanguage('syncData')}                 :
        </Text>
        <TouchableOpacity onPress={handleSync} >
        <Text style={{ color: getTextColor(), marginRight: 160 }}>
        {getTextForSelectedLanguage('syncData')}
        </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: getTextColor(),fontSize:fontSize }]}>
        {getTextForSelectedLanguage('fontSize')}
        </Text>
        <TextInput style={styles.inputBox} placeholder={getTextForSelectedLanguage('enterfontsize')} placeholderTextColor={isDarkMode?'white':'#000'} onChangeText={handleFontSizeChange} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: getTextColor(),fontSize }]}>
        {getTextForSelectedLanguage('selectLanguage')}              :
        </Text>
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
    </View>
   
    );
};
 
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent:'space-between',
  },
  label: {
    marginRight: 50,
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:10,
    padding: 8,
    marginLeft: 10,
    fontSize:20,
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