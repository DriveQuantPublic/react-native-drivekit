package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.*
import com.drivequant.drivekit.driverdata.trip.TripsSyncStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.reactnativedrivekit.driverdata.TripsSyncMappers.toReadableMap
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
    return root
  }

  internal fun Trip.toReadableMap(): ReadableMap {
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
    map.putMap("tripStatistics", tripStatistics?.toReadableMap())
    map.putMap("brakeWear", brakeWear?.toReadableMap())
    map.putMap("ecoDriving", ecoDriving?.toReadableMap())
    map.putMap("fuelEstimation", fuelEstimation?.toReadableMap())
    map.putMap("safety", safety?.toReadableMap())
    map.putMap("tireWear", tireWear?.toReadableMap())
    map.putMap("driverDistraction", driverDistraction?.toReadableMap())
    map.putMap("logbook", logbook?.toReadableMap(backendDateFormat))
    map.putMap("pollutants", pollutants?.toReadableMap())
    map.putMap("declaredTransportationMode", declaredTransportationMode?.toReadableMap())
    map.putMap("maneuver", maneuverData?.toReadableMap())
    map.putMap("evaluation", evaluationData?.toReadableMap())
    map.putMap("speedingStatistics", speedingStatistics?.toReadableMap())
    map.putArray("tripAdvices", tripAdvices.convertTripAdvicestoReadableArray())
    map.putArray("fuelEstimationContexts", fuelEstimationDrivingContexts.convertFestDrivingContextstoReadableArray())
    map.putArray("ecoDrivingContexts", ecoDrivingContexts.convertToReadableArray())
    map.putArray("safetyContexts", safetyContexts.convertSafetyContextsToReadableArray())
    map.putArray("safetyEvents", safetyEvents?.convertSafetyEventsToReadableArray())
    map.putArray("calls", calls?.convertCallsToReadableArray())
    map.putArray("speedLimitContexts", speedLimitContexts?.convertSpeedLimitContextsToReadableArray())
    map.putArray("advancedEnergyEstimations", advancedEnergyEstimations?.convertAdvancedEnergyEstimationToReadableArray())
    map.putMap("advancedEnergyEstimations", energyEstimation?.toReadableMap())
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

  private fun TripStatistics?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putBoolean("day", day)
      map.putDouble("distance", distance)
      map.putDouble("drivingDuration", drivingDuration)
      map.putDouble("drivingPercentage", drivingPercentage)
      map.putDouble("duration", duration)
      map.putDouble("idlingDuration", idlingDuration)
      map.putDouble("idlingPercentage", idlingPercentage)
      map.putInt("meteo", meteo)
      map.putDouble("speedMean", speedMean)
      map.putInt("subdispNb", subdispNb)
      map.putBoolean("weekday", weekday)
      map
    }
  }

  private fun BrakeWear?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("frontBrakeAutonomy", frontBrakeAutonomy)
      map.putInt("frontBrakeDistance", frontBrakeDistance)
      map.putInt("frontBrakePadWear", frontBrakePadWear)
      map.putDouble("frontBrakeTotalWear", frontBrakeTotalWear)
      map.putDouble("frontBrakeWearRate", frontBrakeWearRate)

      map.putInt("rearBrakeAutonomy", rearBrakeAutonomy)
      map.putInt("rearBrakeDistance", rearBrakeDistance)
      map.putInt("rearBrakePadWear", rearBrakePadWear)
      map.putDouble("rearBrakeTotalWear", rearBrakeTotalWear)
      map.putDouble("rearBrakeWearRate", rearBrakeWearRate)

      map
    }
  }

  private fun EcoDriving?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("energyClass", energyClass)
      map.putDouble("score", score)
      map.putDouble("scoreAccel", scoreAccel)
      map.putDouble("scoreDecel", scoreDecel)
      map.putDouble("scoreMain", scoreMain)
      map.putDouble("stdDevAccel", stdDevAccel)
      map.putDouble("stdDevDecel", stdDevDecel)
      map.putDouble("stdDevMain", stdDevMain)
      map
    }
  }

  private fun FuelEstimation?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putDouble("co2Emission", co2Emission)
      map.putDouble("co2Mass", co2Mass)
      map.putDouble("coldFuelVolume", coldFuelVolume)
      map.putBoolean("engineTempStatus", engineTempStatus)
      map.putDouble("fuelConsumption", fuelConsumption)
      map.putDouble("fuelVolume", fuelVolume)
      map.putDouble("idleCo2Emission", idleCo2Emission)
      map.putDouble("idleCo2Mass", idleCo2Mass)
      map.putDouble("idleFuelConsumption", idleFuelConsumption)
      map.putDouble("idleFuelPercentage", idleFuelPercentage)
      map.putDouble("idleFuelVolume", idleFuelVolume)
      map
    }
  }

  private fun Safety?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("nbAccel", nbAccel)
      map.putInt("nbAccelCrit", nbAccelCrit)
      map.putInt("nbAdh", nbAdh)
      map.putInt("nbAdhCrit", nbAdhCrit)
      map.putInt("nbDecel", nbDecel)
      map.putInt("nbDecelCrit", nbDecelCrit)
      map.putDouble("safetyScore", safetyScore)
      map
    }
  }

  private fun TireWear?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("frontTireAutonomy", frontTireAutonomy)
      map.putInt("frontTireDistance", frontTireDistance)
      map.putDouble("frontTireTotalWear", frontTireTotalWear)
      map.putInt("frontTireWear", frontTireWear)
      map.putDouble("frontTireWearRate", frontTireWearRate)

      map.putInt("rearTireAutonomy", rearTireAutonomy)
      map.putInt("rearTireDistance", rearTireDistance)
      map.putDouble("rearTireTotalWear", rearTireTotalWear)
      map.putInt("rearTireWear", rearTireWear)
      map.putDouble("rearTireWearRate", rearTireWearRate)

      map
    }
  }

  private fun DriverDistraction?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putDouble("distancePercentUnlock", distancePercentUnlock)
      map.putDouble("distanceUnlock", distanceUnlock)
      map.putDouble("durationPercentUnlock", durationPercentUnlock)
      map.putDouble("durationUnlock", durationUnlock)

      map.putInt("nbUnlock", nbUnlock)
      map.putDouble("score", score)
      scoreCall?.let {
        map.putDouble("scoreCall", it)
      }
      scoreUnlock?.let {
        map.putDouble("scoreUnlock", it)
      }
      map
    }
  }

  private fun Logbook?.toReadableMap(dateFormat: DateFormat): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("status", status)
      updateDate?.let {
        map.putString("updateDate", dateFormat.format(it))
      }
      map
    }
  }

  private fun Pollutants?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putDouble("co", co)
      map.putDouble("hc", hc)
      map.putDouble("nox", nox)
      map.putDouble("soot", soot)
      map
    }
  }

  private fun DeclaredTransportationMode?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putString("comment", comment)
      passenger?.let {
        map.putBoolean("passenger", it)
      }
      transportationMode?.let {
        map.putInt("transportationMode", it.value)
      }
      map
    }
  }

  private fun ManeuverData?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      nbAngledParkings?.let {
        map.putInt("nbAngledParkings", it)
      }
      nbBayParkings?.let {
        map.putInt("nbBayParkings", it)
      }
      nbCurveReverseDrivings?.let {
        map.putInt("nbCurveReverseDrivings", it)
      }
      nbEmergencyStops?.let {
        map.putInt("nbEmergencyStops", it)
      }
      nbHillStarts?.let {
        map.putInt("nbHillStarts", it)
      }
      nbParallelParkings?.let {
        map.putInt("nbParallelParkings", it)
      }
      nbRoundAbouts?.let {
        map.putInt("nbRoundAbouts", it)
      }
      nbStraightReverseDrivings?.let {
        map.putInt("nbStraightReverseDrivings", it)
      }
      nbTurns?.let {
        map.putInt("nbTurns", it)
      }
      map
    }
  }

  private fun EvaluationData?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      comment?.let {
        map.putString("comment", it)
      }
      evaluation?.let {
        map.putInt("evaluation", it)
      }
      map
    }
  }

  private fun SpeedingStatistics?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putInt("distance", distance)
      map.putInt("duration", duration)
      map.putDouble("score", score)
      map.putInt("speedingDistance", speedingDistance)
      map.putInt("speedingDuration", speedingDuration)
      map
    }
  }

  private fun List<TripAdvice>.convertTripAdvicestoReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      it.comment?.let {
        map.putString("comment", it)
      }
      map.putInt("evaluation", it.evaluation)
      map.putInt("feedback", it.feedback)
      it.id?.let { id ->
        map.putString("id", id)
      }
      it.message?.let { message ->
        map.putString("message", message)
      }
      it.messageId?.let { messageId ->
        map.putString("messageId", messageId)
      }
      it.theme?.let { theme ->
        map.putString("theme", theme)
      }
      it.title?.let { title ->
        map.putString("title", title)
      }
      array.pushMap(map)
    }
    return array
  }

  private fun List<FuelEstimationDrivingContext>.convertFestDrivingContextstoReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putDouble("co2Emission", it.co2Emission)
      map.putDouble("co2Mass", it.co2Mass)
      map.putInt("contextId", it.contextId)
      map.putDouble("distance", it.distance)
      map.putDouble("duration", it.duration)
      map.putDouble("fuelConsumption", it.fuelConsumption)
      map.putDouble("fuelVolume", it.fuelVolume)
      array.pushMap(map)
    }
    return array
  }

  private fun List<EcoDrivingContext>.convertToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putInt("contextId", it.contextId)
      map.putDouble("distance", it.distance)
      map.putDouble("duration", it.duration)
      map.putDouble("efficiencyScore", it.efficiencyScore)
      map.putDouble("scoreAccel", it.scoreAccel)
      map.putDouble("scoreDecel", it.scoreDecel)
      map.putDouble("scoreMain", it.scoreMain)
      array.pushMap(map)
    }
    return array
  }

  private fun List<SafetyContext>.convertSafetyContextsToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putInt("contextId", it.contextId)
      map.putDouble("distance", it.distance)
      map.putDouble("duration", it.duration)
      map.putInt("nbAccel", it.nbAccel)
      map.putInt("nbAccelCrit", it.nbAccelCrit)
      map.putInt("nbAdh", it.nbAdh)
      map.putInt("nbAdhCrit", it.nbAdhCrit)
      map.putInt("nbDecel", it.nbDecel)
      map.putInt("nbDecelCrit", it.nbDecelCrit)
      map.putDouble("safetyScore", it.safetyScore)
      array.pushMap(map)
    }
    return array
  }

  private fun List<SafetyEvent>.convertSafetyEventsToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putDouble("distance", it.distance)
      map.putDouble("elevation", it.elevation)
      map.putDouble("heading", it.heading)
      map.putDouble("latitude", it.latitude)
      map.putDouble("longitude", it.longitude)
      map.putInt("level", it.level)
      map.putDouble("time", it.time)
      map.putInt("type", it.type)
      map.putDouble("value", it.value)
      map.putDouble("velocity", it.velocity)
      array.pushMap(map)
    }
    return array
  }

  private fun List<Call>.convertCallsToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      it.audioInput?.let { audioInput ->
        map.putString("audioInput", audioInput)
      }
      it.audioName?.let { audioName ->
        map.putString("audioName", audioName)
      }
      map.putString("audioSystem", it.audioSystem.name) // TODO verify with iOS
      map.putInt("bluetoothClass", it.bluetoothClass)
      map.putInt("distance", it.distance)
      map.putInt("distancePercent", it.distancePercent)
      map.putInt("duration", it.duration)
      map.putInt("durationPercent", it.durationPercent)
      map.putDouble("end", it.end)
      map.putBoolean("isForbidden", it.isForbidden)
      map.putDouble("start", it.start)
      map.putString("type", it.type.name) // TODO verify with iOS

      array.pushMap(map)
    }
    return array
  }

  private fun List<SpeedLimitContext>.convertSpeedLimitContextsToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putInt("distance", it.distance)
      map.putInt("duration", it.duration)
      map.putDouble("score", it.score)
      map.putInt("speedLimit", it.speedLimit)
      map.putInt("speedingDistance", it.speedingDistance)
      map.putInt("speedingDuration", it.speedingDuration)
      array.pushMap(map)
    }
    return array
  }

  private fun List<AdvancedEnergyEstimation>.convertAdvancedEnergyEstimationToReadableArray(): ReadableArray {
    val array = Arguments.createArray()
    this.forEach {
      val map = Arguments.createMap()
      map.putInt("contextId", it.contextId)
      map.putDouble("distance", it.distance)
      map.putDouble("duration", it.duration)
      map.putDouble("energy", it.energy)
      map.putDouble("energyConsumption", it.energyConsumption)
      map.putDouble("energyOpti", it.energyOpti)
      map.putDouble("energyOptiConsumption", it.energyOptiConsumption)
      array.pushMap(map)
    }
    return array
  }

  private fun EnergyEstimation?.toReadableMap(): ReadableMap? {
    return if (this == null) {
      null
    } else {
      val map = Arguments.createMap()
      map.putDouble("energy", energy)
      map.putDouble("energyConsumption", energyConsumption)
      map.putDouble("energyOpti", energyOpti)
      map.putDouble("energyOptiConsumption", energyOptiConsumption)
      map
    }
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

object TripSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trip: Trip): ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    map.putMap("trip", trip.toReadableMap())
    return map
  }
}
