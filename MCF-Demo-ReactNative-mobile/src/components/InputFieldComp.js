import React from 'react';
import {Image, Text,TouchableOpacity,View} from 'react-native';
export default function InputFieldComp({label, onPress}){
    return(
    <TouchableOpacity onPress={()=>onPress()}>
        <View style={{marginLeft:10,backgroundColor:'blue'}}>
            <Image source={label} style={{
                width:50,
                height:50,
                borderRadius:40 }}/>
        </View>
    </TouchableOpacity>
    )
}