// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';

// export const _signInWithFaceBook=async()=>{
//     try{
//         Settings.setAppID('363709662709849');
//         Settings.initializeSDK();
//         const result = await LoginManager.logInWithPermissions(['public_profile']);
//         if (result.isCancelled) {
//           throw 'User cancelled the login process';
//         }    
//         const data = await AccessToken.getCurrentAccessToken();  
//         if (!data) {
//           throw 'Something went wrong obtaining access token';
//         } 
//         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken); 
//         return auth().signInWithCredential(facebookCredential);
//     } catch(error){
//         console.log("=> Facebook SignIn",error);
//         return null
//     }
// }
