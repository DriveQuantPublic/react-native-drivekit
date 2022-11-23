#import <React/RCTBridgeModule.h>
@class RNDriveKitDriverDataWrapper;

@interface RNDriveKitDriverDataWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitDriverDataWrapper *_Nonnull shared;

- (void)initialize;
- (void)reset;
-(void)deleteTripWithTripId:(NSString *_Nonnull)tripId resolver:(RCTPromiseResolveBlock _Nonnull )resolve rejecter:(RCTPromiseRejectBlock _Nonnull )reject;
@end
