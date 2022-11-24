#import <React/RCTBridgeModule.h>
@class RNDriveKitDriverDataWrapper;

@interface RNDriveKitDriverDataWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitDriverDataWrapper *_Nonnull shared;

- (void)initialize;
- (void)reset;
- (void)deleteTripWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
-(void)getTripsOrderByDateAscWithSynchronizationType:(NSString *)synchronizationType transportationModes:(NSArray *)transportationModes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)getRouteWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
@end
