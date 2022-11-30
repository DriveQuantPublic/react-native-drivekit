
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTripSimulatorSpec.h"

@interface RNDriveKitTripSimulator : NSObject <NativeTripSimulatorSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNDriveKitTripSimulator : NSObject <RCTBridgeModule>
#endif

@end
