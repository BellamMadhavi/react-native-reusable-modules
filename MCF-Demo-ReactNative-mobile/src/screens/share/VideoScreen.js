import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Button, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Video from 'react-native-video';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function VideoScreen() {
    const {fontSize}=useFontSize();
    const {getTextForSelectedLanguage}=useLanguage();
    const {isDarkMode}=useTheme();
    const [mediaUrl, setMediaUrl] = useState("https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400");

    const openCamera = async () => {
        const options = {
            mediaType: 'video',
            saveToPhotos: true,
        };
        launchCamera(options, (result) => {
            if (!result.didCancel) {
                saveMedia(result.assets[0]?.uri); 
                setMediaUrl(result.assets[0]?.uri);
                console.log("RESULT===>>", result);
            }
        });
    };

    const openLibrary = async () => {
        const options = {
            mediaType: 'video',
        };
        launchImageLibrary(options, (result) => {
            if (!result.didCancel) {
                saveMedia(result.assets[0]?.uri); 
                setMediaUrl(result.assets[0]?.uri);
                console.log("RESULT===>>", result);
            }
        });
    };

    const saveMedia = async (uri) => {
        try {
            const fileName ='savedVideo.mp4';
            let destPath = RNFS.DocumentDirectoryPath + '/' + fileName;
            if (Platform.OS === 'android') {
                destPath = RNFS.ExternalDirectoryPath + '/' + fileName;
            }
            await RNFS.copyFile(uri, destPath);
            console.log('Media saved successfully:', destPath);
        } catch (error) {
            console.error('Error saving media:', error);
            Alert.alert('Error', 'Failed to save media');
        }
    };
    

    const shareMedia = async () => {
        const options = {
            url: mediaUrl,
        };
        try {
            const res = await Share.open(options);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
            <View>
                
                    <Video
                        source={{ uri: mediaUrl }}
                        style={styles.media}
                        controls
                    />
                    <View style={styles.button}>
                        <RoundButtonComp label={getTextForSelectedLanguage('chooseVideo')} onPress={openLibrary}/>
                    </View>
                    <View style={styles.button}>
                        <RoundButtonComp label={getTextForSelectedLanguage('recordVideo')} onPress={openCamera}/>
                    </View>
                    <View style={styles.button}>
                        <RoundButtonComp label={getTextForSelectedLanguage('share')} onPress={shareMedia}/>
                    </View> 
            </View>
            <AnalyticsScreen screenName='VideoScreen' screenClass='VideoScreen' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    media: {
        width: 200,
        height: 300,
        alignSelf: 'center',
    },
    button:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    }
});

