package com.reactnativedrivekitcore

import com.drivequant.drivekit.core.driver.UserInfo
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

class UserInfoMappers {
  companion object {
    fun mapUserInfoToReadableMap(userInfo: UserInfo?): ReadableMap? {
      if(userInfo == null) {
        return null;
      }
      var userInfoMap = Arguments.createMap();
      userInfoMap.putString("pseudo", userInfo.pseudo);
      userInfoMap.putString("firstname", userInfo.firstname);
      userInfoMap.putString("lastname", userInfo.lastname);
      return userInfoMap;
    }
  }
}
