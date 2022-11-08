#ifdef RCT_NEW_ARCH_ENABLED
#import <RNCoreSpec/RNCoreSpec.h>

@interface RNDriveKitCore : NSObject <NativeCoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitCore : NSObject <RCTBridgeModule>
#endif

@end
