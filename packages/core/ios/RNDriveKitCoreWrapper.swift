
import Foundation
import DriveKitCoreModule
import MessageUI

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()

    @objc public func initialize() -> Void {
        DriveKit.shared.initialize()
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

    @objc internal func deleteAccount(instantDeletion: NSNumber) -> Void {
        DriveKit.shared.deleteAccount(instantDeletion: instantDeletion.boolValue)
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

    @objc internal func composeDiagnosisMail(_ options: NSDictionary) -> Void {
        let recipients: [String] = options["recipients"] as? [String] ?? []
        let bccRecipients: [String] = options["bccRecipients"] as? [String] ?? []
        let subject = options["subject"] as? String ?? ""
        let body = options["body"] as? String ?? ""
        DispatchQueue.main.async {
            MailSender.shared.sendMail(recipients: recipients, bccRecipients: bccRecipients, subject: subject, body: body)
        }
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
