#import "RNDrivekitTripAnalysis.h"
#import "RNDriveKitTripAnalysis-Swift.h"


@implementation RNDriveKitTripAnalysis
{
  bool hasListeners;
}

- (id)init {
    self = [super init];
    if(self){
        [RNEventEmitter.shared registerEventEmitterWithEventEmitter:self];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *>*)supportedEvents {
    return RNEventEmitter.allEvents;
}

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(activateAutoStart, activateAutoStartWithEnable:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self activateAutoStart:enable];
    resolve(nil);
}

RCT_REMAP_METHOD(activateCrashDetection, activateCrashDetectionWithEnable:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self activateCrashDetection: enable];
    resolve(nil);
}

RCT_REMAP_METHOD(startTrip, startTripAnalysis resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self startTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(stopTrip, stopTripAnalysis resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self stopTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(cancelTrip, cancelTripAnalysis resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self cancelTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(enableMonitorPotentialTripStart, enableMonitorPotentialTripStartWithEnable:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self enableMonitorPotentialTripStart:enable];
    resolve(nil);
}

- (void)activateAutoStart:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared activateAutoStartWithEnable:enable];
}

- (void)startTrip {
    [RNDriveKitTripAnalysisWrapper.shared startTrip];
}

- (void)stopTrip {
    [RNDriveKitTripAnalysisWrapper.shared stopTrip];
}


- (void)cancelTrip {
    [RNDriveKitTripAnalysisWrapper.shared cancelTrip];
}


- (void)enableMonitorPotentialTripStart:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared enableMonitorPotentialTripStartWithEnable:enable];
}

-(void)activateCrashDetection:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared activateCrashDetectionWithEnable:enable];
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
