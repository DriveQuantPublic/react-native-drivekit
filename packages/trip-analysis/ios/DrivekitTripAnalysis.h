
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDrivekitTripAnalysisSpec.h"

@interface DrivekitTripAnalysis : NSObject <NativeDrivekitTripAnalysisSpec>
#else
#import <React/RCTBridgeModule.h>

@interface DrivekitTripAnalysis : NSObject <RCTBridgeModule>
#endif

@end
