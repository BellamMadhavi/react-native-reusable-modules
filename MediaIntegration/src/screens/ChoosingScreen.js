import React from 'react';
import {Button, Text,View} from 'react-native';
export default function ChoosingScreen({navigation}){
    return(
        <View>
            <Button title='Video' onPress={()=>{navigation.navigate('VideoScreen')}}/>
            <Button title='Audio' onPress={()=>{navigation.navigate('AudioPlay')}}/>
        </View>
    )
}