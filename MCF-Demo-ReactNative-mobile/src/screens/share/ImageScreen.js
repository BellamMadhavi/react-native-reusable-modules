//correct code
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform,Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import  Share  from 'react-native-share';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function ImageScreen() {
    const {fontSize}=useFontSize();
    const {getTextForSelectedLanguage}=useLanguage();
    const {isDarkMode}=useTheme();
    const [imgUrl, setImgUrl] = useState("https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400");

    const openCamera = async () => {
        console.log("PRESS =====>>")
        const options = {
            mediaType: 'photo', 
            saveToPhotos: true, 
        };
        launchCamera(options, (result) => {
            if (!result.didCancel) {
                saveImage(result.assets[0]?.uri); 
                setImgUrl(result.assets[0]?.uri);
                console.log("RESULT===>>", result);
            }
        });
    };


    const openLib = async () => {
        console.log("PRESS =====>>")
        const options = {
            mediaType: 'photo', 
        };
        launchImageLibrary(options, (result) => {
            if (!result.didCancel) {
                saveImage(result.assets[0]?.uri);
                setImgUrl(result.assets[0]?.uri);
                console.log("RESULT===>>", result);
            }
        });
    };
    const shareOption=async ()=>{
                const options = {
                     title:"Hello world",
                     url:imgUrl,
                }
                try{
                    const res = await Share.open(options)
                }catch(err){
                    console.log(err);
                }
            }

    const saveImage = async (uri) => {
        try {
            const fileName = 'savedImage.jpg';
            let destPath = RNFS.DocumentDirectoryPath + '/' + fileName;
            if (Platform.OS === 'android') {
                destPath = RNFS.LibraryDirectoryPath + '/' + fileName;
            }
            await RNFS.copyFile(uri, destPath);
            console.log('Image saved successfully:', destPath);
        } catch (error) {
            // console.error('Error saving image:', error);
        }
    };

    return (
        <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
            <View>
                <Image
                    resizeMode='contain'
                    style={styles.img}
                    source={{ uri: imgUrl }}
                />
                <View style={styles.button}>
                    <RoundButtonComp label={getTextForSelectedLanguage('chooseImage')} onPress={openLib}/>
                </View>
                <View style={styles.button}>
                    <RoundButtonComp label={getTextForSelectedLanguage('openCamera')} onPress={openCamera}/>
                </View>
                <View style={styles.button}>
                    <RoundButtonComp label={getTextForSelectedLanguage('share')} onPress={shareOption}/>
                </View>
            </View>
            <AnalyticsScreen screenName='ImageScreen' screenClass='ImageScreen'/>
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 200,
        height:  300,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    }
});