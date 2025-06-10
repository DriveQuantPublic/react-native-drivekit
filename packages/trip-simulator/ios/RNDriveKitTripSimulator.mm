#import "RNDriveKitTripSimulator.h"
#import "RNDriveKitTripSimulator-Swift.h"

@implementation RNDriveKitTripSimulator
RCT_EXPORT_MODULE_NO_LOAD(RNDriveKitTripSimulator, RNDriveKitTripSimulator)

RCT_EXPORT_METHOD(start:(NSString *)presetTrip
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [RNDriveKitTripSimulatorWrapper.shared startWithPresetTrip:presetTrip];
    resolve(nil);
}

RCT_EXPORT_METHOD(stop:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [RNDriveKitTripSimulatorWrapper.shared stop];
    resolve(nil);
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTripSimulatorSpecJSI>(params);
}
#endif

- (void)start:(nonnull NSString *)presetTrip resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  [RNDriveKitTripSimulatorWrapper.shared startWithPresetTrip:presetTrip];
}

- (void)stop:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
  [RNDriveKitTripSimulatorWrapper.shared stop];
}

@end
