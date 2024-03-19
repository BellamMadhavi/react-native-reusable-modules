import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
 
const GDPRPopup = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
 
  const handleOkButton = () => {
    if (isChecked) {
      onClose();
    } else {
      alert('Please agree to GDPR terms!');
    }
  };
 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>GDPR</Text>
          <Text style={{ paddingBottom: 50, padding: 25 }}>
            By Checking this box, you agree to our GDPR policy. Our GDPR policy includes the
            following: -We collect and process your personal data responsibly and transparently.
            -Your data is used only for specified and legitimate purposes. -We implement security
            measures to protect your data. -You have the right to access, rectify, and erase your
            data. For more details, please refer to our full GDPR policy on our website.
          </Text>
 
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleOkButton}
                disabled={!isChecked}
                style={[styles.button, isChecked ? {} : styles.disabledButton,{backgroundColor:'transparent'}]} // Styles for enabled/disabled state
              >
                <Text style={[styles.buttonText,isChecked ? styles.activeText:styles.inactiveText]}>OK</Text>
              </TouchableOpacity>
              <View style={styles.buttonGap} />
              <TouchableOpacity
                onPress={onClose}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
 
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 6,
    alignItems: 'center',
    elevation: 5,
    paddingBottom: 180,
    marginTop: 40,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 60,
    paddingTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 8,
   
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderRadius: 5,
   
 
  },
  disabledButton: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
   
  },
  activeText: {
    color: 'blue',
  },
  inactiveText: {
    color: 'black',
  },
  buttonGap: {
    width: 20,
  },
});
 
export default GDPRPopup;
 