#import "RNDriveKitCore.h"
#import "RNDriveKitCore-Swift.h"

@implementation RNDriveKitCore
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(setApiKey, setApiKeyWithKey:(NSString *)key)
{
    [self setApiKey:key];
}

RCT_REMAP_METHOD(setUserId, setUserIdWithUserId:(NSString *)userId)
{
    [self setUserId:userId];
}

RCT_REMAP_METHOD(updateUserId, updateUserIdWithUserId:(NSString *)userId)
{
    [self updateUserId:userId];
}

RCT_REMAP_METHOD(deleteAccount, deleteAccountWithInstantDeletion:(nonnull NSNumber *)instantDeletion)
{
    [self deleteAccount:instantDeletion];
}

RCT_REMAP_METHOD(isTokenValid, resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
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

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCoreSpecJSI>(params);
}
#endif

@end
