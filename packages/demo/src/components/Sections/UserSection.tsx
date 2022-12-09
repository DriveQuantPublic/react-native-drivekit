import React, {FunctionComponent, useEffect, useState} from 'react';
import {Alert, Button, TextInput, StyleSheet} from 'react-native';
import * as DriveKit from '@react-native-drivekit/core';
import {Section} from './Section';
import {Spacer} from './../Spacer';

const inputHeight = 40;

const UserSection: FunctionComponent<{}> = () => {
  var [userId, setUserId] = useState('');

  useEffect(() => {
    const checkUserIdValue = async () => {
      const userIdVal = await DriveKit.getUserId();
      setUserId(userIdVal);
    };

    checkUserIdValue();
  }, []);

  return (
    <Section title="User ID">
      <TextInput
        value={userId}
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={setUserId}
      />
      <Spacer factor={1} />
      <Button
        title="Configure User ID"
        onPress={async () => {
          const localUserId = await DriveKit.getUserId();
          if (localUserId == null) {
            DriveKit.setUserId(userId);
          } else {
            Alert.alert(
              'User Id already set',
              'You already have configured your user identifier: ' +
                localUserId,
            );
          }
        }}
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

export {UserSection};
