import React, { useState } from 'react';
import BottomTabNavigator from './src/screens/bottomTabs';
import { UserProvider } from './src/screens/UserContent';

const App=()=>{
  return( 
  <UserProvider>
          <BottomTabNavigator />
  </UserProvider>
  )
}
export default App;
