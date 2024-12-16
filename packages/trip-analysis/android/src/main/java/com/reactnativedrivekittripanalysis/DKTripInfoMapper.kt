package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.model.currenttripinfo.DKTripInfo
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap 
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

internal object DKTripInfoMapper {
    fun mapDKTripInfoToReadableMap(currentTripInfo: DKTripInfo?): ReadableMap? {
        if (currentTripInfo == null) {
            return null
        }
        val currentTripInfoMap = Arguments.createMap()
        val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())

        currentTripInfoMap.putString("localTripId", currentTripInfo.localTripId)
        currentTripInfoMap.putString("date", backendDateFormat.format(currentTripInfo.date))
        currentTripInfoMap.putString("startMode", currentTripInfo.startMode.name)
        return currentTripInfoMap
    }
}