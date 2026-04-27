package com.reactnativedrivekittripanalysis

import com.drivequant.beaconutils.BeaconData
import com.facebook.react.bridge.ReadableMap

fun mapReadableMapToBeacon(beacon: ReadableMap): BeaconData {
  var proximityUuid = ""
  var major: Int = -1
  var minor: Int = -1

  if (beacon.hasKey("proximityUuid")) {
    proximityUuid = beacon.getString("proximityUuid") as String
  }

  if (beacon.hasKey("major")) {
    major = beacon.getInt("major")
  }

  if (beacon.hasKey("minor")) {
    minor = beacon.getInt("minor")
  }

  return BeaconData(
    proximityUuid = proximityUuid,
    major = major,
    minor = minor
  )
}
