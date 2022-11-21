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
@end

@interface RNTripAnalysisEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNTripAnalysisEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitTripAnalysis * _Nonnull) eventEmitter;
@end
