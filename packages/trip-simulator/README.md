# @react-native-drivekit/trip-simulator

React Native interface for DriveKit Trip Simulator

## Prerequisite

Before installing `@react-native-drivekit/trip-simulator` **you must have installed** `@react-native-drivekit/core` and `@react-native-drivekit/trip-analysis`.

---

**IMPORTANT**

It is strongly recommended not to integrate this component into an application built for production. This component has been designed to facilitate preliminary testing and should never remain in your production app.

---

## Installation

Install the library:

```sh
npm install @react-native-drivekit/trip-simulator
```

Install iOS pods:

```sh
cd ios && pod install
```

---

## Initialization

### Android setup

There is no initialize method to call for the Trip Simulator module, however you have to configure your device to mock location data.

- The user must enable the developer mode in Android. The [official documentation](https://developer.android.com/studio/debug/dev-options#enable) explains well how to proceed.
- In the Debugging category settings, tap on _Select mock location app_ and select yours. It sometimes appears that you might uninstall and reinstall your app on the device in order to register it as a mock location app.

### iOS setup

There is no initialize method to call for the Trip Simulator module

## API

| Method                    | Return Type     | iOS | Android |
| ------------------------- | --------------- | :-: | :-----: |
| [startTrip()](#starttrip) | `Promise<void>` | ✅  |   ✅    |
| [stopTrip()](#stoptrip)   | `Promise<void>` | ✅  |   ✅    |

### startTrip

```typescript
startTrip(presetTrip: PresetTrip): Promise<void>
```

To simulate a trip, call the start method in TripSimulator with a appropriate configuration with the `PresetTrip` parameter.

```typescript
startTrip('HIGHWAY_TRIP');
```

A detailed description of `PresetTrip` parameter is available [here]([https://docs.drivequant.com/trip-analysis/ios/references#tripvehicle](https://docs.drivequant.com/trip-analysis/trip-simulator/android#usage).

### stopTrip

```typescript
stopTrip(): Promise<void>
```

To stop the trip simulation, call the following method. The trip will be stopped instantly:

```typescript
stopTrip();
```
