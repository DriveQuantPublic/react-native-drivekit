#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <RNDriveKitCore/react-native-drivekit-core-umbrella.h>
#import <RNDriveKitTripAnalysis/react-native-drivekit-trip-analysis-umbrella.h>
#import <RNDriveKitDriverData/react-native-drivekit-driver-data-umbrella.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"DriveKitRNDemoApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
