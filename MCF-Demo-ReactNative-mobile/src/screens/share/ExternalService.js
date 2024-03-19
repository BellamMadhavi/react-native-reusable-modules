import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Share from 'react-native-share';
import RoundButtonComp from '../../components/RoundButtonComp';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function ExternalService() {
    const {fontSize}=useFontSize();
    const {getTextForSelectedLanguage}=useLanguage();
    const {isDarkMode}=useTheme();
    const [pickedFile, setPickedFile] = useState(null);

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: 'cachesDirectory',
            });
            setPickedFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Handle cancellation
            } else {
                console.log(err);
            }
        }
    };

    const shareToGoogleDrive = async () => {
        if (pickedFile) {
            const options = {
                url: pickedFile[0].fileCopyUri,
                type: pickedFile[0].type,
            };
            try {
                await Share.open(options);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('No file picked');
        }
    };

    return (
        <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
            <RoundButtonComp label={getTextForSelectedLanguage('pickDocument')} onPress={pickDocument} />
            {pickedFile && (
                <View style={styles.fileInfo}>
                    <Text  style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('name')}: ${pickedFile[0].name}`}</Text>
                    <Text style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('type')}: ${pickedFile[0].type}`}</Text>
                    <Text style={{color:isDarkMode?'white':'gray',fontSize:fontSize}}>{`${getTextForSelectedLanguage('size')}: ${pickedFile[0].size} bytes`}</Text>
                </View>
            )}
            <RoundButtonComp label={getTextForSelectedLanguage('upload')} onPress={shareToGoogleDrive} disabled={!pickedFile} />
        <AnalyticsScreen screenClass={'ExternalService'} screenName={'ExternalService'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    fileInfo: {
        marginTop: 20,
        alignItems:'center',
        justifyContent:'center'
    },
});
