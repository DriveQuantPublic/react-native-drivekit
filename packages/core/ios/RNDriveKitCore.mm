#import "RNDriveKitCore.h"
#import "RNDriveKitCore-Swift.h"

@implementation RNDriveKitCore
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(double)a  withB:(double)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [self multiply:a b:b resolve:resolve reject:reject];
}

RCT_REMAP_METHOD(setApiKey, withKey:(NSString *)key)
{
    [self setApiKey:key];
}

RCT_REMAP_METHOD(setUserId, withUserId:(NSString *)userId)
{
    [self setUserId:userId];
}

- (void)multiply:(double)a b:(double)b resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSNumber *result = @(a * b);

    resolve(result);
}

- (void)setApiKey:(NSString *)key { 
    [RNDriveKitCoreWrapper.shared setApiKeyWithKey:key];
}

- (void)setUserId:(NSString *)userId {
    [RNDriveKitCoreWrapper.shared setUserIdWithUserId:userId];
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
