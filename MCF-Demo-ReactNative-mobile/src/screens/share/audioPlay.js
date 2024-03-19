import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import RoundButtonComp from '../../components/RoundButtonComp';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';


export default function AudioPlay() {
    const {fontSize}=useFontSize();
    const {getTextForSelectedLanguage}=useLanguage();
    const {isDarkMode}=useTheme();
    const [audioFile, setAudioFile] = useState(null);
    const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

    useEffect(() => {
        async function initializePlayer() {
            await TrackPlayer.setupPlayer();
            setIsPlayerInitialized(true);
        }

        initializePlayer();

        return () => {
            TrackPlayer.destroy();
        };
    }, []);

    const pickAudio = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
                copyTo: 'cachesDirectory',
            });
            setAudioFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                console.log(err);
            }
        }
    };

    const playAudio = async () => {
            if (audioFile && isPlayerInitialized) {
                const track = {
                    id: 'unique-track-id',
                    url: audioFile[0].uri,
                    title: audioFile[0].name,
                    artist: 'Unknown',
                    artwork: 'https://www.example.com/cover.jpg',
                };
        
                const currentTrack = await TrackPlayer.getCurrentTrack();
                if (currentTrack) {
                    await TrackPlayer.seekTo(0);
                } else {
                    await TrackPlayer.add([track]);
                }
        
                await TrackPlayer.play();
            } else {
                Alert.alert('No audio file selected');
            }
        };

    const pauseAudio = async () => {
        if (isPlayerInitialized) {
            await TrackPlayer.pause();
        }
    };

    return (
        <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
            <RoundButtonComp label={getTextForSelectedLanguage('pickAudio')} onPress={pickAudio} />
            {audioFile && (
                <View style={styles.fileInfo}>
                    <Text style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('name')}: ${audioFile[0].name}`}</Text>
                    <Text style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('type')}: ${audioFile[0].type}`}</Text>
                    <Text style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('size')}: ${audioFile[0].size} bytes`}</Text>
                </View>
            )}
            <View style={styles.controls}>
                <RoundButtonComp label={getTextForSelectedLanguage('play')} onPress={playAudio}/>
                <RoundButtonComp label={getTextForSelectedLanguage('pause')} onPress={pauseAudio}/>
            </View>
            <AnalyticsScreen screenName={'AudioPlay'} screenClass={'AudioPlay'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileInfo: {
        marginTop: 20,
    },
    controls: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
