import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; 
import OrganizationCell from './settingScreenProperties/OrganizationCell';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFontSize } from './settingScreenProperties/FontSizecontext';
import { useLanguage } from './settingScreenProperties/LanguageContext';
import { useTheme } from './settingScreenProperties/ThemeContext';



export default function HomeScreen() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { fontSize } = useFontSize();
  const { isDarkMode } = useTheme();
  const { getTextForSelectedLanguage} = useLanguage();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    fetchData();

    return () => {
      unsubscribe();
    };
  }, []);


  const handleConnectivityChange = state => {
    setIsConnected(state.isConnected);
  };

  const fetchData = async () => {
    try {
      if (!isConnected) {
       
        const offlineData = await AsyncStorage.getItem('offlineData');
        if (offlineData !== null) {
          setData(JSON.parse(offlineData));
          setFilteredOrganizations(
            JSON.parse(offlineData).map(item => item.organization)
          );
          setIsLoading(false);
          return;
        } else {
          throw new Error('No offline data available');
        }
      }

      const response = await fetch(
        'http://172.18.2.82:7071/api/user/getAllEmployees'
      );

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
      setFilteredOrganizations(jsonData.map(item => item.organization));
      await AsyncStorage.setItem('offlineData', JSON.stringify(jsonData));
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchClick = async () => {
    setIsSearchClicked(prevState => !prevState);
    if (!isSearchClicked) {
      setSearchInput(''); 
      await fetchData(); 
    }
  };

  const handleSearch = text => {
    setSearchInput(text);
    const filtered = data.filter(item =>
      item.organization.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOrganizations(filtered.map(item => item.organization));
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handleSearchBlur = () => {
    setSearchInput('');
    setIsSearchClicked(false);
  };

  const renderSearchIcon = () => {
    return (
      <TouchableOpacity onPress={handleSearchClick}>
        <EvilIcons name="search" size={20} color="black" style={styles.icon} />
      </TouchableOpacity>
    );
  };

  const renderCancelIcon = () => {
    return (
      <TouchableOpacity onPress={handleSearchBlur}>
        <MaterialIcons name="cancel" size={20} color="black" style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#333' : '#fff', }}>
      <View style={styles.inputContainer}>
      {renderSearchIcon()}
      <TextInput
        placeholder={getTextForSelectedLanguage('searchdata')}
        style={[
          styles.inputData,
          { 
            fontSize,
            color:isDarkMode?'white':'#000',
          },
        ]}
        placeholderTextColor={isDarkMode?'white':'#000'}
        value={searchInput}
        onChangeText={handleSearch}
        onFocus={handleSearchClick}
        onBlur={handleSearchBlur}
      />
      {isSearchClicked && renderCancelIcon()}
      </View>
     
     {isSearchClicked && ( 
        <View style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {filteredOrganizations.map((organization, index) => (
              <OrganizationCell key={index} organization={organization} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputData: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width:'100%',
  },
  scrollViewContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)', 
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
  icon: {
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 80,
    width:'100%'
  },

});


