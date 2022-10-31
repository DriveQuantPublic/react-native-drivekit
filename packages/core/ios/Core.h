#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCoreSpec.h"

@interface Core : NSObject <NativeCoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Core : NSObject <RCTBridgeModule>
#endif

@end
