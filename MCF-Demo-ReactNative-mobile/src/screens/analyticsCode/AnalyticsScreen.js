import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
 
const AnalyticsScreen = ({ screenName, screenClass }) => {
  useEffect(() => {
    analytics().logEvent('app_open');
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass ? String(screenClass) : screenName, });
  }, [screenName,screenClass]);
  return null;
};
 
export default AnalyticsScreen;