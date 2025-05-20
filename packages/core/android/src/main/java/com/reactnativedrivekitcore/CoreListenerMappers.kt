package com.reactnativedrivekitcore

import com.drivequant.drivekit.core.driver.UpdateUserIdStatus
import com.drivequant.drivekit.core.driver.deletion.DeleteAccountStatus

fun mapUpdateUserIdStatus(updateUserIdStatus: UpdateUserIdStatus): String {   
  return when (updateUserIdStatus) {
    UpdateUserIdStatus.UPDATED -> "UPDATED"
    UpdateUserIdStatus.FAILED_TO_UPDATE -> "FAILED_TO_UPDATE"
    UpdateUserIdStatus.INVALID_USER_ID -> "INVALID_USER_ID"
    UpdateUserIdStatus.ALREADY_USED -> "ALREADY_USED"
    UpdateUserIdStatus.SAVED_FOR_REPOST -> "SAVED_FOR_REPOST"
  }
}

fun mapDeleteAccountStatus(deleteAccountStatus: DeleteAccountStatus): String {
  return when (deleteAccountStatus) {
    DeleteAccountStatus.SUCCESS -> "SUCCESS"
    DeleteAccountStatus.FAILED_TO_DELETE -> "FAILED_TO_DELETE"
    DeleteAccountStatus.FORBIDDEN -> "FORBIDDEN"
  }
}
