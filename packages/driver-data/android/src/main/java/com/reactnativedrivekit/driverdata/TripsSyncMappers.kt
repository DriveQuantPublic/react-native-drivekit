package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.*
import com.drivequant.drivekit.driverdata.trip.TripsSyncStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.reactnativedrivekit.driverdata.TripsSyncMappers.toReadableArray
import com.google.gson.Gson
import java.util.*

object TripsSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trips: List<Trip>) : ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    map.putArray("trips", trips.toReadableArray())
    return map
  }

  private fun List<Trip>.toReadableArray(): ReadableArray {
    val map = Arguments.createArray()
    val gson = Gson()
    map.pushString(gson.toJson(this[0].toTripObject())) //TODO only for tests replace later with this.forEach { }
    return map
  }

  private fun Trip.toTripObject() = TripObject(itinId,
    endDate,
    endDate,
    vehicleId,
    transportationMode,
    departureCity,
    arrivalCity,
    departureAddress,
    arrivalAddress,
    unscored,
    metaData,
    tripStatistics,
    brakeWear,
    ecoDriving,
    fuelEstimation,
    safety,
    tireWear,
    driverDistraction,
    logbook,
    pollutants,
    declaredTransportationMode,
    maneuverData,
    evaluationData,
    speedingStatistics,
    tripAdvices,
    fuelEstimationDrivingContexts,
    ecoDrivingContexts,
    safetyContexts,
    safetyEvents,
    calls,
    speedLimitContexts,
    advancedEnergyEstimations,
    energyEstimation
  )

  private data class TripObject(
    val itinId: String,
    var endDate: Date,
    var startDate: Date?,
    var vehicleId : String?,
    var transportationMode: TransportationMode,
    var departureCity: String,
    var arrivalCity: String,
    var departureAddress: String,
    var arrivalAddress: String,
    var unscored: Boolean,
    var metaData: Map<String,String>,
    var tripStatistics: TripStatistics?,
    var brakeWear: BrakeWear?,
    var ecoDriving: EcoDriving?,
    var fuelEstimation: FuelEstimation?,
    var safety: Safety?,
    var tireWear: TireWear?,
    var driverDistraction: DriverDistraction?,
    var logbook: Logbook?,
    var pollutants: Pollutants?,
    var declaredTransportationMode: DeclaredTransportationMode?,
    var maneuverData: ManeuverData?,
    var evaluationData: EvaluationData?,
    var speedingStatistics: SpeedingStatistics?,
    var tripAdvices: List<TripAdvice>,
    var fuelEstimationDrivingContexts: List<FuelEstimationDrivingContext>,
    var ecoDrivingContexts: List<EcoDrivingContext>,
    var safetyContexts: List<SafetyContext>,
    var safetyEvents: List<SafetyEvent>?,
    var calls: List<Call>?,
    var speedLimitContexts: List<SpeedLimitContext>?,
    var advancedEnergyEstimations: List<AdvancedEnergyEstimation>?,
    var energyEstimation: EnergyEstimation?
  )
}

object TripSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trip: Trip): ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    // TODO: replace the code below once the function to convert Trip into map is working
    // map.putMap("trip", trip.toTripObject())
    val tripMap = Arguments.createMap()
    tripMap.putString("itinId", trip.itinId)
    map.putMap("trip", tripMap)
    return map
  }
}
