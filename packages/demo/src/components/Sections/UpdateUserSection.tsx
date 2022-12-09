import React, {FunctionComponent, useState} from 'react';
import {Alert, Button, TextInput, StyleSheet} from 'react-native';
import * as DriveKit from '@react-native-drivekit/core';
import {Spacer} from './../Spacer';
import {Section} from './Section';

const inputHeight = 40;

const UpdateUserSection: FunctionComponent<{}> = () => {
  const [newUserId, setNewUserId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');

  return (
    <Section title="Update User ID">
      <TextInput
        value={newUserId}
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={setNewUserId}
      />
      <Spacer factor={1} />
      <Button
        title="Update User ID"
        onPress={() => DriveKit.updateUserId(newUserId)}
      />
      <Spacer factor={1} />
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
      <Spacer factor={1} />
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
    </Section>
  );
};

const styles = StyleSheet.create({
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    flex: 1,
  },
});

export {UpdateUserSection};
