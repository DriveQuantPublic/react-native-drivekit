import React, {FunctionComponent, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Section} from './Section';
import {Spacer} from './../Spacer';
import * as DriveKit from '@react-native-drivekit/core';

const DeleteAccountSection: FunctionComponent<{}> = () => {
  const [instantDeleteAccount, setInstantDeleteAccount] = useState(false);

  return (
    <Section title="Delete account">
      <View style={styles.row}>
        <CheckBox
          disabled={false}
          value={instantDeleteAccount}
          onValueChange={setInstantDeleteAccount}
        />
        <Spacer factor={1} />
        <Text>Instant deletion ?</Text>
      </View>

      <Spacer factor={1} />

      <Button
        color={'red'}
        title="Delete account"
        onPress={() => DriveKit.deleteAccount(instantDeleteAccount)}
      />
    </Section>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {DeleteAccountSection};
