import React from "react";
import {Text,TouchableOpacity,View} from 'react-native';
import { useFontSize } from "../screens/settingsContent/FontSizeContent";
export default function RoundButtonComp({label,border=false, onPress}){
    const {fontSize}=useFontSize();
    return(
    <TouchableOpacity onPress={()=> onPress()}>
        <View style={{
            backgroundColor:border?'white':'orange',
            width:150,
            paddingHorizontal:10,
            paddingVertical:10,
            borderRadius:10,
            marginLeft:10,
            borderColor:'black',
            borderWidth:border? 1 : 0}}>
            <Text style={{color: border?'black':'white',fontWeight:'bold',textAlign:'center',fontSize:fontSize}}>
                {label}
            </Text>
        </View>
    </TouchableOpacity>
    )
}