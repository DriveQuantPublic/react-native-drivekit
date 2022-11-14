@class RNDriveKitTripAnalysisWrapper;

@interface RNDriveKitTripAnalysisWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitTripAnalysisWrapper * _Nonnull shared;
- (void)initializeWithLaunchOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions;
- (void)activateAutoStartWithEnable:(NSNumber * _Nonnull)enable;
- (void)startTrip;
- (void)stopTrip;
- (void)enableMonitorPotentialTripStartWithEnable:(NSNumber * _Nonnull)enable;
- (NSNumber * _Nonnull)getMonitorPotentialTripStart;

@end
