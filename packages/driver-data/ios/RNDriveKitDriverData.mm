#import "RNDriveKitDriverData.h"
#import "RNDriveKitDriverData-Swift.h"

@implementation RNDriveKitDriverData
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(initialize, initializeWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self initialize];
    resolve(nil);
}

-(void)initialize {
    [RNDriveKitDriverDataWrapper.shared initialize];
}

RCT_REMAP_METHOD(reset, resetCore:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self reset];
    resolve(nil);
}

- (void)reset {
    [RNDriveKitDriverDataWrapper.shared reset];
}

RCT_REMAP_METHOD(deleteTrip, deleteTripWithId:(NSString *)itinId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self deleteTripWithItinId:itinId resolver:resolve rejecter:reject];
}

-(void)deleteTripWithItinId:(NSString *)itinId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared deleteTripWithItinId:itinId resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(getTripsOrderByDateAsc, getTripsOrderByDateAscWithSynchronizationType:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripsOrderByDateAscWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

-(void)getTripsOrderByDateAscWithSynchronizationType:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getTripsOrderByDateAscWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(getTripsOrderByDateDesc, getTripsOrderByDateDescWithSynchronizationType:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getTripsOrderByDateDescWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

-(void)getTripsOrderByDateDescWithSynchronizationType:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitDriverDataWrapper.shared getTripsOrderByDateDescWithSynchronizationType:synchronizationType transportationModes:transportationModes resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(getRoute, getRouteWithItinId:(NSString *)itinId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self getRouteWithItinId:itinId resolver:resolve rejecter:reject];
}

-(void)getRouteWithItinId:(NSString *)itinId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
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
