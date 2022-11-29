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
import com.reactnativedrivekitcore.DriveKitCoreModule;
import com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule;

// ...

  @Override
  public void onCreate() {
    super.onCreate();
    DriveKitCoreModule.Companion.initialize(this);

    // ADD THESE LINES
    final RNTripNotification tripNotification = new RNTripNotification("Notification title", "Notification description", R.drawable.common_google_signin_btn_icon_dark)
    DriveKitTripAnalysisModule.Companion.initialize(tripNotification);
    DriveKitTripAnalysisModule.Companion.registerReceiver(this);

    ...
  }
```

#### Authorization

In order to collect data, you need to configure multiple permissions :

- Location permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#location-permission);
- Activity recogniton permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#activity-recognition-permission)
- Nearby device permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#nearby-devices-permission)
- Notification runtime permission: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#notification-runtime-permission)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [example application inside this repository](../../example/App.tsx).

#### Battery optimization

In order to make Trip Analysis SDK to work properly, you need to disable battery optimization for your app: [native documentation](https://docs.drivequant.com/trip-analysis/android/get-started#battery-optimization)

Our recommandation is to use [react-native-battery-optimization-check](https://github.com/losthakkun/react-native-battery-optimization-check).You can find an implementation example in the [example application inside this repository](../../example/App.tsx).

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

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [example application inside this repository](../../example/App.tsx).

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

| Method                                                                | Return Type                     | iOS | Android |
| --------------------------------------------------------------------- | ------------------------------- | :-: | :-----: |
| [activateAutoStart()](#activateautostart)                             | `Promise<void>`                 | ✅  |   ✅    |
| [startTrip()](#starttrip)                                             | `Promise<void>`                 | ✅  |   ✅    |
| [stopTrip()](#stoptrip)                                               | `Promise<void>`                 | ✅  |   ✅    |
| [cancelTrip()](#canceltrip)                                           | `Promise<void>`                 | ✅  |   ✅    |
| [isTripRunning()](#istriprunning)                                     | `Promise<boolean>`              | ✅  |   ✅    |
| [activateCrashDetection()](#activatecrashdetection)                   | `Promise<void>`                 | ✅  |   ✅    |
| [enableMonitorPotentialTripStart()](#enablemonitorpotentialtripstart) | `Promise<void>`                 | ✅  |   ✅    |
| [setStopTimeout()](#setStopTimeout)                                   | `Promise<void>`                 | ✅  |   ✅    |
| [reset()](#reset)                                                     | `Promise<void>`                 | ✅  |   ✅    |
| [getTripMetadata()](#getTripMetadata)                                 | `Promise<TripMetadata \| null>` | ✅  |   ✅    |
| [setTripMetadata(metadata: TripMetadata)](#setTripMetadata)           | `Promise<void>`                 | ✅  |   ✅    |
| [deleteTripMetadata(string?: string)](#deleteTripMetadata)            | `Promise<void>`                 | ✅  |   ✅    |
| [updateTripMetadata(key: string, value: string)](#updateTripMetadata) | `Promise<void>`                 | ✅  |   ✅    |
| [setVehicle()](#setvehicle)                                           | `Promise<void>`                 | ✅  |   ✅    |

### activateAutoStart

```typescript
activateAutoStart(enable: boolean): Promise<void>
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

### startTrip

```typescript
startTrip(): Promise<void>
```

You can start a trip by calling the following method:

```typescript
startTrip();
```

> ℹ️
>
> If a trip's already started, calling this method will have no effect.

### stopTrip

```typescript
stopTrip(): Promise<void>
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

### cancelTrip

```typescript
cancelTrip(): Promise<void>
```

If you want to cancel a trip, you can call this method:

```typescript
cancelTrip();
```

### isTripRunning

```typescript
isTripRunning(): Promise<boolean>
```

This method returns false if the SDK is in `INACTIVE` state, and no trip is currently running.

```typescript
const isTripRunning = await isTripRunning();
```

### activateCrashDetection

```typescript
activateCrashDetection(enable: boolean): Promise<void>
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

> ℹ️
>
> If no trip is running or if the trip has been sent to the server and is currently being analyzed, calling this method will have no effect.

### enableMonitorPotentialTripStart

```typescript
enableMonitorPotentialTripStart(enable: boolean): Promise<void>
```

To listen to trigger events that indicate a start of trip, even if the autostart is disabled, you can call the following method:

```typescript
enableMonitorPotentialTripStart(true);
```

```typescript
setStopTimeout(stopTimeout: number): Promise<void>
```

A trip being analyzed is automatically stopped after a period of inactivity (which begins when the vehicle has stopped).

The DriveQuant SDK allows to set the end-of-trip duration. Default value is 240s.

```typescript
setStopTimeout(240);
```

> ⚠️
>
> If a value greater than 480 is set, the value will be forced to 480.
>
> If a value lower than 120 is set, the value will be forced to 120.

### reset

```typescript
reset(): Promise<void>
```

If you need to reset DriveKit Trip Analysis configuration (user logout for example), you can call the following method:

```typescript
reset();
```

All data saved locally by DriveKit will be erased.

> ℹ️
>
> All DriverKit frameworks have reset method that erases all data saved locally by the framework.

> ⚠️
>
> Make sure that you call reset method of all frameworks to fully reset DriveKit configuration.

### getTripMetadata

```typescript
getTripMetadata(): Promise<TripMetadata | null>
```

If you want to get the metadata of your trip, you can call the following method:

```typescript
await getTripMetadata();
```

### setTripMetadata

```typescript
setTripMetadata(metadata: TripMetadta): Promise<void>
```

If you want to set the metadata of your trip, you can call the following method:

```typescript
await setTripMedata({ key: 'value' });
```

### deleteTripMetadata

```typescript
deleteTripMedata(key?: string): Promise<void>
```

If you want to a specific metadata, you can call the following method:

```typescript
await deleteTripMedata('key');
```

If you want to delete all keys call it without parameter:

```typescript
await deleteTripMedata();
```

### updateTripMetadata

```typescript
updateTripMetadata(key: string, value: string): Promise<void>;
```

If you want to update a specific metadata key, you can call the following method:

```typescript
await updateTripMetadata('key', 'value');
```

### setVehicle

```typescript
setVehicle(vehicle: Partial<VehicleBase> | null): Promise<void>
```

To obtain a more precise analysis on driving behaviour, it's recommended to configure the vehicle used by the driver. You can do this by calling the following method:

```typescript
await setVehicle({
  carEngineIndex: 1,
  carPower: 180,
  carMass: 1,
  carGearboxIndex: 2,
  carConsumption: 4.5,
  carAutoGearboxNumber: 2,
});
```

A detailed description of vehicle parameter is available [here](https://docs.drivequant.com/trip-analysis/ios/references#tripvehicle).

> ℹ️
>
> If no vehicle is configured a default vehicle will be configured with following parameters:
>
> carTypeIndex = 1
>
> carEngineIndex = 1
>
> carPower = 150
>
> carMass = 1
>
> carGearboxIndex = 2
>
> carConsumption = 4.5
