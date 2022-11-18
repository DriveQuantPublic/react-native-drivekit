
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDriverDataSpec.h"

@interface RNDriveKitDriverData : NSObject <NativeDriverDataSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitDriverData : NSObject <RCTBridgeModule>
#endif

@end
