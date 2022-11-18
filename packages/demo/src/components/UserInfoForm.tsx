import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput} from 'react-native';
import * as DriveKit from '@react-native-drivekit/core';
import {Spacer} from './Spacer';

const inputHeight = 40;

export const UserInfoForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');

  return (
    <>
      <Button
        title={'Get User Info'}
        onPress={async () => {
          try {
            const userInfo = await DriveKit.getUserInfo();
            Alert.alert('User Infos', JSON.stringify(userInfo));
          } catch {
            Alert.alert('Unable to retrieve user info');
          }
        }}
      />
      <Spacer factor={2} />
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
        placeholder="Firstname"
      />
      <Spacer factor={1} />
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        placeholder="Lastname"
      />
      <Spacer factor={1} />
      <TextInput
        style={styles.input}
        value={pseudo}
        onChangeText={setPseudo}
        placeholder="Pseudo"
      />
      <Spacer factor={1} />
      <Button
        title="Update user"
        onPress={() => DriveKit.updateUserInfo({firstname, lastname, pseudo})}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
  },
});
