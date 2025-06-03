#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNTripAnalysisSpec/RNTripAnalysisSpec.h>

@interface RNDriveKitTripAnalysis : NativeDriveKitTripAnalysisSpecBase <NativeDriveKitTripAnalysisSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitTripAnalysis : RCTEventEmitter <RCTBridgeModule>
#endif

@end
