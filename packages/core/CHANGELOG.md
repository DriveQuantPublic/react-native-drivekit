# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v3.0.0...v3.1.0) (2025-10-16)


### Features

* add enqueueIOSDiagnosisOperation() method in Core ([64a164c](https://github.com/DriveQuantPublic/react-native-drivekit/commit/64a164c3db424845aa057035b1410ea0047b0b5b))
* update DriveKit to 2.21.0 iOS and 2.20.0 Android (+ target 36) ([080ba24](https://github.com/DriveQuantPublic/react-native-drivekit/commit/080ba24071a06e543de72cb9214b2866ca0f303a))





# [3.0.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v3.0.0-alpha3...v3.0.0) (2025-06-10)

### Features

- upgrade project to support React Native 0.78
- enable the New Architecture.
- update DriveKit modules to 2.15.2 for iOS and 2.15.0 for Android

# [3.0.0-alpha3](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v3.0.0-alpha2...v3.0.0-alpha3) (2025-06-10)

**Note:** Version bump only for package @react-native-drivekit/core





# [3.0.0-alpha2](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v3.0.0-alpha1...v3.0.0-alpha2) (2025-06-10)

**Note:** Version bump only for package @react-native-drivekit/core





# [3.0.0-alpha1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.7.0...v3.0.0-alpha1) (2025-06-10)


### Bug Fixes

* add missing method to android package ([7d6189f](https://github.com/DriveQuantPublic/react-native-drivekit/commit/7d6189f3bab754e80823db6b0481597e51492128))
* babel preset migrated in [@react-native](https://github.com/react-native) since 0.73 ([08809dc](https://github.com/DriveQuantPublic/react-native-drivekit/commit/08809dcfcafe640c22c112b6e0ab22ee67761561))
* deps for codegen ([969dfb3](https://github.com/DriveQuantPublic/react-native-drivekit/commit/969dfb3e775ae277477077a124b8d44238c2153a))
* missing method in android ([7f4e2e9](https://github.com/DriveQuantPublic/react-native-drivekit/commit/7f4e2e9b6ed5b25ae01e61fa8ee4e1dfbab072f3))
* missing typing of promise for method returning void ([7f1af3b](https://github.com/DriveQuantPublic/react-native-drivekit/commit/7f1af3b6b8cfec4e301f86253598fe5e7d6ccc81))
* rename codegen name on android ([0c4bd18](https://github.com/DriveQuantPublic/react-native-drivekit/commit/0c4bd18b5e565be47ff3b08198a8dd8d8ab9d4df))
* rename module to be consistent accross platforms ([31f6071](https://github.com/DriveQuantPublic/react-native-drivekit/commit/31f60716fd2e83c559a176c2b862a01887809710))
* use EXPORT_METHOD instead of REMAP_METHOD to expose method with correct name to Codegen ([57deac1](https://github.com/DriveQuantPublic/react-native-drivekit/commit/57deac1a3ae0300e3cf2bb121d6de24033d5862e))


### Features

* create event emitter compatible with new arch: ([e375322](https://github.com/DriveQuantPublic/react-native-drivekit/commit/e375322da114a05fa7594d9c726fd511bb644863))
* move types and make TripAnalysis buildable running on Android ([d9ab29d](https://github.com/DriveQuantPublic/react-native-drivekit/commit/d9ab29d44c39f14826ebd0e211431ed6bf6a4866))
* upgrade DriveKit modules to 2.15.0 on Android and 2.15.1 on iOS ([b598e45](https://github.com/DriveQuantPublic/react-native-drivekit/commit/b598e45f1e7abab323306f373da07802c0795561))
* use latest version of RN in core dev deps ([f3bdb49](https://github.com/DriveQuantPublic/react-native-drivekit/commit/f3bdb49415053b46dafcb92003bff5cbe4a08458))





# [2.7.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.6.0...v2.7.0) (2025-04-16)

### Bug Fixes

- fix timestamp parsing value in CrashInfo (Android) ([5ef5702](https://github.com/DriveQuantPublic/react-native-drivekit/commit/5ef5702ed81b56f56351109df2faf9aaaa864d77))
- string union stype forbidden in codegen ([c2003ee](https://github.com/DriveQuantPublic/react-native-drivekit/commit/c2003ee724f6f1ddb1af09f5b5e778a99a454dd4))

### Features

- manage userLocationUrl field in CrashInfo ([c2891df](https://github.com/DriveQuantPublic/react-native-drivekit/commit/c2891df3ef0ff9764d05620f76543aa2593745cd))
- move Trip model into DriverData package ([#140](https://github.com/DriveQuantPublic/react-native-drivekit/issues/140)) ([561f27c](https://github.com/DriveQuantPublic/react-native-drivekit/commit/561f27cd4d7dce391bb878588fbb8b0986ce4373))
- remove enableSandboxMode method ([#143](https://github.com/DriveQuantPublic/react-native-drivekit/issues/143)) ([b7802eb](https://github.com/DriveQuantPublic/react-native-drivekit/commit/b7802eb248347513221d8cf4385caa3a127bfb66))
- bump DriveKit version to 2.14.0 on iOS and Android ([d9248d9](https://github.com/DriveQuantPublic/react-native-drivekit/commit/d9248d93b099812aac990dd4fe431fe65cf5fc62))

# [2.7.0-alpha2](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.7.0-alpha1...v2.7.0-alpha2) (2025-03-20)

### Bug Fixes

- update getUserInfo signature ([fce0223](https://github.com/DriveQuantPublic/react-native-drivekit/commit/fce0223ca0513267e670cb0301cb87f94d6e5417))

# [2.7.0-alpha1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.6.0...v2.7.0-alpha1) (2025-03-20)

**Note:** Version bump only for package @react-native-drivekit/core

# [2.6.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.5.0...v2.6.0) (2025-02-26)

### Features

- release 2.6.0 ([330ac74](https://github.com/DriveQuantPublic/react-native-drivekit/commit/330ac74f1c7108d768ea8a428dd76daebe0ec4b6))
- upgrade minSdk to 26 (Android 8.0) ([#128](https://github.com/DriveQuantPublic/react-native-drivekit/issues/128)) ([4e5fa40](https://github.com/DriveQuantPublic/react-native-drivekit/commit/4e5fa40e6803a212c4a920bc373e5dac0790d76b))

# [2.5.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.4.3...v2.5.0) (2025-02-03)

### Features

- update iOS modules to 2.9.1 ([cb1cf0d](https://github.com/DriveQuantPublic/react-native-drivekit/commit/cb1cf0d39611d3ba2a47ed66bca1719a9f1b4e6f))

## [2.4.3](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.4.1...v2.4.3) (2025-01-07)

### Features

- implement GetCurrenttripInfo() and getLastTripLocation() ([#123](https://github.com/DriveQuantPublic/react-native-drivekit/issues/123)) ([72a4937](https://github.com/DriveQuantPublic/react-native-drivekit/commit/72a4937ee49874f3e8abf30dd93d5d9c8a4c7948))
- release 2.4.2 ([#122](https://github.com/DriveQuantPublic/react-native-drivekit/issues/122)) ([ee404f7](https://github.com/DriveQuantPublic/react-native-drivekit/commit/ee404f7befe29f2f7b704bfcebe07b4486f435de))
- update DriveKit iOS modules to 2.9.0 and Android to 2.9.1 ([58496d7](https://github.com/DriveQuantPublic/react-native-drivekit/commit/58496d78d421d2dace89802832635d7ad7fb2e3e))

## [2.4.2](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.4.1...v2.4.2) (2024-11-22)

**Note:** Version bump only for package @react-native-drivekit/core

## [2.4.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.4.0...v2.4.1) (2024-09-20)

### Features

- update iOS modules to 2.5.1 ([e810883](https://github.com/DriveQuantPublic/react-native-drivekit/commit/e8108837d4b84c421b2921d9469820b3c92eb488))

# [2.4.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.3.1...v2.4.0) (2024-09-17)

### Bug Fixes

- do not update package.json version field now ([b5e0b97](https://github.com/DriveQuantPublic/react-native-drivekit/commit/b5e0b97311784c67df1b9eb0ccd8390c15a892ab))

### Features

- update Android modules to 2.4.3 and iOS module to 2.5.0 ([d946dfd](https://github.com/DriveQuantPublic/react-native-drivekit/commit/d946dfd024444b6aff3e794a0d5da4223f411f54))

## [2.3.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.3.0...v2.3.1) (2024-09-12)

### Features

- update Android DriveKit modules to 2.4.2 ([139d4cc](https://github.com/DriveQuantPublic/react-native-drivekit/commit/139d4cc44ca266fbc880a732514298a726638095))

# [2.3.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.2.0...v2.3.0) (2024-09-09)

### Features

- update DriveKit modules ([1ab3b7c](https://github.com/DriveQuantPublic/react-native-drivekit/commit/1ab3b7cd7ff8b22c45c6b24e8aa624b12fb3fbb4))

# [2.2.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.1.0...v2.2.0) (2024-06-20)

### Features

- update DriveKit modules to 2.3.0 ([c8b134f](https://github.com/DriveQuantPublic/react-native-drivekit/commit/c8b134f6c892280217b4dbdb7259b4991addd29b))

# [2.1.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.0.2...v2.1.0) (2024-06-03)

### Features

- update DriveKit version to 2.2.0 ([02b7f25](https://github.com/DriveQuantPublic/react-native-drivekit/commit/02b7f25c5064f5d6c4d0253760eb4f9f89e7b299))

## [2.0.2](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.0.1...v2.0.2) (2024-05-06)

### Bug Fixes

- Core: fix User Defaults declaration in the Privacy manifest ([208078f](https://github.com/DriveQuantPublic/react-native-drivekit/commit/208078f2a795df2c02c00dd241daba841779bae1))

## [2.0.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v2.0.0...v2.0.1) (2024-04-18)

### Features

- update Android DriveKit modules to 2.0.1 ([18c920b](https://github.com/DriveQuantPublic/react-native-drivekit/commit/18c920b687ac3db1d80e14620a54421ba6ca7a15))

# [2.0.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.9.0...v2.0.0) (2024-04-17)

### Features

- update DriveKit modules to 2.0.0 ([#111](https://github.com/DriveQuantPublic/react-native-drivekit/issues/111)) ([1ff7cea](https://github.com/DriveQuantPublic/react-native-drivekit/commit/1ff7cea96de12fd29512b6e64774afeb29dc7e59))

# [1.9.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.8.1...v1.9.0) (2024-02-07)

**Note:** Version bump only for package @react-native-drivekit/core

## [1.8.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.7.0...v1.8.1) (2024-02-02)

**Note:** Version bump only for package @react-native-drivekit/core

# [1.8.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.7.0...v1.8.0) (2024-01-25)

**Note:** Version bump only for package @react-native-drivekit/core

# [1.7.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.6.0...v1.7.0) (2023-12-13)

### Features

- add device configuration event listener ([#104](https://github.com/DriveQuantPublic/react-native-drivekit/issues/104)) ([0dbaf23](https://github.com/DriveQuantPublic/react-native-drivekit/commit/0dbaf23926144fae9b65443a57df523316e01add))
- update DriveKit modules ([#104](https://github.com/DriveQuantPublic/react-native-drivekit/issues/104)) ([0dbaf23](https://github.com/DriveQuantPublic/react-native-drivekit/commit/0dbaf23926144fae9b65443a57df523316e01add))

# [1.6.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.5.2...v1.6.0) (2023-10-12)

### Features

- update DriveKit modules ([f8eb11c](https://github.com/DriveQuantPublic/react-native-drivekit/commit/f8eb11ce0a26400253eb7e5615720b8e9ea6ee23))

**Note:** Version bump only for package @react-native-drivekit/core

## [1.5.2](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.5.1...v1.5.2) (2023-05-24)

**Note:** Version bump only for package @react-native-drivekit/core

## [1.5.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.5.0...v1.5.1) (2023-05-17)

### Features

- update DriveKit Android modules to 1.31.2 ([2bebffc](https://github.com/DriveQuantPublic/react-native-drivekit/commit/2bebffcc4d9dc344846dc211105153dea315ef1a))

# [1.5.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.4.0-temp...v1.5.0) (2023-04-04)

### Features

- update DriveKit Android modules to 1.30.0 ([c0ff47e](https://github.com/DriveQuantPublic/react-native-drivekit/commit/c0ff47e63a86004fc0ef82331c0f4786c8e342cd))
- update DriveKit iOS modules to 1.31.1 ([0b9cceb](https://github.com/DriveQuantPublic/react-native-drivekit/commit/0b9ccebaae220de159a4591ca253aa02d771094a))

## [1.4.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.4.0-temp...v1.4.1) (2023-02-16)

### Features

- update DriveKit version number for Android to 1.29.3 ([e0cb12b](https://github.com/DriveQuantPublic/react-native-drivekit/commit/e0cb12b2906eab24845ae7f5318593cc32f866e8))

# [1.4.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.2.0...v1.4.0) (2023-02-14)

### Features

- update DriveKit version number for Android to 1.29.2 ([a73fd2e](https://github.com/DriveQuantPublic/react-native-drivekit/commit/a73fd2ee13200d0ee803dc17206ac44439653cdd))
- update DriveKit version number for iOS to 1.30.0 ([2204c9f](https://github.com/DriveQuantPublic/react-native-drivekit/commit/2204c9fcea544010c6f7adca633547ef6c5c0e26))

# [1.3.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.2.0...v1.3.0) (2023-01-16)

### Features

- update DriveKit version for iOS into 1.29.0 ([10d070b](https://github.com/DriveQuantPublic/react-native-drivekit/commit/10d070bd1058065bb55a3dd37ee901ea6b07eaab))
- update DriveKit modules and minSdkVersion to 23 ([2810367](https://github.com/DriveQuantPublic/react-native-drivekit/commit/28103674fc8fca1fc9f6ccbbb7bbdc9f501e30f2))

# [1.2.0](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.1.1...v1.2.0) (2022-12-12)

### Features

- add requestLocationPermission function to DriveKit Core module ([#81](https://github.com/DriveQuantPublic/react-native-drivekit/issues/81)) ([f0bae0c](https://github.com/DriveQuantPublic/react-native-drivekit/commit/f0bae0cc90da17536368d6eb055bbdefe7e8c090))
- update DriveKit version for iOS into 1.28.2 ([#82](https://github.com/DriveQuantPublic/react-native-drivekit/issues/82)) ([51c796b](https://github.com/DriveQuantPublic/react-native-drivekit/commit/51c796b0cc059d9042855396fa9ce1e965f03b47))

# [1.1.1](https://github.com/DriveQuantPublic/react-native-drivekit/compare/v1.1.0...v1.1.1) (2022-12-02)

**Note:** Version bump only for package @react-native-drivekit/core
