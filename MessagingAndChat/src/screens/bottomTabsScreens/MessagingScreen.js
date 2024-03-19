
import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn';
import { useUser } from '../UserContent';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';

export default function MessageScreen({ route }) {
   
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const { useLoginResponse } = route.params;
  const receiver = useLoginResponse.userId;
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const querySnapShot = firestore()
      .collection('users')
      .doc('12345')
      .collection('messages')
      .orderBy('createdAt', 'desc');

    querySnapShot.onSnapshot(snapShot => {
      const allMessages = snapShot.docs.map(snap => {
        return { ...snap.data(), createdAt: new Date() }
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = useCallback((messageArray) => {
    let myMsg = null;
    if (imageUrl !== '') {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        senderId: user.user.id,
        receiverId: receiver,
        image: imageUrl,
      };
    } else {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        senderId: user.user.id,
        receiverId: receiver,
        image: '',
      };
    }

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );

    firestore()
      .collection('users')
      .doc('12345')
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    setImageUrl('');
    setImageData(null);
  }, [imageUrl, receiver, user]);

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    if (!result.didCancel) {
      setImageData(result);
      uploadImage(result);
    }
  };

  const uploadImage = async (imageData) => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();

    setImageUrl(url);
  };

  return (
    <View style={{ flex: 1,} }>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: user.user.id
        }}
        alwaysShowSend
        renderSend={props => (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
            {imageData && imageData.assets && imageData.assets.length > 0 && (
              <Image
                source={{ uri: imageData.assets[0].uri }}
                style={{ width: 40, height: 40, borderRadius: 10, position: 'absolute' }}
              />
            )}
            <TouchableOpacity onPress={openCamera}>
              <Image
                source={require('../../asserts/imageIcon.jpg')}
                style={{ width: 24, height: 24, marginRight: 20 }}
              />
            </TouchableOpacity>
            <Send {...props}>
              <Image
                source={require('../../asserts/send.png')}
                style={{ width: 24, height: 28, marginRight: 10, marginBottom: 7 }}
              />
            </Send>
          </View>
        )}
        renderBubble={props => (
          <Bubble {...props} wrapperStyle={{ right: { backgroundColor: 'orange' } }} />
        )}
      />
      <AnalyticsScreen screenClass='MessageScreen' screenName='MessageScreen'/>
    </View>
  )
}

