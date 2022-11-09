# @react-native-drivekit/core

React Native interface for DriveKit Core

## Installation

Install the library:

```sh
npm install @react-native-drivekit/core
```

Install iOS pods:

```sh
cd ios && pod install
```

## Initialization

### Android setup

Add DriveQuant Maven repository in your `build.gradle`.

```gradle
allprojects {
    repositories {
        maven {
            url "https://maven.drivequant.com/repository/android-sdk/"
        }
    }
}
```

Call `initialize` method inside your `MainApplication.java`.

```java
// MainApplication.java
import com.reactnativedrivekitcore.CoreModuleImpl;

// ...

  @Override
  public void onCreate() {
    super.onCreate();
    CoreModuleImpl.INSTANCE.initialize(this);
    // ...
  }
```

### iOS setup

Call `initialize` method in your `AppDelegate.mm`.

```objc
// AppDelegate.mm
#import <RNDriveKitCore/react-native-drivekit-core-umbrella.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNDriveKitCoreWrapper.shared initialize];
}
```

**Note:** If you are using Swift, `initialize` method is also available.

### Bluetooth authorization

Even if your app do not use Bluetooth, you **MUST** include usage description on iOS side. For more details, please take a look inside the [native documentation](https://docs.drivequant.com/get-started-drivekit/ios#project-configuration)

Our recommandation is to use [react-native-permissions](https://github.com/zoontek/react-native-permissions). You can find an implementation example in the [demo application inside this repository](../demo/App.tsx).

### Common

To finish the module's initialization, you need to :

1. Specify your API key;
2. Identify the driver with a unique ID.

#### Specify your API key

```typescript
setApiKey(key: string): void
```

#### Specify your API key

```typescript
setUserId(userId: string): void
```

### Validation

To validate that the initialization has been done successfully, please check your native logs and verify that you can see the following success message.

**Android**
![](./doc/img/android_validation.png)

**iOS**
![](./doc/img/ios_validation.png)

## API

| Method                            | Return Type     | iOS | Android |
| --------------------------------- | --------------- | :-: | :-----: |
| [setApiKey()](#setapikey)         | `Promise<void>` | ✅  |   ✅    |
| [setUserId()](#setuserid)         | `Promise<void>` | ✅  |   ✅    |
| [updateUserId()](#updateuserid)   | `Promise<void>` | ✅  |   ✅    |
| [deleteAccount()](#deleteAccount) | `Promise<void>` | ✅  |   ✅    |
| [reset()](#reset)                 | `Promise<void>` | ✅  |   ✅    |

### setApiKey

```typescript
setApiKey(key: string): void
```

To use DriveKit modules, you have to obtain an API Key from DriveQuant. If you don't have an API key, please contact [DriveQuant](mailto:contact@drivequant.com).

Once you've stored your API key in a secure way in your application, you can configure DriveKit by calling the following method:

```typescript
setApiKey('MyAPIKey');
```

### setUserId

```typescript
setUserId(userId: string): void
```

Each driver must be identified with a unique identifier. Once you have this identifier, configure DriveKit by calling the following method:

```typescript
setUserId('MyUserId');
```

> ℹ️
>
> You can call these 2 configuration methods anywhere in the code. DriveKit will save the value locally. If the app is killed and relaunched, DriveKit will be reconfigured automatically.

> ⚠️
>
> We recommend never using an email address or phone number to define the unique user ID. It is recommended that you set up a unique, universal and anonymous user ID. For example, you can generate a globally unique identifier (GUID) for each of your users.

> ⚠️
>
> DriveKit SDK will not work until you set the API key and the userId.

### updateUserId

```typescript
updateUserId(userId: string): void
```

It is possible to update the userId by calling the following method:

```typescript
updateUserId('newUserId');
```

### deleteAccount

```typescript
deleteAccount(instantDeletion?: boolean): void
```

You can delete a driver's account in DriveKit. This action deletes all the data related to the account.

The deletion can be done instantly or with delay.

- In the first case, when the method is called, the account is instantly deleted.
- In the second case, the driver has 30 days to log back into the application and reactivate his account.

To delete a driver's account, use the following method:

```typescript
deleteAccount(false);
```

instantDeletion can have 2 values:

- `false` : **Default value**, allows the user to recover the deleted account by logging-in again with the same credentials. Users have 30 days starting from the day when the account was deleted.
- `true` : Allow to delete an account instantly. The account and all the related data will be immediately deleted and no rollback is possible.

> ℹ️
>
> Your team needs to have the deletion feature activated to use this method. Please contact DriveQuant if you need it.

> ℹ️
>
> To be able to check whenever the account deletion is complete, you have to use the DriveKitDelegate interface.

> ⚠️
>
> You should restore the DriveKit API key in the onAccountDeleted() callback only when the status value is SUCCESS.

### reset

```typescript
reset(): void
```

If you need to reset DriveKit configuration (user logout for example), you can call the following method:

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
