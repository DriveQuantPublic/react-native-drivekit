# @react-native-drivekit/trip-analysis

React Native interface for DriveKit Trip Analysis

## Pre-requis

Before installing `@react-native-drivekit/trip-analysis` **you must have installed** `@react-native-drivekit/core`.

## Installation

Install the library:

```sh
npm install @react-native-drivekit/trip-analysis
```

Install iOS pods:

```sh
cd ios && pod install
```

## Initialization

#### Configure capabilities

You need to turn on Background Modes & enable Location updates. For more details please follow the [iOS documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#configure-capabilities)

#### Authorization

As DriveKit requires a user's location and motion data, it is required to get permissions from the user. You can find the list of authorizations needed in the [native documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#configure-permissions).

**Important:** Please note that `Motion` permission is only needed if you use [Motion & Fitness](https://docs.drivequant.com/trip-analysis/ios/get-started#motion-and-fitness-permission)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

### Android setup

### iOS setup

Call `initialize` method in your `AppDelegate.mm`.

```objc
// AppDelegate.mm
#import <RNDriveKitTripAnalysis/react-native-drivekit-trip-analysis-umbrella.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[RNDriveKitCoreWrapper.shared initialize];
  [RNDriveKitTripAnalysisWrapper.shared initializeWithLaunchOptions:launchOptions] // ADD THIS LINE
}
```

**Note:** If you are using Swift, `initialize` method is also available.

### Validation
