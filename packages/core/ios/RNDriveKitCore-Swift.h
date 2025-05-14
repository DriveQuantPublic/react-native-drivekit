#import <React/RCTBridgeModule.h>

@class RNDriveKitCoreWrapper;
@class RNCoreEventEmitter;
@class RNDriveKitCore;


@interface RNDriveKitCoreWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitCoreWrapper * _Nonnull shared;
- (void)initialize;
+ (BOOL)isAutoInitEnabled;
- (void)addDriveKitListener;
- (void)addDeviceConfigurationListener;
- (NSString * _Nullable)getApiKey;
- (void)setApiKeyWithKey:(NSString * _Nonnull)key;
- (NSString * _Nullable)getUserId;
- (void)setUserIdWithUserId:(NSString * _Nonnull)userId;
- (void)updateUserIdWithUserId:(NSString * _Nonnull)userId;
- (void)deleteAccountWithInstantDeletion:(BOOL)instantDeletion;
- (NSNumber * _Nonnull)isTokenValid;
- (void)reset;
- (void)enableLoggingWithShowInConsole:(NSNumber * _Nullable)showInConsole;
- (void)disableLoggingWithShowInConsole:(NSNumber * _Nullable)showInConsole;
- (bool)composeDiagnosisMail:(NSDictionary *_Nullable)options;
-(NSURL * _Nullable)getUriLogFile;
- (void)getUserInfoWithSynchronizationType:(NSString * _Nullable)synchronizationType resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)updateUserInfoWithUserInfo:(NSDictionary * _Nonnull)userInfo resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)requestLocationPermission;
@end

@interface RNCoreEventEmitter : NSObject
@property (nonatomic, class, readonly, strong) RNCoreEventEmitter * _Nonnull shared;
@property (nonatomic, class, readonly, strong) NSArray<NSString *> * _Nonnull allEvents;
- (void)registerEventEmitterWithEventEmitter:(RNDriveKitCore * _Nonnull) eventEmitter;
@end
