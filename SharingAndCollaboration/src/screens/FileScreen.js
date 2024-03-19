import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Share from 'react-native-share';


export default function FileScreen() {

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
        <View style={styles.container}>
            <Button title='Choose File' onPress={pickDocument} />
            {pickedFile && (
                <View style={styles.fileInfo}>
                    <Text>{`Name: ${pickedFile[0].name}`}</Text>
                    <Text>{`Type: ${pickedFile[0].type}`}</Text>
                    <Text>{`Size: ${pickedFile[0].size} bytes`}</Text>
                </View>
            )}
            <Button title='Share' onPress={shareToGoogleDrive} disabled={!pickedFile} />
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
