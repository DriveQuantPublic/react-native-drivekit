#import "RNDriveKitDriverData.h"
#import "RNDriveKitDriverData-Swift.h"

@implementation RNDriveKitDriverData
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initialize:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self initialize];
    resolve(nil);
}

-(void)initialize {
    [RNDriveKitDriverDataWrapper.shared initialize];
}

RCT_EXPORT_METHOD(resetCore:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self reset];
    resolve(nil);
}

- (void)reset {
    [RNDriveKitDriverDataWrapper.shared reset];
}

RCT_EXPORT_METHOD(deleteTrip:(NSString *)itinId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self deleteTrip:itinId resolver:resolve rejecter:reject];
}

-(void)deleteTrip:(NSString *)itinId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared deleteTripWithItinId:itinId resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getTripsOrderByDateAsc:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripsOrderByDateAsc:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

-(void)getTripsOrderByDateAsc:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getTripsOrderByDateAscWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getTripsOrderByDateDesc:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripsOrderByDateDesc:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

-(void)getTripsOrderByDateDesc:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getTripsOrderByDateDescWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getTrip:(NSString *)itinId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTrip:itinId resolver:resolve rejecter:reject];
}

-(void)getTrip:(NSString *)itinId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getTripWithItinId:itinId resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getRoute:(NSString *)itinId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getRoute:itinId resolver:resolve rejecter:reject];
}

-(void)getRoute:(NSString *)itinId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getRouteWithItinId:itinId resolver:resolve rejecter:reject];
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDriverDataSpecJSI>(params);
}
#endif

@end
