# Welcome to the DriveKit Expo Demo app 👋

## How to run the DriveKit Expo Demo App?

To run the sample Expo app you must have a valid API key.

Please contact us to get your API key via: [contact@drivequant.com](mailto:contact@drivequant.com)

Once you have the API key, uncomment `DriveKit.setApiKey('')` line in `index.tsx` and paste the API key in this line

```
// ========================================
// ↓↓↓ ENTER YOUR DRIVEKIT API KEY HERE ↓↓↓
// ========================================
// DriveKit.setApiKey('');
```

1. Install dependencies

   ```bash
   yarn install
   ```

2. Install Expo dependencies

   ```bash
   npx expo install
   ```

3. Start the app

   on Android: 
   ```bash
   npx expo run:android
   ```

   on iOS: 
   ```bash
   npx expo run:ios
   ```

## How to add DriveKit to your Expo app

### Add packages

DriveKit packages can be added to an Expo project with the following commands:

   ```bash
   npx expo install @react-native-drivekit/core
   npx expo install @react-native-drivekit/trip-analysis
   npx expo install @react-native-drivekit/driver-data
   npx expo install @react-native-drivekit/trip-simulator
   ```