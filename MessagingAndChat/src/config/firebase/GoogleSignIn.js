// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth"
// export const _signInWithGoogle=async()=>{
//     try{
//         GoogleSignin.configure({
//             offlineAccess:false,
//             webClientId:'560425926868-suo66e0r0rir5elpjjt5dbcl59irb3rl.apps.googleusercontent.com',
//             scopes: ['profile','email']
//         });
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();

//         const {idToken} = await GoogleSignin.signIn();
//         const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
//         await auth().signInWithCredential(googleCredentials);
//         return userInfo;
//     } catch(error){
//         console.log("=> Google Sign In",error);
//         return null
//     }
// }
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const _signInWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: '560425926868-suo66e0r0rir5elpjjt5dbcl59irb3rl.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const { idToken } = userInfo;
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredentials);
    return userInfo;
    
  } catch (error) {
    console.log("=> Google Sign In", error);
    return null;
  }
};

