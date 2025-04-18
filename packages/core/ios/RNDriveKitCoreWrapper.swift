
import Foundation
import DriveKitCoreModule
import MessageUI

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()

    @objc public func initialize() -> Void {
        DriveKit.shared.initialize()
        addDriveKitListener()
        addDeviceConfigurationListener()
    }
    
    @objc static func isAutoInitEnabled() -> Bool {
        return DriveKit.shared.isAutoInitEnabled()
    }

    @objc func addDriveKitListener() {
        DriveKit.shared.addDriveKitDelegate(self)
    }

    @objc func addDeviceConfigurationListener() {
        DriveKit.shared.addDeviceConfigurationDelegate(self)
    }

    @objc internal func getApiKey() -> String? {
        DriveKit.shared.config.getApiKey()
    }

    @objc internal func setApiKey(key: String) -> Void {
        DriveKit.shared.setApiKey(key: key)
    }

    @objc internal func getUserId() -> String? {
        DriveKit.shared.config.getUserId()
    }

    @objc internal func setUserId(userId: String) -> Void {
        DriveKit.shared.setUserId(userId: userId)
    }

    @objc internal func updateUserId(userId: String) -> Void {
        DriveKit.shared.updateUserId(userId: userId)
    }

  @objc internal func deleteAccount(instantDeletion: Bool) -> Void {
        DriveKit.shared.deleteAccount(instantDeletion: instantDeletion)
    }

    @objc internal func isTokenValid() -> NSNumber {
        return NSNumber(value: DriveKit.shared.isTokenValid());
    }

    @objc internal func enableSandboxMode(enable: NSNumber) -> Void {
        DriveKit.shared.enableSandboxMode(enable: enable.boolValue)
    }

    @objc internal func reset() -> Void {
        DriveKit.shared.reset()
    }

    @objc internal func enableLogging(showInConsole: NSNumber?) -> Void {
        if let unwrappedShowInConsole = showInConsole {
            DriveKit.shared.enableLogging(showInConsole: unwrappedShowInConsole.boolValue)
        } else {
            DriveKit.shared.enableLogging()
        }
    }

    @objc internal func disableLogging(showInConsole: NSNumber?) -> Void {
        if let unwrappedShowInConsole = showInConsole {
            DriveKit.shared.disableLogging(showInConsole: unwrappedShowInConsole.boolValue)
        } else {
            DriveKit.shared.disableLogging()
        }
    }

    @objc internal func composeDiagnosisMail(_ options: NSDictionary) -> Bool {
        let recipients: [String] = options["recipients"] as? [String] ?? []
        let bccRecipients: [String] = options["bccRecipients"] as? [String] ?? []
        let subject = options["subject"] as? String ?? ""
        let body = options["body"] as? String ?? ""
        DispatchQueue.main.async {
            MailSender.shared.sendMail(recipients: recipients, bccRecipients: bccRecipients, subject: subject, body: body)
        }
        return MFMailComposeViewController.canSendMail()
    }

    @objc internal func getUserInfo(synchronizationType: String?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        var mappedSynchronizationType: SynchronizationType = .defaultSync;
        if synchronizationType == "cache" {
            mappedSynchronizationType = .cache
        }
        DriveKit.shared.getUserInfo(synchronizationType: mappedSynchronizationType) { status, userInfo in
            if status == .success {
                resolve(mapUserInfoToNSDictionary(userInfo: userInfo));
            } else if status == .cacheDataOnly {
                resolve(mapUserInfoToNSDictionary(userInfo: userInfo))
            } else {
                reject("Get User Info", "Unable to get user info", nil)
            }
        }
    }

    @objc internal func updateUserInfo(userInfo: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DriveKit.shared.updateUserInfo(firstname: userInfo["firstname"] as? String, lastname: userInfo["lastname"] as? String, pseudo:userInfo["pseudo"] as? String) { success in
            if success {
                resolve(nil)
            } else {
                reject("Update User Info", "Unable to update user info", nil)
            }
        }
    }

    @objc internal func requestLocationPermission() -> Void {
        DispatchQueue.main.async {
            DKDiagnosisHelper.shared.requestPermission(.location)
        }
    }
  
    @objc internal func getUriLogFile() -> URL? {
      if DriveKitLog.shared.isLoggingEnabled {
          return DriveKitLog.shared.getZippedLogFilesUrl()
      }
      return nil
    }
}

