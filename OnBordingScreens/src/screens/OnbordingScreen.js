import React,{useState,useEffect} from 'react';
import {Text,View, Image, Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SIZES,COLORS} from '../screens/constants/theme'
const slides=[
  {
    id:1,
    title:'',
    description:'',
    title: "OnBording Screen1",
  },
  {
    id:2,
    title: "Onboading Screen2",
  },
  {
    id:3,
    title:'Onbording Screen3',
  }
  
]
export default function OnbordingScreen(){
  const { width, height } = Dimensions.get('window');
  const [showHomePage, setShowHomePage] = useState(false);
    const buttonLabel = (label)=>{
      return(
        <View style={{padding:12}}>
          <Text style={{color:COLORS.title,fontWeight:600,fontSize:SIZES.h4}}>
            {label}
        </Text>
        </View>
      )
    }
    if(!showHomePage){
      return(
        <AppIntroSlider 
        data={slides}
        renderItem={({item})=>{
          return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
              <Text style={{fontWeight:'bold',color:COLORS.title,fontSize:SIZES.h1}}>{item.title}</Text>
            </View>
          )
        }}
        activeDotStyle={{ 
          backgroundColor:COLORS.primary,
          width:30
        }}
        showSkipButton
        renderNextButton={()=>buttonLabel("Next")}
        renderSkipButton={()=>buttonLabel('Skip')}
        renderDoneButton={()=>buttonLabel("Done")}
        onDone={()=>{
          setShowHomePage(true)
        }}
        />
      )
    }

  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>HomeScreen</Text>
    </View>
  )
}

