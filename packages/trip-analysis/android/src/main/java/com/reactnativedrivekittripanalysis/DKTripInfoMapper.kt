package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.model.currenttripinfo.DKTripInfo
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

internal object DKTripInfoMapper {
    fun mapDKTripInfoToReadableMap(currentTripInfo: DKTripInfo?): ReadableMap? {
        if (currentTripInfo == null) {
            return null
        }
        val currentTripInfoMap = Arguments.createMap()

        currentTripInfoMap.putString("localTripId", currentTripInfo.localTripId)
        currentTripInfoMap.putString("date", currentTripInfo.date.toDriveKitBackendFormat())
        currentTripInfoMap.putString("startMode", currentTripInfo.startMode.name)
        return currentTripInfoMap
    }
}
