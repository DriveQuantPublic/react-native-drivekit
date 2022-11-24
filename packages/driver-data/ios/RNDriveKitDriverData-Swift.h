#import <React/RCTBridgeModule.h>
@class RNDriveKitDriverDataWrapper;

@interface RNDriveKitDriverDataWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitDriverDataWrapper *_Nonnull shared;

- (void)initialize;
- (void)reset;
- (void)deleteTripWithItinId:(NSString *_Nonnull)itinId resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
@end
