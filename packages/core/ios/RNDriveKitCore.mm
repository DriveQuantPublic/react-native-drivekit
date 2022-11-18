#import "RNDriveKitCore.h"
#import "RNDriveKitCore-Swift.h"

@implementation RNDriveKitCore
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(getApiKey, getApiKeyWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSString *apiKey = [self getApiKey];
    resolve(apiKey);
}

RCT_REMAP_METHOD(setApiKey, setApiKeyWithKey:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setApiKey: key];
    resolve(nil);
}

RCT_REMAP_METHOD(getUserId, getUserIdWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSString *userId = [self getUserId];
    resolve(userId);
}

RCT_REMAP_METHOD(setUserId, setUserIdWithUserId:(NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setUserId:userId];
    resolve(nil);
}

RCT_REMAP_METHOD(updateUserId, updateUserIdWithUserId:(NSString *)userId)
{
    [self updateUserId:userId];
}

RCT_REMAP_METHOD(deleteAccount, deleteAccountWithInstantDeletion:(nonnull NSNumber *)instantDeletion)
{
    [self deleteAccount:instantDeletion];
}

RCT_REMAP_METHOD(isTokenValid, isTokenValidWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *validity = [self isTokenValid];
    resolve(validity);
}

RCT_REMAP_METHOD(enableSandboxMode, enableSandboxModeWithEnable:(nonnull NSNumber *)enable)
{
    [self enableSandboxMode:enable];
}

RCT_REMAP_METHOD(reset, resetCore)
{
    [self reset];
}

RCT_REMAP_METHOD(enableLogging, enableLoggingWithOptions:(NSDictionary *)options){
    [self enableLogging:options];
}

RCT_REMAP_METHOD(disableLogging, disableLoggingWithOptions:(NSDictionary *)options){
    [self disableLogging:options];
}

RCT_REMAP_METHOD(getUriLogFile, getUriLogFileWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSURL *logFileUrl = [self getUriLogFile];
    resolve([NSDictionary dictionaryWithObject:logFileUrl.path
                                        forKey:@"uri"]);
}

RCT_REMAP_METHOD(getUserInfo, getUserInfoWithSynchronizationType:(NSString *)synchronizationType withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
{
   [self getUserInfo:synchronizationType resolver:resolve rejecter:reject];
}

RCT_REMAP_METHOD(updateUserInfo, updateUserInfoWithUserInfo:(NSDictionary *)userInfo withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
{
   [self updateUserInfo:userInfo resolver:resolve rejecter:reject];
}


- (void)setApiKey:(NSString *)key {
    [RNDriveKitCoreWrapper.shared setApiKeyWithKey:key];
}

- (void)setUserId:(NSString *)userId {
    [RNDriveKitCoreWrapper.shared setUserIdWithUserId:userId];
}

- (void)updateUserId:(NSString *)userId {
    [RNDriveKitCoreWrapper.shared updateUserIdWithUserId:userId];
}

- (void)deleteAccount:(NSNumber *)instantDeletion {
    [RNDriveKitCoreWrapper.shared deleteAccountWithInstantDeletion:instantDeletion];
}

- (NSNumber *)isTokenValid {
    return [RNDriveKitCoreWrapper.shared isTokenValid];
}

- (NSString *)getApiKey {
    return [RNDriveKitCoreWrapper.shared getApiKey];
}
- (NSString *)getUserId {
    return [RNDriveKitCoreWrapper.shared getUserId];
}

- (void)enableSandboxMode:(NSNumber *)enable {
    [RNDriveKitCoreWrapper.shared enableSandboxModeWithEnable:enable];
}

- (void)reset {
    [RNDriveKitCoreWrapper.shared reset];
}

- (void)disableLogging:(NSDictionary *)options {
    [RNDriveKitCoreWrapper.shared disableLoggingWithShowInConsole:options[@"showInConsole"]];
}


- (void)enableLogging:(NSDictionary *)options {
    [RNDriveKitCoreWrapper.shared enableLoggingWithShowInConsole:options[@"showInConsole"]];
}

-(NSURL* )getUriLogFile {
    return [RNDriveKitCoreWrapper.shared getUriLogFile];
}

- (void)getUserInfo:(NSString *)synchronizationType resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitCoreWrapper.shared getUserInfoWithSynchronizationType:synchronizationType resolver:resolve rejecter:reject];
}

- (void)updateUserInfo:(NSDictionary *)userInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNDriveKitCoreWrapper.shared updateUserInfoWithUserInfo:userInfo resolver:resolve rejecter:reject];
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCoreSpecJSI>(params);
}
#endif

@end