private class MailSender: NSObject {
    fileprivate static let shared: MailSender = MailSender()
    fileprivate func sendMail(recipients: [String], bccRecipients: [String], subject: String, body: String) {
        if MFMailComposeViewController.canSendMail()  {
            let mailComposerVC = MFMailComposeViewController()
            if let logFileUrl = DriveKitLog.shared.getZippedLogFilesUrl() {
                do {
                    let attachementData = try Data(contentsOf: logFileUrl)
                    let fileName = logFileUrl.lastPathComponent
                    mailComposerVC.addAttachmentData(attachementData, mimeType: "text/plain", fileName: fileName)
                } catch let error {
                    print("Error while attaching LogFile to Mail : \(error.localizedDescription)")
                }
            }
            mailComposerVC.mailComposeDelegate = self
            mailComposerVC.setToRecipients(recipients)
            mailComposerVC.setBccRecipients(bccRecipients)
            mailComposerVC.setMessageBody(body, isHTML: false)
            mailComposerVC.setSubject(subject)
            self.present(viewController: mailComposerVC)
        } else {
            DriveKitLog.shared.errorLog(tag: "RNDriveKitCore", message: "canSendMail is false")
        }
    }
    
    private func getTopViewController(window: UIWindow? = UIApplication.shared.keyWindow) -> UIViewController? {
        if let window = window {
          var top = window.rootViewController
          while true {
            if let presented = top?.presentedViewController {
              top = presented
            } else if let nav = top as? UINavigationController {
              top = nav.visibleViewController
            } else if let tab = top as? UITabBarController {
              top = tab.selectedViewController
            } else {
              break
            }
          }
          return top
        }
        return nil
      }
      
    private func present(viewController: UIViewController) {
        if let topVc = self.getTopViewController() {
          topVc.present(viewController, animated: true, completion: nil)
        }
    }
}
extension MailSender: MFMailComposeViewControllerDelegate {
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        controller.dismiss(animated: true, completion: nil)
      }
}

extension RNDriveKitCoreWrapper: DriveKitDelegate {
    public func driveKitDidConnect(_ driveKit: DriveKit) {
        RNCoreEventEmitter.shared.dispatch(name: "driveKitConnected", body: nil)
        return
    }

    public func driveKit(_ driveKit: DriveKit, didReceiveAuthenticationError error: RequestError) {
        RNCoreEventEmitter.shared.dispatch(name: "driveKitDidReceiveAuthenticationError", body: mapRequestError(requestError: error))
        return
    }

    public func driveKitDidDisconnect(_ driveKit: DriveKit) {
        RNCoreEventEmitter.shared.dispatch(name: "driveKitDisconnected", body: nil)
        return
    }

    public func userIdUpdateStatusChanged(status: UpdateUserIdStatus, userId: String?) {
        RNCoreEventEmitter.shared.dispatch(name: "userIdUpdateStatusChanged", body:[
            "status": mapUpdateUserIdStatus(updateUserIdStatus: status),
            "userId": userId as NSString?])
        return
    }
    
    public func driveKit(_ driveKit: DriveKit, accountDeletionCompleted status: DeleteAccountStatus) {
        RNCoreEventEmitter.shared.dispatch(name: "accountDeletionCompleted", body: mapDeleteAccountStatus(deleteAccountStatus: status))
        return
    }
}

extension RNDriveKitCoreWrapper: DKDeviceConfigurationDelegate {
    public func deviceConfigurationDidChange(event: DKDeviceConfigurationEvent) {
        RNCoreEventEmitter.shared.dispatch(name: "deviceConfigurationChanged", body: mapDeviceConfigurationEvent(event))
    }
}
