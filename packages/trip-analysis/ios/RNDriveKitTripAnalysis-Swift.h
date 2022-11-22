#import <React/RCTBridgeModule.h>
@class RNDriveKitTripAnalysisWrapper;
@class RNTripAnalysisEventEmitter;
@class RNDriveKitTripAnalysis;

@interface RNDriveKitTripAnalysisWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitTripAnalysisWrapper * _Nonnull shared;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions;
- (void)activateAutoStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)activateCrashDetectionWithEnable:(NSNumber * _Nonnull)enable;
- (void)startTrip;
- (void)stopTrip;
- (void)cancelTrip;
- (NSNumber * _Nonnull)isTripRunning;
- (void)enableMonitorPotentialTripStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)reset;
- (void)setStopTimeout:(NSNumber *_Nonnull)stopTimeout;
- (NSDictionary<NSString *, NSString *> * _Nullable)getTripMetadataWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;;
- (void)setTripMetadataWithMetadata:(NSDictionary *)metadata resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
@end

@interface RNTripAnalysisEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNTripAnalysisEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitTripAnalysis * _Nonnull) eventEmitter;
@end
