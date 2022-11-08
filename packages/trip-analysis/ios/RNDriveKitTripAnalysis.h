
#ifdef RCT_NEW_ARCH_ENABLED
#import <RNTripAnalysisSpec/RNTripAnalysisSpec.h>

@interface RNDriveKitTripAnalysis : NSObject <NativeDrivekitTripAnalysisSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitTripAnalysis : NSObject <RCTBridgeModule>
#endif

@end
