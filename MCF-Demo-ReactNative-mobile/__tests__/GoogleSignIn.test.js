import { render, waitFor, act } from '@testing-library/react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
// import { _signInWithGoogle } from '../config/firebase/GoogleSignIn';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    getCurrentUser: jest.fn(),
    isSignedIn: jest.fn(),
  },
}));

jest.mock('@react-native-firebase/auth', () => ({
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
  auth: jest.fn(),
}));

describe('_signInWithGoogle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in with Google successfully', async () => {
    GoogleSignin.isSignedIn.mockResolvedValueOnce(false); // User is not signed in

    // Mock the Google Sign-In process
    GoogleSignin.hasPlayServices.mockResolvedValueOnce();
    GoogleSignin.signIn.mockResolvedValueOnce({ idToken: 'mockedIdToken' });
    GoogleSignin.getCurrentUser.mockResolvedValueOnce({ idToken: 'mockedIdToken' });

    // Mock the Firebase authentication process
    const mockedCredential = jest.fn();
    auth.GoogleAuthProvider.credential.mockReturnValueOnce(mockedCredential);
    auth().signInWithCredential.mockResolvedValueOnce();

    const result = await _signInWithGoogle();

    expect(result).toEqual({ idToken: 'mockedIdToken' });
    expect(GoogleSignin.isSignedIn).toHaveBeenCalledTimes(1);
    expect(GoogleSignin.hasPlayServices).toHaveBeenCalledTimes(1);
    expect(GoogleSignin.signIn).toHaveBeenCalledTimes(1);
    expect(GoogleSignin.getCurrentUser).toHaveBeenCalledTimes(1);
    expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith('mockedIdToken');
    expect(auth().signInWithCredential).toHaveBeenCalledWith(mockedCredential);
  });

  // Add more test cases for error scenarios, such as network failures, authentication failures, etc.
});
