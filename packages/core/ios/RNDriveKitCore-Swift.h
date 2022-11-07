@class RNDriveKitCoreWrapper;

@interface RNDriveKitCoreWrapper : NSObject
@property (nonatomic, class, readonly, strong) RNDriveKitCoreWrapper * _Nonnull shared;
- (void)initialize;
- (void)setApiKeyWithKey:(NSString * _Nonnull)key;
- (void)setUserIdWithUserId:(NSString * _Nonnull)userId;
@end
