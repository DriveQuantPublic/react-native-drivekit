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

| PresetTrip                         | Description                                                                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SHORT_TRIP`                       | Trip too short that does not allow to rate the driver's behavior                                                                                  |
| `MIXED_TRIP`                       | A 15-minute mixed trip in urban and suburban areas                                                                                                |
| `CITY_TRIP`                        | A 20-minute city trip                                                                                                                             |
| `SUBURBAN_TRIP`                    | A 30-minute trip performed in a suburban environment mostly                                                                                       |
| `HIGHWAY_TRIP`                     | A 55-minute highway trip                                                                                                                          |
| `TRAIN_TRIP`                       | Trip recorded in a train to test the alternative transportation modes detection                                                                   |
| `BUS_TRIP`                         | Trip recorded in a bus to test the alternative transportation modes detection                                                                     |
| `BOAT_TRIP`                        | Trip recorded in a boat to test the alternative transportation modes detection                                                                    |
| `TRIP_WITH_CRASH_CONFIRMED_40KMH`  | A short trip with a collision at 40 km/h that occurs 132 seconds after the trip begins and that corresponds to a confirmed accident               |
| `TRIP_WITH_CRASH_CONFIRMED_30KMH`  | A short trip with a collision at 30 km/h that occurs 137 seconds after the trip begins and that corresponds to a confirmed accident               |
| `TRIP_WITH_CRASH_CONFIRMED_20KMH`  | A short trip with a collision at 20 km/h that occurs 141 seconds after the trip begins and that corresponds to a confirmed accident               |
| `TRIP_WITH_CRASH_UNCONFIRMED_0KMH` | A short trip with a collision during a vehicle stop that occurs 159 seconds after the trip begins and that corresponds to an unconfirmed accident |

### stopTrip

```typescript
stopTrip(): Promise<void>
```

To stop the trip simulation, call the following method. The trip will be stopped instantly:

```typescript
stopTrip();
```
