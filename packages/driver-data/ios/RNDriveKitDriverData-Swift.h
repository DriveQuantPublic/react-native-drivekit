#import <React/RCTBridgeModule.h>
@class RNDriveKitDriverDataWrapper;

@interface RNDriveKitDriverDataWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitDriverDataWrapper *_Nonnull shared;

- (void)initialize;
- (void)reset;
- (void)deleteTripWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)getTripsOrderByDateAscWithSynchronizationType:(NSString *_Nonnull)synchronizationType transportationModes:(NSArray *_Nonnull)transportationModes resolver:(RCTPromiseResolveBlock _Nonnull )resolve rejecter:(RCTPromiseRejectBlock _Nonnull )reject;
- (void)getTripsOrderByDateDescWithSynchronizationType:(NSString *_Nonnull)synchronizationType transportationModes:(NSArray *_Nonnull)transportationModes resolver:(RCTPromiseResolveBlock _Nonnull )resolve rejecter:(RCTPromiseRejectBlock _Nonnull )reject;
- (void)getTripWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)getRouteWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)updateDriverPassengerModeWithItinId:(NSString *_Nonnull)itinId mode:(NSString *_Nonnull)mode comment:(NSString * _Nullable)comment resolver:(RCTPromiseResolveBlock _Nonnull )resolve rejecter:(RCTPromiseRejectBlock _Nonnull )reject;
@end
