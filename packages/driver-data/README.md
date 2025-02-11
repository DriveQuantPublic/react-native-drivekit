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

If you have disabled the DriveKit auto-initialization, call initialize method inside the `onCreateMethod()` of your Appplication class.

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
    final RNTripNotification tripNotification = new RNTripNotification("Notification title", "Notification description", R.drawable.common_google_signin_btn_icon_dark)
    final RNHeadlessJSNotification headlessJSNotification = new RNHeadlessJSNotification("Notification title", "Notification description");
    DriveKitTripAnalysisModule.Companion.initialize(tripNotification, headlessJSNotification);

    DriveKitDriverDataModule.Companion.initialize(); // ADD THIS LINE
    (…)
  }
```

---

### iOS setup

If you have disabled the DriveKit auto-initialization, call `initialize` method in your `AppDelegate.mm`.

```objc
// AppDelegate.mm
#import <RNDriveKitDriverData/react-native-drivekit-driver-data-umbrella.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[RNDriveKitCoreWrapper.shared initialize];
  [RNDriveKitTripAnalysisWrapper.shared initializeWithLaunchOptions:launchOptions];
  [[RNDriveKitDriverDataWrapper.shared initialize]; // ADD THIS LINE
  (…)
}
```

**Note:** If you are using Swift, `initialize` method is also available.

## API

| Method                                                | Return Type                         | iOS | Android |
| ----------------------------------------------------- | ----------------------------------- | :-: | :-----: |
| [getTripsOrderByDateAsc()](#gettripsorderbydateasc)   | `Promise<GetTripsResponse \| null>` | ✅  |   ✅    |
| [getTripsOrderByDateDesc()](#gettripsorderbydatedesc) | `Promise<GetTripsResponse \| null>` | ✅  |   ✅    |
| [getTrip()](#gettrip)                                 | `Promise<GetTripResponse \| null>`  | ✅  |   ✅    |
| [getRoute()](#getRoute)                               | `Promise<Route \| null>`            | ✅  |   ✅    |
| [deleteTrip()](#deletetrip)                           | `Promise<void>`                     | ✅  |   ✅    |

### getTripsOrderByDateAsc

### getTripsOrderByDateDesc

```typescript
getTripsOrderByDateAsc(
  synchronizationType: SynchronizationType = 'DEFAULT',
  transportationModes: TransportationMode[] = []
): Promise<GetTripsResponse | null>
```

or

```typescript
getTripsOrderByDateDesc(
  synchronizationType: SynchronizationType = 'DEFAULT',
  transportationModes: TransportationMode[] = []
): Promise<GetTripsResponse | null>
```

| GetTripsResponse | Type             |
| ---------------- | ---------------- |
| `status`         | `TripSyncStatus` |
| `trips`          | `[Trip]`         |

To get driver's trips, you have to call the following method:

```typescript
const result = await getTripsOrderByDateAsc();
```

or

```typescript
const result = await getTripsOrderByDateDesc();
```

### getTrip

```typescript
getTrip(itinId: string): Promise<GetTripResponse | null>
```

| GetTripResponse | Type             |
| --------------- | ---------------- |
| `status`        | `TripSyncStatus` |
| `trip`          | `Trip`           |

To get a specific trip, you have to call the following method:

```typescript
const result = await getTrip('TRIP_ID_HERE);
```

### getRoute

To get road data of the trip (latitude, longitude), you have to call the following method::

```typescript
getRoute(itinId: string): Promise<Route>
```

If `route` value in the callback is `null`, the synchronization has failed.

Example:

```typescript
const route = await getRoute('TRIP_ID_HERE');
```

### deleteTrip

To delete a trip, you have to call the following method:

```typescript
deleteTrip(itinId: string): Promise<boolean>
```

The itinId parameter is the unique identifier for a trip.

```typescript
await deleteTrip('TRIP_ID_HERE');
```
