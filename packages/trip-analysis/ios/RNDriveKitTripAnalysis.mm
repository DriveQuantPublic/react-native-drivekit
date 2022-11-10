#import "RNDrivekitTripAnalysis.h"
#import "RNDriveKitTripAnalysis-Swift.h"


@implementation RNDriveKitTripAnalysis
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(activateAutoStart, activateAutoStartWithEnable:(nonnull NSNumber *)enable)
{
    [self activateAutoStart:enable];
}


- (void)activateAutoStart:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared activateAutoStartWithEnable:enable];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDrivekitTripAnalysisSpecJSI>(params);
}
#endif

@end
