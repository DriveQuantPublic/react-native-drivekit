#import <React/RCTBridgeModule.h>
@class RNDriveKitTripSimulatorWrapper;

@interface RNDriveKitTripSimulatorWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitTripSimulatorWrapper *_Nonnull shared;

- (void)startWithPresetTrip:(NSString *)presetTrip;
- (void)stop;
@end
