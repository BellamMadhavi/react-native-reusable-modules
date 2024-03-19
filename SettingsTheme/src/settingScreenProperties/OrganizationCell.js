import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrganizationCell = ({ organization }) => {
  
  return (
    <View style={styles.container}>
      <Text >{organization}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default OrganizationCell;
