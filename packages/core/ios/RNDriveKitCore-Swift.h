#import <React/RCTBridgeModule.h>

@class RNDriveKitCoreWrapper;

@interface RNDriveKitCoreWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitCoreWrapper * _Nonnull shared;
- (void)initialize;
- (NSString *)getApiKey;
- (void)setApiKeyWithKey:(NSString * _Nonnull)key;
- (NSString *)getUserId;
- (void)setUserIdWithUserId:(NSString * _Nonnull)userId;
- (void)updateUserIdWithUserId:(NSString * _Nonnull)userId;
- (void)deleteAccountWithInstantDeletion:(NSNumber * _Nonnull)instantDeletion;
- (NSNumber * _Nonnull)isTokenValid;
- (void)enableSandboxModeWithEnable:(NSNumber * _Nonnull)enable;
- (void)reset;
- (void)enableLoggingWithShowInConsole:(NSNumber * _Nullable)showInConsole;
- (void)disableLoggingWithShowInConsole:(NSNumber * _Nullable)showInConsole;
- (void)composeDiagnosisMail:(NSDictionary *_Nullable)options;
-(NSURL *)getUriLogFile;
- (void)getUserInfoWithSynchronizationType:(NSString * _Nullable)synchronizationType resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
- (void)updateUserInfoWithUserInfo:(NSDictionary * _Nonnull)userInfo resolver:(RCTPromiseResolveBlock _Nonnull)resolve rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
@end
