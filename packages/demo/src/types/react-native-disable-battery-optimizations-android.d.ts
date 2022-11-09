declare module 'react-native-disable-battery-optimizations-android' {
  function isBatteryOptimizationEnabled(): Promise<boolean>;
  function openBatteryModal(): void;
  function enableBackgroundServicesDialogue(): void;
}
