import React from 'react';
import {Image, Text,TouchableOpacity,View} from 'react-native';
export default function FullRoundButtonComp({image, onPress}){
    return(
        <TouchableOpacity onPress={()=>onPress()}>
            <View style={{marginLeft:10}}>
            <Image source={image} style={{
            width:30,
            height:30,
            marginLeft:200,
            marginBottom:15,
            backgroundColor:'blue',
            borderRadius:20
            }}></Image>
        </View>
        </TouchableOpacity>
    )
}