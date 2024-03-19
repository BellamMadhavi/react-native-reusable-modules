import React, { useState } from 'react';
import BottomTabNavigator from './src/bottomTabs';
import { FontSizeProvider } from './src/screens/settingsContent/FontSizeContent';
import { LanguageProvider } from './src/screens/settingsContent/LanguageContent';
import { ThemeProvider } from './src/screens/settingsContent/ThemeContext';
import { UserProvider } from './src/UserContent';

const App=()=>{
  return( <>
  <UserProvider>
    <ThemeProvider>
      <FontSizeProvider>
        <LanguageProvider>
          <BottomTabNavigator />
        </LanguageProvider>
      </FontSizeProvider>
    </ThemeProvider>
  </UserProvider>
  </>
  )
}
export default App;
