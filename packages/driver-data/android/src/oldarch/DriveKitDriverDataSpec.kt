package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.databaseutils.entity.TransportationMode
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class DriveKitDriverDataSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun reset(promise: Promise)
  abstract fun getTripsOrderByDateAsc(synchronizationType: SynchronizationType = SynchronizationType.DEFAULT, transportationModes: List<TransportationMode>?, promise: Promise)
  abstract fun getTripsOrderByDateDesc(synchronizationType: SynchronizationType = SynchronizationType.DEFAULT, transportationModes: List<TransportationMode>?, promise: Promise)
  abstract fun deleteTrip(itinId: String, promise: Promise)
}
