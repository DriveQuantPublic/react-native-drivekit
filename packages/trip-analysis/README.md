# @react-native-drivekit/trip-analysis

React Native interface for DriveKit Trip Analysis

## Pre-requis

Before installing `@react-native-drivekit/trip-analysis` **you must have installed** `@react-native-drivekit/core`.

---

## Installation

Install the library:

```sh
npm install @react-native-drivekit/trip-analysis
```

Install iOS pods:

```sh
cd ios && pod install
```

---

## Initialization

### Android setup

Call `initialize` method inside your `MainApplication.java`.

```java
// MainApplication.java
import com.reactnativedrivekitcore.CoreModuleImpl;
import com.reactnativedrivekittripanalysis.DrivekitTripAnalysisModule;

// ...

  @Override
  public void onCreate() {
    super.onCreate();
    CoreModuleImpl.INSTANCE.initialize(this);
    // You can replace the icon with a custom one by changing the parameter of initialize
    DrivekitTripAnalysisModule.Companion.initialize(R.drawable.common_google_signin_btn_icon_dark); // ADD THIS LINE
    // ...
  }
```

#### Authorization

In order to collect data, you need to configure multiple permissions :

- Location permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#location-permission);
- Activity recogniton permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#activity-recognition-permission)
- Nearby device permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#nearby-devices-permission)
- Notification runtime permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#notification-runtime-permission)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

#### Battery optimization

In order to make Trip Analysis SDK to work properly, you need to disable battery optimization for your app: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#battery-optimization)

Our recommandation is to use [react-native-disable-battery-optimizations-android](https://github.com/rasheedk/react-native-disable-battery-optimizations-android).You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

**IMPORTANT**

This library is not actively maintained, but it does the job. To make it works you need to:

1. Patch the `buile.gradle` file using `patch-package`. You can find the path we applied in our demo app [here](../../patches/react-native-disable-battery-optimizations-android%2B1.0.7.patch).
2. Define the typescript interface, if needed. You can find the type definition in our demo app [here](../demo/src/types/react-native-disable-battery-optimizations-android.d.ts).

This is the better solution we found. If you find a better solution, please feel free to open an issue/PR in this repository.

---

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

#### Configure capabilities

You need to turn on Background Modes & enable Location updates. For more details please follow the [iOS documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#configure-capabilities)

#### Authorization

In order to collect data, you need to configure multiple permissions :

- Location permission : [native documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#ask-for-location-permission)
- Motion permission : [native documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#motion-and-fitness-permission)

**Important:** Please note that `Motion` permission is only needed if you use [Motion & Fitness](https://docs.drivequant.com/trip-analysis/ios/get-started#motion-and-fitness-permission)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

---

### Validation

To validate that the initialization has been done successfully, please check your native logs and verify that you can see the following success message.

**Android**
![](./doc/img/android_validation.png)

**iOS**
![](./doc/img/ios_validation.png)
