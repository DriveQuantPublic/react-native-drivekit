import {Platform} from 'react-native';
import {
  RequestDisableOptimization,
  BatteryOptEnabled,
} from 'react-native-battery-optimization-check';

const checkBatteryOptimizationPermission = async () => {
  if (Platform.OS === 'ios') {
    return;
  }

  const isEnabled = await BatteryOptEnabled();

  if (isEnabled) {
    await RequestDisableOptimization();
  }

  return;
};

export {checkBatteryOptimizationPermission};
