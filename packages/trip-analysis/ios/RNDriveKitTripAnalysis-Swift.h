@class RNDriveKitTripAnalysisWrapper;
@class RNEventEmitter;
@class RNDriveKitTripAnalysis;

@interface RNDriveKitTripAnalysisWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitTripAnalysisWrapper * _Nonnull shared;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions;
- (void)activateAutoStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)startTrip;
- (void)stopTrip;
- (void)enableMonitorPotentialTripStartWithEnable:(NSNumber * _Nonnull)enable;
@end

@interface RNEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitTripAnalysis * _Nonnull) eventEmitter;
@end
