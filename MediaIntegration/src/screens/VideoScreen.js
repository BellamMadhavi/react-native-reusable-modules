import React, { useState } from 'react';
import { StyleSheet, View, Platform, Alert, Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

export default function VideoScreen() {

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
    
    return (
        <View style={styles.container}>
            <View>
                
                    <Video
                        source={{ uri: mediaUrl }}
                        style={styles.media}
                        controls
                    />
                    <View style={styles.button}>
                        <Button title='Choose Video' onPress={openLibrary}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Record Video' onPress={openCamera}/>
                    </View>
            </View>
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

