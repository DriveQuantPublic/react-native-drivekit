import {Platform} from 'react-native';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';

const checkBatteryOptimizationPermission = async () => {
  if (Platform.OS === 'ios') {
    return;
  }

  const isEnabled =
    await RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled();

  if (isEnabled) {
    RNDisableBatteryOptimizationsAndroid.openBatteryModal();
  }

  return;
};

export {checkBatteryOptimizationPermission};
