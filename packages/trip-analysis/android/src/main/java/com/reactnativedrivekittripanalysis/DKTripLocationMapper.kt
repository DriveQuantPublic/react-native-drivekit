package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.core.common.model.DKTripLocation
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

internal object DKTripLocationMapper {
    fun mapDKTripLocationToReadableMap(tripLocation: DKTripLocation?): ReadableMap? {
        if (tripLocation == null) {
            return null
        }
        val tripLocationMap = Arguments.createMap()

        tripLocationMap.putString("date", tripLocation.date.toDriveKitBackendFormat())
        tripLocationMap.putDouble("latitude", tripLocation.latitude)
        tripLocationMap.putDouble("longitude", tripLocation.longitude)
        tripLocationMap.putDouble("accuracyMeter", tripLocation.accuracyMeter)
        tripLocationMap.putString("accuracyLevel", tripLocation.getAccuracyLevel().name)
        return tripLocationMap
    }
}
