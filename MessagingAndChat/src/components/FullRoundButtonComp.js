import React from 'react';
import {Image, Text,TouchableOpacity,View} from 'react-native';
export default function FullRoundButtonComp({image, onPress}){
    return(
        <TouchableOpacity onPress={()=>onPress()}>
            <View style={{marginLeft:10}}>
            <Image source={image} style={{
            width:50,
            height:50,
            borderRadius:50
            }}></Image>
        </View>
        </TouchableOpacity>
    )
}