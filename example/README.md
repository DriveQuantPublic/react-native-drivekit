# DriveKit React Native sample application

This is an sample application to illustrate how to embed the DriveKit SDK into a React Native mobile application.

The code of this app is designed to help you integrate DriveKit into your application.

## How to launch the sample app?

Open the main repository folder on the terminal.

Run the following command:

```
yarn
```

Go to the example application folder.

```
cd example
```

Install Ruby dependencies using the following command:

```
bundle install
```

Install iOS depenencies using the following command:

```
cd ios && bundle exec pod install && cd ..
```

### For an Android app

To run on Android, execute the following command:

```
yarn android
```

### For an iOS app

To run on iOS, execute the following command:

```
yarn ios
```

## How to run the sample app?

To run the sample application you must have a valid API key.

Please, contact us to get your API key via: [contact@drivequant.com](mailto:contact@drivequant.com)

Once you have the API Key please :

- Uncomment `DriveKit.setApiKey("")` line
- Paste the API Key at the beggining of the `App` component in `App.tsx`:

```
// ========================================
// ↓↓↓ ENTER YOUR DRIVEKIT API KEY HERE ↓↓↓
// ========================================
// DriveKit.setApiKey("")
```

<img src="./doc/img/sample_app.png" width="300" />

## More info

The full documentation to install the DriveKit SDK in a React Native application is available [here](/..)
