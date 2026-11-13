// swift-tools-version: 6.0
// Swift Package Manager manifest used by `npx react-native spm` (the podspec
// is used by CocoaPods). React Native references this package through
// <app>/ios/build/generated/autolinking/libs/RNDriveKitTripSimulator, so the relative
// paths below point at the React Native packages generated for the app.

import PackageDescription

let reactDependencies: [Target.Dependency] = [
    .product(name: "ReactHeaders", package: "ReactNative"),
    .product(name: "ReactNativeHeaders", package: "ReactNative"),
    .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
    .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
]

let package = Package(
    name: "RNDriveKitTripSimulator",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "RNDriveKitTripSimulator", targets: ["RNDriveKitTripSimulatorObjC"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
        .package(url: "https://github.com/DriveQuantPublic/drivekit-sdk-spm.git", exact: "3.4.0"),
    ],
    targets: [
        // Swift and Objective-C++ can't share a target, so the Swift wrapper
        // is its own target. It doesn't reference the Objective-C++ module
        // class, which would make the two targets depend on each other.
        .target(
            name: "RNDriveKitTripSimulatorSwift",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "DriveKitTripSimulator", package: "drivekit-sdk-spm"),
            ],
            path: ".",
            sources: [
                "RNDriveKitTripSimulatorWrapper.swift",
            ]
        ),
        .target(
            name: "RNDriveKitTripSimulatorObjC",
            dependencies: [.target(name: "RNDriveKitTripSimulatorSwift")] + reactDependencies,
            path: ".",
            sources: [
                "RNDriveKitTripSimulator.mm",
            ],
            // Not named after a header, so SPM doesn't pick an umbrella header in
            // this folder. Nothing imports this module; it's registered by class name.
            publicHeadersPath: ".",
            cxxSettings: [
                .define("RCT_NEW_ARCH_ENABLED", to: "1"),
                .define("DEBUG", .when(configuration: .debug)),
                .define("NDEBUG", .when(configuration: .release)),
            ]
        ),
    ],
    // Same language mode as the CocoaPods build (SWIFT_VERSION = 5.0).
    swiftLanguageModes: [.v5],
    cxxLanguageStandard: .cxx20
)
