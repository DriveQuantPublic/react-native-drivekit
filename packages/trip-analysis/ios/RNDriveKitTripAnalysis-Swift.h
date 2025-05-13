#import <React/RCTBridgeModule.h>
@class RNDriveKitTripAnalysisWrapper;
@class RNTripAnalysisEventEmitter;
@class RNDriveKitTripAnalysis;

@interface RNDriveKitTripAnalysisWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitTripAnalysisWrapper * _Nonnull shared;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions;
- (void)addTripListener;
+ (BOOL)isAutoInitEnabled;
- (void)activateAutoStartWithEnable:(BOOL)enable;
- (void)activateCrashDetectionWithEnable:(BOOL)enable;
- (void)startTrip;
- (void)stopTrip;
- (void)cancelTrip;
- (NSNumber * _Nonnull)isTripRunning;
- (void)enableMonitorPotentialTripStartWithEnable:(BOOL)enable;
- (void)reset;
- (void)setStopTimeout:(double)stopTimeout;
- (NSDictionary<NSString *, NSString *> * _Nullable)getTripMetadataWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)setTripMetadataWithMetadata:(NSDictionary * _Nonnull)metadata;
- (void)deleteTripMetadataWithKey:(NSString * _Nullable)key;
- (void)updateTripMetadataWithKey:(NSString * _Nonnull)key value:(NSString * _Nullable)value;
- (void)setVehicleWithVehicle:(NSDictionary * _Nullable)vehicle;
- (NSDictionary * _Nullable)getCurrentTripInfoWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (NSDictionary * _Nullable)getLastTripLocationWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (NSNumber * _Nonnull)isTripSharingAvailable;
- (void)createTripSharingLinkWithDurationInSeconds:(NSNumber * _Nonnull)durationInSec resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)getTripSharingLinkWithSynchronizationType:(NSString * _Nullable)synchronizationType resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)revokeTripSharingLinkWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;


@end

@interface RNTripAnalysisEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNTripAnalysisEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitTripAnalysis * _Nonnull) eventEmitter;
@end
