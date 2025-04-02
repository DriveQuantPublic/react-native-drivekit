import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {margins} from '../margins';

interface SpacerProps {
  factor: 1 | 2 | 3;
}

const Spacer: FunctionComponent<SpacerProps> = ({factor}) => {
  const height = margins.x1 * factor;
  return <View style={{height, width: height}} />;
};

export {Spacer};
