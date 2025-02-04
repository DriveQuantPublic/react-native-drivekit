package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.CreateTripSharingLinkStatus
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.DKTripSharingLink
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.GetTripSharingLinkStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

internal object TripSharingMapper {
  fun mapCreateTripSharingResponseToReadableMap(
    status: CreateTripSharingLinkStatus,
    link: DKTripSharingLink?
  ): ReadableMap {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    link?.let {
      map.putMap("link", it.toReadableMap())
    }
    return map
  }

  fun mapGetTripSharingResponseToReadableMap(
    status: GetTripSharingLinkStatus,
    link: DKTripSharingLink?
  ): ReadableMap {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    link?.let {
      map.putMap("link", it.toReadableMap())
    }
    return map
  }

  private fun DKTripSharingLink.toReadableMap(): ReadableMap =
    Arguments.createMap().apply {
      putString("code", this@toReadableMap.code)
      putString("startDate", this@toReadableMap.startDate.toDriveKitBackendFormat())
      putString("endDate", this@toReadableMap.startDate.toDriveKitBackendFormat())
      putString("url", this@toReadableMap.url)
  }
}
