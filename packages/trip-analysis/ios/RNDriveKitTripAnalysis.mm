#import "RNDriveKitTripAnalysis.h"
#import "RNDriveKitTripAnalysis-Swift.h"

@implementation RNDriveKitTripAnalysis
{
  bool hasListeners;
}

RCT_EXPORT_MODULE_NO_LOAD(RNDriveKitTripAnalysis, RNDriveKitTripAnalysis)

- (id)init {
    self = [super init];
    if(self){
        [RNTripAnalysisEventEmitter.shared registerEventEmitterWithEventEmitter:self];
    }
    return self;
}

+ (void)load {
    [super load];

    if ([RNDriveKitTripAnalysisWrapper isAutoInitEnabled]) {
        [RNDriveKitTripAnalysisWrapper.shared addTripListener];
    }
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

RCT_EXPORT_METHOD(startTrip:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self startTrip];
    resolve(nil);
}

RCT_EXPORT_METHOD(stopTrip:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self stopTrip];
    resolve(nil);
}

RCT_EXPORT_METHOD(cancelTrip:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self cancelTrip];
    resolve(nil);
}

RCT_REMAP_METHOD(enableMonitorPotentialTripStart, enableMonitorPotentialTripStartWithEnable:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self enableMonitorPotentialTripStart:enable];
    resolve(nil);
}

RCT_EXPORT_METHOD(isTripRunning:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
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
    [self deleteTripMetadata:key];
    resolve(nil);
}

RCT_REMAP_METHOD(updateTripMetadata, updateTripMetaDataWithkey:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self updateTripMetadata:key value:value];
    resolve(nil);
}

RCT_REMAP_METHOD(setVehicle, setVehicleWithVehicle:(NSDictionary *)vehicle resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setVehicle:vehicle];
    resolve(nil);
}

RCT_REMAP_METHOD(getCurrentTripInfo, getCurrentTripInfoWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getCurrentTripInfo:resolve rejecter:reject];
}

RCT_REMAP_METHOD(getLastTripLocation, getLastTripLocationWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getLastTripLocation:resolve rejecter:reject];
}

RCT_REMAP_METHOD(isTripSharingAvailable, isTripSharingAvailableWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber* isTripSharingAvailable = [self isTripSharingAvailable];
    resolve(isTripSharingAvailable);
}

RCT_REMAP_METHOD(createTripSharingLink, createTripSharingLinkWithDurationInSeconds:(nonnull NSNumber *)durationInSec withResolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self createTripSharingLink:durationInSec resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(getTripSharingLink, getTripSharingLinkWithSynchronizationType:(NSString *)synchronizationType withResolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripSharingLink:synchronizationType resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(revokeTripSharingLink, revokeTripSharingLinkWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self revokeTripSharingLink:resolve rejecter:reject];
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

-(void)deleteTripMetadata:(NSString *)key {
    [RNDriveKitTripAnalysisWrapper.shared deleteTripMetadataWithKey:key];
}

-(void)updateTripMetadata:(NSString *)key value:(NSString *)value {
    [RNDriveKitTripAnalysisWrapper.shared updateTripMetadataWithKey:key value:value];
}

-(void)setVehicle:(NSDictionary *)vehicle {
    [RNDriveKitTripAnalysisWrapper.shared setVehicleWithVehicle:vehicle];
}

-(void)getCurrentTripInfo:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared getCurrentTripInfoWithResolver:resolve rejecter:reject];
}

-(void)getLastTripLocation:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared getLastTripLocationWithResolver:resolve rejecter:reject];
}

-(NSNumber *)isTripSharingAvailable {
  return [RNDriveKitTripAnalysisWrapper.shared isTripSharingAvailable];
}

-(void)createTripSharingLink:(NSNumber *)durationInSec resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  [RNDriveKitTripAnalysisWrapper.shared createTripSharingLinkWithDurationInSeconds:durationInSec resolver:resolve rejecter:reject];
}

-(void)getTripSharingLink:(NSString *)synchronizationType resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared getTripSharingLinkWithSynchronizationType:synchronizationType resolver:resolve rejecter:reject];
}

-(void)revokeTripSharingLink:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitTripAnalysisWrapper.shared revokeTripSharingLinkWithResolver:resolve rejecter:reject];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDriveKitTripAnalysisSpecJSI>(params);
}
#endif

@end
