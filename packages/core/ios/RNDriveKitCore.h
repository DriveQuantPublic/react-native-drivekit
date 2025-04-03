#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNDriveKitCoreSpec/RNDriveKitCoreSpec.h>

@interface RNDriveKitCore : RCTEventEmitter <NativeCoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitCore : RCTEventEmitter <RCTBridgeModule>
#endif

@end
