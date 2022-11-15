# DriveKit React Native SDK

This documentation presents the React Native interfaces for the DriveKit SDK on iOS and Android.

The DriveKit SDK for React Native is available with:
- Android 21 (5.0) and later versions, 
- and iOS 11.0 and later versions.

The DriveKit librairies for React Native are supported for React Native 0.70 version. 
It is strongly recommended to use this version or later versions.

## How to install the DriveKit SDK in your React Native application?

### Step 1: Install the core module

First you need to install the Core module. 
This module is mandatory and includes methods to initialize DriveKit, to configure your API key and to create a user.

To install this module, follow step by step the method described in the [Core documentation](./packages//core/README.md)

### Step 2: Install the trip analysis module

After installing the Core component, you need to install the Trip Analysis component which manages the trip recording and the automatic mode configuration.

To install this module, follow step by step the method described in the [Trip Analysis documentation](./packages//trip-analysis/README.md)
