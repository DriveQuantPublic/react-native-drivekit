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
