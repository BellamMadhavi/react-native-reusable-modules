import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [languageText, setLanguageText] = useState({
    english: {
      theme: 'Theme',
      syncData: 'sync Data',
      fontSize: 'Font Size',
      selectLanguage: 'Select Language',
      profiledata : 'Profile Data',
      showGDPRContent : 'Show GDPR Content',
      GDPRContentHere : 'GDPR Content Here...',
      close : 'Close',
      homeLabel: 'Home',
      mapLabel : 'Map',
      profileLabel : 'Profile',
      settingsLabel : 'Settings',
      startNavigation : 'Start Navigation',
      currentlocation : 'Current Location',
      destination : 'Destination',
      source : 'Source',
      searchdata : 'Search Data',
      profilescreen:'ProfileScreen',
      enterfontsize:'Enter Font Size',
      gdprContent:'By Checking this box, you agree to our GDPR policy. Our GDPR policy includes the following: -We collect and process your personal data responsibly and transparently.-Your data is used only for specified and legitimate purposes. -We implement security measures to protect your data. -You have the right to access, rectify, and erase your data. For more details, please refer to our full GDPR policy on our website.',
      ok:'OK',
      close:'Close',
    },
    german: {
      theme: 'Thema',
      syncData: 'Daten syncronisieren',
      fontSize: 'Schriftgröße',
      selectLanguage: 'Sprache auswählen',
      profiledata:'Profildaten',
      showGDPRContent : 'DSGVO-Inhalte anzeigen',
      GDPRContentHere : 'DSGVO-Inhalt hier...',
      close : 'Schließen',
      homeLabel: 'Heim',
      mapLabel : 'Karte',
      profileLabel : 'Profil',
      settingsLabel : 'Einstellungen',
      startNavigation : 'Beginnen Sie mit dem Stöbern',
      currentlocation : 'Aktueller Standort',
      destination : 'Ziel',
      source : 'Quelle',
      searchdata : 'Daten durchsuchen',
      profilescreen:'Profilbildschirm',
      enterfontsize:'Geben Sie die Schriftgröße ein',
      gdprContent:'Durch Ankreuzen dieses Kästchens stimmen Sie unserer DSGVO-Richtlinie zu. Unsere DSGVO-Richtlinie umfasst Folgendes: - Wir erheben und verarbeiten Ihre personenbezogenen Daten verantwortungsbewusst und transparent. - Ihre Daten werden nur für festgelegte und legitime Zwecke verwendet. -Wir implementieren Sicherheitsmaßnahmen zum Schutz Ihrer Daten. -Sie haben das Recht auf Zugang, Berichtigung und Löschung Ihrer Daten. Weitere Einzelheiten finden Sie in unserer vollständigen DSGVO-Richtlinie auf unserer Website.',
      ok:'OK',
      close:'Schließen',
    },
    chinese: {
      theme: '主题',
      syncData: '同步數據',
      fontSize: '字体大小',
      selectLanguage: '选择语言',
      profiledata:'资料数据 ',
      showGDPRContent : '显示 般資料保護條例 内容',
      GDPRContentHere : '一般資料保護條例 內容在此...',
      close : '關閉',
      homeLabel: '家',
      mapLabel : '地圖',
      profileLabel : '輪廓',
      settingsLabel : '設定',
      startNavigation : '開始導航',
      currentlocation : '目前位置',
      destination : '目的地',
      source : '来源',
      searchdata : '搜尋數據',
      profilescreen:'個人資料螢幕',
      enterfontsize:'輸入字體大小',
      gdprContent:'勾選此方塊即表示您同意我們的 GDPR 政策。我們的 GDPR 政策包括以下內容： - 我們負責任且透明地收集和處理您的個人資料。- 您的資料僅用於指定的合法目的。 -我們實施安全措施來保護您的資料。 -您有權存取、更正和刪除您的資料。有關更多詳細信息，請參閱我們網站上的完整 GDPR 政策。',
      ok:'好的',
      close:'關閉',   
    },
  });

  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

 
  const getTextForSelectedLanguage = (textKey) => {
    return languageText[selectedLanguage][textKey];
  };

  

  useEffect(() => {
   
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        changeLanguage,
        getTextForSelectedLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
