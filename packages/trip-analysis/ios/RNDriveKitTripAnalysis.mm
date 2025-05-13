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

RCT_EXPORT_METHOD(activateAutoStart:(BOOL)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self activateAutoStart:enable];
    resolve(nil);
}

RCT_EXPORT_METHOD(activateCrashDetection:(BOOL)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
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

RCT_EXPORT_METHOD(enableMonitorPotentialTripStart:(BOOL)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self enableMonitorPotentialTripStart:enable];
    resolve(nil);
}

RCT_EXPORT_METHOD(isTripRunning:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber* tripRunning = [self isTripRunning];
    resolve(tripRunning);
}

RCT_EXPORT_METHOD(reset:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self reset];
    resolve(nil);
}

RCT_EXPORT_METHOD(setStopTimeout:(double)stopTimeout resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setStopTimeout:stopTimeout];
    resolve(nil);
}

RCT_EXPORT_METHOD(getTripMetadata:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripMetadata:resolve rejecter:reject];
}

RCT_REMAP_METHOD(setTripMetadata, setTripMetaDataWithMetadata:(NSDictionary *)metadata resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setTripMetadata:metadata];
    resolve(nil);
}

RCT_EXPORT_METHOD(deleteTripMetadata:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self deleteTripMetadata:key];
    resolve(nil);
}

RCT_REMAP_METHOD(updateTripMetadata, updateTripMetaDataWithkey:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self updateTripMetadata:key value:value];
    resolve(nil);
}

RCT_EXPORT_METHOD(setVehicle:(JS::NativeDriveKitTripAnalysis::TripVehicle &)vehicle resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSMutableDictionary* vehicleDict = [[NSMutableDictionary alloc] init];
    if (vehicle.length().has_value()) {
      double length = vehicle.length().value();
      [vehicleDict setValue:@(length) forKey:@"length"];
    }
    if (vehicle.width().has_value()) {
      double width = vehicle.width().value();
      [vehicleDict setValue:@(width) forKey:@"width"];
    }
    if (vehicle.height().has_value()) {
      double height = vehicle.height().value();
      [vehicleDict setValue:@(height) forKey:@"height"];
    }
    if (vehicle.engineCylinderNb().has_value()) {
      double engineCylinderNb = vehicle.engineCylinderNb().value();
      [vehicleDict setValue:@(engineCylinderNb) forKey:@"engineCylinderNb"];
    }
    if (vehicle.driveWheels().has_value()) {
      double driveWheels = vehicle.driveWheels().value();
      [vehicleDict setValue:@(driveWheels) forKey:@"driveWheels"];
    }
  
    double carTypeIndex = vehicle.carTypeIndex();
    [vehicleDict setValue:@(carTypeIndex) forKey:@"carTypeIndex"];
  
    double carEngineIndex = vehicle.carEngineIndex();
    [vehicleDict setValue:@(carEngineIndex) forKey:@"carEngineIndex"];
  
    double carPower = vehicle.carPower();
    [vehicleDict setValue:@(carPower) forKey:@"carPower"];
  
    double carMass = vehicle.carMass();
    [vehicleDict setValue:@(carMass) forKey:@"carMass"];
  
    double carGearboxIndex = vehicle.carGearboxIndex();
    [vehicleDict setValue:@(carGearboxIndex) forKey:@"carGearboxIndex"];
  
    double carConsumption = vehicle.carConsumption();
    [vehicleDict setValue:@(carConsumption) forKey:@"carConsumption"];
  
    double carAutoGearboxNumber = vehicle.carAutoGearboxNumber();
    [vehicleDict setValue:@(carAutoGearboxNumber) forKey:@"carAutoGearboxNumber"];
  
    double engineDisplacement = vehicle.engineDisplacement();
    [vehicleDict setValue:@(engineDisplacement) forKey:@"engineDisplacement"];
    
    if (vehicle.frontTireSize() != nil) {
      [vehicleDict setObject:vehicle.frontTireSize() forKey:@"frontTireSize"];
    }

    if (vehicle.rearTireSize() != nil) {
      [vehicleDict setObject:vehicle.rearTireSize() forKey:@"rearTireSize"];
    }
  
    [self setVehicle:vehicleDict];
    resolve(nil);
}

RCT_EXPORT_METHOD(getCurrentTripInfo:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getCurrentTripInfo:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getLastTripLocation:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getLastTripLocation:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(isTripSharingAvailable:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber* isTripSharingAvailable = [self isTripSharingAvailable];
    resolve(isTripSharingAvailable);
}

RCT_EXPORT_METHOD(createTripSharingLink:(double)durationInSec resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self createTripSharingLink:durationInSec resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getTripSharingLink:(NSString *)synchronizationType resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripSharingLink:synchronizationType resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(revokeTripSharingLink:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self revokeTripSharingLink:resolve rejecter:reject];
}

- (void)activateAutoStart:(BOOL)enable {
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

- (void)enableMonitorPotentialTripStart:(BOOL)enable {
    [RNDriveKitTripAnalysisWrapper.shared enableMonitorPotentialTripStartWithEnable:enable];
}

-(void)activateCrashDetection:(BOOL)enable {
    [RNDriveKitTripAnalysisWrapper.shared activateCrashDetectionWithEnable:enable];
}

- (void)reset {
    [RNDriveKitTripAnalysisWrapper.shared reset];
}

-(void)setStopTimeout:(double)stopTimeout {
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

-(void)createTripSharingLink:(double)durationInSec resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
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
