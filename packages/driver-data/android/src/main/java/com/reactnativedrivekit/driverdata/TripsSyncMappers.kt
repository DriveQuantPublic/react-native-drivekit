package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.*
import com.drivequant.drivekit.driverdata.trip.TripsSyncStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

object TripsSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trips: List<Trip>) : ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    map.putArray("trips", trips.toReadableArray())
    return map
  }

  private fun List<Trip>.toReadableArray(): ReadableArray {
    val root = Arguments.createArray()
    root.pushMap(this[0].toReadableMap()) // TODO LOOP IS NEEDED !
    root.pushMap(this[1].toReadableMap())
    return root
  }

  private fun Trip.toReadableMap(): ReadableMap {
    val map = Arguments.createMap()
    val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())

    map.putString("itinId", itinId)
    map.putString("endDate", backendDateFormat.format(endDate))
    map.putString("startDate", backendDateFormat.format(endDate))
    map.putString("vehicleId", vehicleId)
    map.putInt("transportationMode", transportationMode.value)
    map.putString("departureCity", departureCity)
    map.putString("arrivalCity", arrivalCity)
    map.putString("departureAddress", departureAddress)
    map.putString("arrivalAddress", arrivalAddress)
    map.putBoolean("unscored", unscored)
    map.putArray("metaData", metaData.toReadableArray())

    return map
  }

  private fun Map<String, String>.toReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putString(it.key, it.value)
      array.pushMap(map)
    }
    return array
  }

  /*
  private data class TripObject(
    val itinId: String, // OK
    var endDate: Date, // OK --> à convertir en String
    var startDate: Date?, // OK --> à convertir en String
    var vehicleId : String?, // OK
    var transportationMode: TransportationMode, // à convertir en int
    var departureCity: String, // OK
    var arrivalCity: String, // OK
    var departureAddress: String, // OK
    var arrivalAddress: String, // OK
    var unscored: Boolean, // OK
    var metaData: Map<String,String>, // OK --> Write
    var tripStatistics: TripStatistics?, //
    var brakeWear: BrakeWear?, // OK
    var ecoDriving: EcoDriving?, // OK
    var fuelEstimation: FuelEstimation?, // OK
    var safety: Safety?, // OK
    var tireWear: TireWear?, // OK
    var driverDistraction: DriverDistraction?, // OK
    var logbook: Logbook?, // OK updateDate à passer en string
    var pollutants: Pollutants?, // OK
    var declaredTransportationMode: DeclaredTransportationMode?, // OK
    var maneuverData: ManeuverData?, // OK renommer en maneuver
    var evaluationData: EvaluationData?, // OK renommer en evaluation
    var speedingStatistics: SpeedingStatistics?, // OK
    var tripAdvices: List<TripAdvice>, // OK
    var fuelEstimationDrivingContexts: List<FuelEstimationDrivingContext>, // OK renommer en fuelEstimationContexts (retirer itinId)
    var ecoDrivingContexts: List<EcoDrivingContext>, // OK retirer itinId
    var safetyContexts: List<SafetyContext>, // OK
    var safetyEvents: List<SafetyEvent>?, // OK
    var calls: List<Call>?, // OK
    var speedLimitContexts: List<SpeedLimitContext>?, // OK
    var advancedEnergyEstimations: List<AdvancedEnergyEstimation>?, // OK transformer en readblearray
    var energyEstimation: EnergyEstimation? // OK
  )*/
}
