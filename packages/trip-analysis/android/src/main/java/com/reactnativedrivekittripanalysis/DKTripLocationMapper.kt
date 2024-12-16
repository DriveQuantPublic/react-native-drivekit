package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.core.common.model.DKTripLocation
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap 
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

internal object DKTripLocationMapper {
    fun mapDKTripLocationToReadableMap(tripLocation: DKTripLocation?): ReadableMap? {
        if (tripLocation == null) {
            return null
        }
        val tripLocationMap = Arguments.createMap()
        val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())

        tripLocationMap.putString("date", backendDateFormat.format(tripLocation.date))
        tripLocationMap.putDouble("latitude", tripLocation.latitude)
        tripLocationMap.putDouble("longitude", tripLocation.longitude)
        tripLocationMap.putDouble("accuracyMeter", tripLocation.accuracyMeter)
        tripLocationMap.putString("accuracyLevel", tripLocation.getAccuracyLevel().name)
        return tripLocationMap
    }
}