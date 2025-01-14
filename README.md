# DriveKit React Native SDK

This documentation presents the React Native interfaces for the DriveKit SDK on iOS and Android.

The DriveKit SDK for React Native is available with:
- Android 6.0 (API 23) and later versions, 
- and iOS 11.0 and later versions.

The DriveKit libraries for React Native are supported for React Native 0.70 version. 
It is strongly recommended to use this version or later versions.

## How to install the DriveKit SDK in your React Native application?

### ➡️ Step 1: Install the Core module

First you need to install the Core module. 
This module is mandatory and includes methods to initialize DriveKit, to configure your API key and to create a user.

To install this module, follow step by step the method described in the [Core documentation](./packages/core/README.md)

---

### ➡️ Step 2: Install the Trip Analysis module

After installing the Core component, you need to install the Trip Analysis component which manages the trip recording and the automatic mode configuration.

To install this module, follow step by step the method described in the [Trip Analysis documentation](./packages/trip-analysis/README.md)

---

### ➡️ Step 3: Install the Driver Data module

The [Driver Data](https://docs.drivequant.com/driver-data/introduction) module manages the driver trips display (list and details) and ensures the synchronisation of driver data. 

To install this module, follow step by step the method described in the [Driver Data documentation](./packages/driver-data/README.md)

---

### ➡️ Step 4 : Test your implementation with Trip Simulator

To verify the DriveKit Trip Analysis component integration into your app, it is recommended to perform tests in real conditions. Before carrying out driving tests, it may be useful to validate the implementation of the SDK in your application. 

For this purpose, DriveQuant provides the [Trip Simulator](https://docs.drivequant.com/trip-analysis/trip-simulator) component based on recorded GPS data.

>❗️It is strongly recommended not to integrate this component into an application built for production. This component has been designed to facilitate preliminary testing and should never remain in your production app.

To install this module, follow step by step the method described in the [Trip Simulator documentation](./packages/trip-simulator/README.md)

---

### ➡️ Step 5 : Notify the user about the trip analysis

To inform the user that the trip has been analyzed, finished or canceled, the DriveKit libraries for React Native offers listeners so it becomes easy to build notifications on both mobile platforms.

We recommend [Notifee](https://notifee.app/) library to manage your notifications.

#### iOS

On iOS, you just have to manage notifications using the `DriveKit.addEventListener(…)` method. Please refer to the `useSetupListeners.ts` on the demo package for example.

#### Android

Notification that indicates a trip is currently analyzed is driven by the Trip Analysis `initialize(…)` method.

To display a notification when the trip is finished or canceled, it is not possible to handle listeners like the iOS platform, because listeners are not triggered when the device is locked or the app is not in foreground. To manage that limitation, a Headless JS service has been introduced on Trip Analysis component.

Follow these steps :

- Register the Headless task named `DKHeadlessJS` on your `index.js` file.
- Replicate the `DKHeadlessJS.js` file on your project. 
