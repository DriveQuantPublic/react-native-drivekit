#import "RNDriveKitCore.h"
#import "RNDriveKitCore-Swift.h"

@implementation RNDriveKitCore
{
  bool hasListeners;
}

RCT_EXPORT_MODULE_NO_LOAD(RNDriveKitCore, RNDriveKitCore)

- (id)init {
    self = [super init];
    if(self){
        [RNCoreEventEmitter.shared registerEventEmitterWithEventEmitter:self];
    }
    return self;
}

+ (void)load {
    [super load];

    if ([RNDriveKitCoreWrapper isAutoInitEnabled]) {
        [RNDriveKitCoreWrapper.shared addDriveKitListener];
        [RNDriveKitCoreWrapper.shared addDeviceConfigurationListener];
    }
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *>*)supportedEvents {
    return RNCoreEventEmitter.allEvents;
}

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

RCT_EXPORT_METHOD(getApiKey:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSString *apiKey = [self getApiKey];
    resolve(apiKey);
}

RCT_EXPORT_METHOD(setApiKey:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setApiKey: key];
    resolve(nil);
}

RCT_EXPORT_METHOD(getUserId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSString *userId = [self getUserId];
    resolve(userId);
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self setUserId:userId];
    resolve(nil);
}

RCT_EXPORT_METHOD(updateUserId:(NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self updateUserId:userId];
    resolve(nil);
}

RCT_EXPORT_METHOD(deleteAccount:(BOOL)instantDeletion resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self deleteAccount:instantDeletion];
    resolve(nil);
}

RCT_EXPORT_METHOD(isTokenValid:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *validity = [self isTokenValid];
    resolve(validity);
}

RCT_EXPORT_METHOD(enableSandboxMode:(nonnull NSNumber *)enable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self enableSandboxMode:enable];
    resolve(nil);
}

RCT_EXPORT_METHOD(reset:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [self reset];
    resolve(nil);
}

RCT_EXPORT_METHOD(enableLogging:(JS::NativeCore::SpecEnableLoggingOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSMutableDictionary* optionsDict = [[NSMutableDictionary alloc] init];
  if (options.showInConsole().has_value()) {
    BOOL showInConsole = options.showInConsole().value();
    [optionsDict setValue:@(showInConsole) forKey:@"showInConsole"];
  }
    [self enableLogging:optionsDict];
    resolve(nil);
}

RCT_EXPORT_METHOD(disableLogging:(JS::NativeCore::SpecDisableLoggingOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSMutableDictionary* optionsDict = [[NSMutableDictionary alloc] init];
  if (options.showInConsole().has_value()) {
    BOOL showInConsole = options.showInConsole().value();
    [optionsDict setValue:@(showInConsole) forKey:@"showInConsole"];
  }
    [self disableLogging:optionsDict];
    resolve(nil);
}

RCT_EXPORT_METHOD(getUriLogFile:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSURL *logFileUrl = [self getUriLogFile];
    resolve([NSDictionary dictionaryWithObject:logFileUrl.path
                                        forKey:@"uri"]);
}

RCT_EXPORT_METHOD(getUserInfo:(NSString *)synchronizationType resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
   [self getUserInfo:synchronizationType resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(updateUserInfo:(NSDictionary *)userInfo resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
   [self updateUserInfo:userInfo resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(composeDiagnosisMail:(JS::NativeCore::SpecComposeDiagnosisMailOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSMutableDictionary* optionsDict = [[NSMutableDictionary alloc] init];
  [optionsDict setObject:[RNDriveKitCore nsArrayFromOptionalLazyVector:options.recipients()] forKey:@"recipients"];
  [optionsDict setObject:[RNDriveKitCore nsArrayFromOptionalLazyVector:options.bccRecipients()] forKey:@"bccRecipients"];
  [optionsDict setObject:options.subject() forKey:@"subject"];
  [optionsDict setObject:options.body() forKey:@"body"];

    if ([self composeDiagnosisMail:optionsDict]) {
        resolve(nil);
    } else {
        reject(@"MAIL_COMPOSER_ERROR", @"CAN_SEND_MAIL_IS_FALSE", nil);
    };
}

RCT_EXPORT_METHOD(requestLocationPermission:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    [RNDriveKitCoreWrapper.shared requestLocationPermission];
    resolve(nil);
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

- (void)deleteAccount:(BOOL)instantDeletion {
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

- (bool)composeDiagnosisMail: (NSDictionary *)options {
    return [RNDriveKitCoreWrapper.shared composeDiagnosisMail: options];
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

+ (NSArray<NSString *> *)nsArrayFromOptionalLazyVector:(const std::optional<facebook::react::LazyVector<NSString *>>&)optionalLazyVector {
    if (optionalLazyVector.has_value()) {
        const facebook::react::LazyVector<NSString *>& lazyVector = optionalLazyVector.value();
        NSMutableArray<NSString *> *nsMutableArray = [NSMutableArray arrayWithCapacity:lazyVector.size()];
        for (auto it = lazyVector.begin(); it != lazyVector.end(); ++it) {
            NSString *nsString = *it;
            [nsMutableArray addObject:nsString];
        }

        return [nsMutableArray copy];
    } else {
      return [[NSArray alloc] init];
    }
}

@end
