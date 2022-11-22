# @react-native-drivekit/driver-data

React Native interface for DriveKit Driver Data

## Prerequisite

Before installing `@react-native-drivekit/driver-data` **you must have installed** `@react-native-drivekit/core`.

---

## Installation

Install the library:

```sh
npm install @react-native-drivekit/driver-data
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
import com.reactnativedrivekit.driverdata.DriveKitDriverDataModule;
import com.reactnativedrivekitcore.DriveKitCoreModule;
import com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule;

// ...
  @Override
  public void onCreate() {
    super.onCreate();
    DriveKitCoreModule.Companion.initialize(this);
    RNTripNotification tripNotification = new RNTripNotification(
            "DriveKit SDK",
            "Start a trip with DriveKit SDK",
            R.drawable.common_google_signin_btn_icon_dark);
    DriveKitTripAnalysisModule.Companion.initialize(tripNotification);
    DriveKitTripAnalysisModule.Companion.registerReceiver(this);

    DriveKitDriverDataModule.Companion.initialize(); // ADD THIS LINE

    (…)
  }
```
---

### iOS setup

Call `initialize` method in your `AppDelegate.mm`.

```objc
// AppDelegate.mm
#import <RNDriveKitTripAnalysis/react-native-drivekit-driver-data-umbrella.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[RNDriveKitCoreWrapper.shared initialize];
  [RNDriveKitTripAnalysisWrapper.shared initializeWithLaunchOptions:launchOptions]
  [[RNDriveKitDriverDataWrapper.shared initialize]; // ADD THIS LINE
  (…)
}
```

**Note:** If you are using Swift, `initialize` method is also available.
