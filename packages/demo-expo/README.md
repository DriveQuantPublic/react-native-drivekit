# Welcome to the DriveKit Expo Demo app 👋

## How to run the DriveKit Expo Demo App?

To run the sample Expo app you must have a valid API key.

Please contact us to get your API key via: [contact@drivequant.com](mailto:contact@drivequant.com)

Once you have the API key, uncomment `DriveKit.setApiKey("")` line in `index.tsx` and paste the API key in this line

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

   ```bash
   npx expo start
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

### Add trip-analysis Expo config plugin

To configure `trip-analysis` on Expo, `app.json` file needs to be updated by adding the trip-analysis config plugin. 

Also, other plugins may need to be configured (like `expo-build-properties` to configure `minSdkVersion` for Android, and `react-native-permissions` to configure permissions for iOS).

The plugins section in `app.json` would look like the following: 

   ```json
     "plugins": [
      …,
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 26
          }
        }
      ],
      [
        "react-native-permissions",
        {
          "iosPermissions": [
            "Bluetooth",
            "LocationAlways",
            "LocationWhenInUse",
            "Motion"
          ]
        }],
        ["@react-native-drivekit/trip-analysis",
        {
          "tripNotificationTitle": "Recording Trip",
          "tripNotificationBody":"A trip is about to be recorded",
          "headlessNotificationTitle":"App Activity",
          "headlessNotificationBody":"App is receiving and processing background event"
        }
      ]
    ],
   ```