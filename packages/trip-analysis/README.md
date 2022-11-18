# @react-native-drivekit/trip-analysis

React Native interface for DriveKit Trip Analysis

## Prerequisite

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

    // ADD THESE LINES
    final RNTripNotification tripNotification = new RNTripNotification("Notification title", "Notification description", R.drawable.common_google_signin_btn_icon_dark)
    DrivekitTripAnalysisModule.Companion.initialize(tripNotification);
    DrivekitTripAnalysisModule.Companion.registerReceiver(this);

    ...
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

Our recommandation is to use [react-native-battery-optimization-check](https://github.com/losthakkun/react-native-battery-optimization-check).You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

**IMPORTANT**

This library is not actively maintained. The problem is that the method that call the native modal is not promisified. It means that we can't wait for the user answer before continuing. At the moment, our recommandation is to check this permission at the end of your flow.
On our side, we are working on implementing a better solution.

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
  ...
}
```

**Note:** If you are using Swift, `initialize` method is also available.

#### Configure capabilities

You need to turn on Background Modes & enable Location updates. For more details please follow the [iOS documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#configure-capabilities)

#### Authorization

In order to collect data, you need to configure multiple permissions :

- Location permission : [native documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#ask-for-location-permission)
- Motion permission : [native documentation](https://docs.drivequant.com/trip-analysis/ios/get-started#motion-and-fitness-permission)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

---

### Validation

To validate that the initialization has been done successfully, please check your native logs and verify that you can see the following success message.

**Android**
![](./doc/img/android_validation.png)

**iOS**
![](./doc/img/ios_validation.png)

## Listeners

You can listen to events thanks to the `addEventListener` api.

```typescript
useEffect(() => {
  const listener = DriveKitTripAnalysis.addEventListener(
    'tripStarted',
    (startMode: StartMode) => {
      console.log('trip start', startMode);
    }
  );
  return () => listener.remove();
});
```

Here is the list of supported events:

- `tripPoint`, callback `(tripPoint: TripPoint) => void`: This event is triggered when a trip is started and confirmed, for each GPS point recorded by the SDK.
- `tripStarted`, callback `(startMode: StartMode) => void`: This event is triggered each time a trip is started. StartMode indicates which event starts the trip.
- `tripCancelled`, callback `(cancelTrip: CancelTrip) => void`: This event is triggered when a trip is cancelled. CancelTrip indicates which event cancels the trip.
- `tripFinished`, callback `(post: PostGeneric, response: PostGenericResponse)`: This event is triggered when a trip has been recorded by the SDK and sent to DriveQuant's server to be analyzed. PostGeneric object contains raw data sent to DriveQuant's server, PostGenericResponse object contains the trip analysis made on DriveQuant's server.
- `tripSavedForRepost`, callback `() => void`: This event is triggered if at the end of the trip, the trip can be sent to DriveQuant's server for the analysis. The trip is saved locally on the SDK and will be sent later.
- `beaconDetected`, callback `() => void`: This event is triggered when a beacon sets in the SDK is detected.
  `significantLocationChangeDetected`, callback `() => void`: This event is triggered when a user significant location change is detected.
- `sdkStateChanged`, callback `(state: State) => void`: This event is triggered every time the state of the SDK changed with the new state as parameter.

## API

| Method                                                                | Return Type     | iOS | Android |
| --------------------------------------------------------------------- | --------------- | :-: | :-----: |
| [activateAutoStart()](#activateautostart)                             | `Promise<void>` | ✅  |   ✅    |
| [startTrip()](#starttrip)                                             | `Promise<void>` | ✅  |   ✅    |
| [stopTrip()](#stoptrip)                                               | `Promise<void>` | ✅  |   ✅    |
| [activateCrashDetection()](#activatecrashdetection)                   | `Promise<void>` | ✅  |   ✅    |
| [enableMonitorPotentialTripStart()](#enablemonitorpotentialtripstart) | `Promise<void>` | ✅  |   ✅    |

### activateAutoStart

```typescript
activateAutoStart(enable: boolean): void
```

The automatic mode detects vehicle movements and triggers the trip analysis without driver intervention while the application is in background. The analysis is stopped automatically at the end of the trip.

This feature is recommended to avoid driver distraction and phone handling while driving. The automatic mode has been optimized to limit the battery drain.

To enable automatic trip detection mode, call the following method:

```typescript
activateAutoStart(true);
```

To disable automatic trip detection call the same method with parameter enable set to false

```typescript
activateAutoStart(false);
```

> ⚠️
>
> If a trip is running when automatic trip detection is disable, the trip will not be canceled. If you want to cancel the trip, you should also call cancelTrip method.

## startTrip

```typescript
startTrip(): void
```

You can start a trip by calling the following method:

```typescript
startTrip();
```

> ℹ️
>
> If a trip's already started, calling this method will have no effect.

## stopTrip

```typescript
stopTrip(): void
```

You can stop a trip by calling the following method. The trip will be stopped instantly:

```typescript
stopTrip();
```

> ℹ️
>
> If a vehicle stops longer than the [timeout configured](https://docs.drivequant.com/trip-analysis/ios/advanced-configuration#custom-stop-timeout), the trip will be stopped automatically.

> ℹ️
>
> If there is no running trip, calling this method will have no effect.

### activateCrashDetection

```typescript
activateCrashDetection(enable: boolean): void
```

Crash detection features, included into the DriveKit Trip Analysis component, is able to collect and analyse smartphone sensors data to automatically detect when a car accident occurs. 

Learn more about the feature [on iOS](https://docs.drivequant.com/trip-analysis/ios/crash-detection) / [on Android](https://docs.drivequant.com/trip-analysis/android/crash-detection)

An input parameter is available in DriveKitTripAnalysis to enable or disable the feature:

```typescript
activateCrashDetection(true);
```

To disable crash detection, call the same method with parameter to `false`

```typescript
activateCrashDetection(false);
```

### enableMonitorPotentialTripStart

```typescript
enableMonitorPotentialTripStart(enable: boolean): void
```

To listen to trigger events that indicate a start of trip, even if the autostart is disabled, you can call the following method:

```typescript
enableMonitorPotentialTripStart(true);
```
