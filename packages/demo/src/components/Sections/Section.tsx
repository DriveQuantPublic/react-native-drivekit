import React, {FunctionComponent, ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Spacer} from './../Spacer';

const Section: FunctionComponent<{title: string; children?: ReactNode}> = ({
  title,
  children,
}) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Spacer factor={1} />
      {children}
      <Spacer factor={2} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export {Section};
