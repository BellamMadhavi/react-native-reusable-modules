import React,{useState,useEffect} from 'react';
import {ScrollView, Text,View, Dimensions} from 'react-native';
import GDPRPopup from './GDPRContent';

export default function HomeScreen(){
  const [showPopUp,setShowPopUp]=useState(false);
  const { width, height } = Dimensions.get('window');
  

  useEffect(()=>{
    setShowPopUp(true)
  },[])

  return(
  <View style={{justifyContent:'center',alignItems:'center'}}>
  {showPopUp && (<GDPRPopup  onClose={()=>setShowPopUp(false)}/>)}
  <Text>HomeScreen</Text>
    </View>
  )
}