
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDriverDataSpec.h"

@interface DriverData : NSObject <NativeDriverDataSpec>
#else
#import <React/RCTBridgeModule.h>

@interface DriverData : NSObject <RCTBridgeModule>
#endif

@end
