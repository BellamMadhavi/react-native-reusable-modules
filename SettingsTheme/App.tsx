import React from "react";
import BottomNavigationTab from "./src/BottomNavigationTab";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/settingScreenProperties/ThemeContext";
import { LanguageProvider } from "./src/settingScreenProperties/LanguageContext";
import { FontSizeProvider } from "./src/settingScreenProperties/FontSizecontext";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function App () {
  return(
    <SafeAreaProvider>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':'height'}
      style={{flex:1}} >
      <NavigationContainer>
      <ThemeProvider>
        <LanguageProvider>
          <FontSizeProvider>
          <BottomNavigationTab />
          </FontSizeProvider>
        </LanguageProvider>
      </ThemeProvider>
    </NavigationContainer>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}