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

- (void)setApiKey:(NSString *)key {
    [RNDriveKitCoreWrapper.shared setApiKeyWithKey:key];
}

- (void)setUserId:(NSString *)userId {
    [RNDriveKitCoreWrapper.shared setUserIdWithUserId:userId];
}

- (void)updateUserId:(NSString *)userId {
    [RNDriveKitCoreWrapper.shared updateUserIdWithUserId:userId];
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
