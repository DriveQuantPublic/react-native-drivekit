import {useEffect} from 'react';
import {checkBatteryOptimizationPermission} from '../services/permissions/batteryOptimization';
import {checkBluetoothPermissions} from '../services/permissions/bluetooth';
import {checkLocationsPermissions} from '../services/permissions/location';
import {checkNotificationPermission} from '../services/permissions/notification';
import {checkRecognitionPermission} from '../services/permissions/recognition';
import {checkMotionPermission} from '../services/permissions/motion';

const useCheckPermissions = () => {
  useEffect(() => {
    const checkPermissions = async () => {
      await checkLocationsPermissions();
      await checkRecognitionPermission();
      await checkBluetoothPermissions();
      await checkNotificationPermission();
      await checkMotionPermission();
      /**
       * There is no open source library that promisify the modal call
       * This is why we put it at the end.
       */
      await checkBatteryOptimizationPermission();
    };

    checkPermissions();
  }, []);
};

export {useCheckPermissions};
