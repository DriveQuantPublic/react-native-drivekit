@class RNDriveKitDriverDataWrapper;

@interface RNDriveKitDriverDataWrapper : NSObject

@property(nonatomic, class, readonly, strong) RNDriveKitDriverDataWrapper *_Nonnull shared;

- (void)initialize;
- (void)reset;
@end
