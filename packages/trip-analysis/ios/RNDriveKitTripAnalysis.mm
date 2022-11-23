#import "RNDrivekitTripAnalysis.h"
#import "RNDriveKitTripAnalysis-Swift.h"


@implementation RNDriveKitTripAnalysis
{
  bool hasListeners;
}

- (id)init {
    self = [super init];
    if(self){
        [RNTripAnalysisEventEmitter.shared registerEventEmitterWithEventEmitter:self];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *>*)supportedEvents {
    return RNTripAnalysisEventEmitter.allEvents;
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

RCT_REMAP_METHOD(startTrip, startTripAnalysisWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self startTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(stopTrip, stopTripAnalysisWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self stopTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(cancelTrip, cancelTripAnalysisWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self cancelTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(enableMonitorPotentialTripStart, enableMonitorPotentialTripStartWithEnable:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self enableMonitorPotentialTripStart:enable];
    resolve(nil);
}

RCT_REMAP_METHOD(isTripRunning, isTripRunningWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber* tripRunning = [self isTripRunning];
    resolve(tripRunning);
}

RCT_REMAP_METHOD(reset, resetWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self reset];
    resolve(nil);
}

RCT_REMAP_METHOD(setStopTimeout, setStopTimeoutWithStopTimeout:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setStopTimeout:enable];
    resolve(nil);
}

RCT_REMAP_METHOD(getTripMetadata, getTripMetaDataWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripMetadata:resolve rejecter:reject];
}

RCT_REMAP_METHOD(setTripMetadata, setTripMetaDataWithMetadata:(NSDictionary *)metadata resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setTripMetadata:metadata];
    resolve(nil);
}

RCT_REMAP_METHOD(deleteTripMetadata, deleteTripMetaDataWithkey:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self deleteTripMetadata:key resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(updateTripMetadata, updateTripMetaDataWithkey:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self updateTripMetadata:key value:value resolver:resolve rejecter:reject];
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

- (NSNumber *)isTripRunning {
    return [RNDriveKitTripAnalysisWrapper.shared isTripRunning];
}

- (void)enableMonitorPotentialTripStart:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared enableMonitorPotentialTripStartWithEnable:enable];
}

-(void)activateCrashDetection:(NSNumber *)enable {
    [RNDriveKitTripAnalysisWrapper.shared activateCrashDetectionWithEnable:enable];
}

- (void)reset {
    [RNDriveKitTripAnalysisWrapper.shared reset];
}

-(void)setStopTimeout:(NSNumber *)stopTimeout {
    [RNDriveKitTripAnalysisWrapper.shared setStopTimeout:stopTimeout];
}

-(void)getTripMetadata:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared getTripMetadataWithResolver:resolve rejecter:reject];
}

-(void)setTripMetadata:(NSDictionary *)metadata {
    [RNDriveKitTripAnalysisWrapper.shared setTripMetadataWithMetadata:metadata];
}

-(void)deleteTripMetadata:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared deleteTripMetadataWithKey:key];
    resolve(nil);
}

-(void)updateTripMetadata:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared updateTripMetadataWithKey:key value:value];
    resolve(nil);
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
