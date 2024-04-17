#import <React/RCTBridgeModule.h>
@class RNDriveKitTripAnalysisWrapper;
@class RNTripAnalysisEventEmitter;
@class RNDriveKitTripAnalysis;

@interface RNDriveKitTripAnalysisWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitTripAnalysisWrapper * _Nonnull shared;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions andRegisterTripListener:(BOOL)registerTripListener;
- (void)addTripListener;
+ (BOOL)isAutoInitEnabled;
- (void)activateAutoStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)activateCrashDetectionWithEnable:(NSNumber * _Nonnull)enable;
- (void)startTrip;
- (void)stopTrip;
- (void)cancelTrip;
- (NSNumber * _Nonnull)isTripRunning;
- (void)enableMonitorPotentialTripStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)reset;
- (void)setStopTimeout:(NSNumber *_Nonnull)stopTimeout;
- (NSDictionary<NSString *, NSString *> * _Nullable)getTripMetadataWithResolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)setTripMetadataWithMetadata:(NSDictionary * _Nonnull)metadata;
- (void)deleteTripMetadataWithKey:(NSString * _Nullable)key;
- (void)updateTripMetadataWithKey:(NSString * _Nonnull)key value:(NSString * _Nullable)value;
- (void)setVehicleWithVehicle:(NSDictionary * _Nullable)vehicle;
@end

@interface RNTripAnalysisEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNTripAnalysisEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitTripAnalysis * _Nonnull) eventEmitter;
@end
