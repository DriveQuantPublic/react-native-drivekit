
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDrivekitTripAnalysisSpec.h"

@interface RNDriveKitTripAnalysis : NSObject <NativeDrivekitTripAnalysisSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitTripAnalysis : NSObject <RCTBridgeModule>
#endif

@end
