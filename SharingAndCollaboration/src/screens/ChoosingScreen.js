import React from 'react';
import {Button, Text,View} from 'react-native';
export default function ChoosingScreen({navigation}){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Button title='Image' onPress={()=>{navigation.navigate('ImageScreen')}} />
            <View style={{ marginLeft: 10 }} /> 
            <Button title='Video' onPress={()=>{navigation.navigate('VideoScreen')}}/>
            <View style={{ marginLeft: 10 }} /> 
            <Button title='File' onPress={()=>{navigation.navigate('FileScreen')}} />
        </View>
    )
}