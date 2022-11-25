package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.TransportationMode

fun mapTransportationMode(transportationMode: String) = when (transportationMode) {
  "UNKNOWN" -> TransportationMode.UNKNOWN
  "CAR" -> TransportationMode.CAR
  "MOTO" -> TransportationMode.MOTO
  "TRUCK" -> TransportationMode.TRUCK
  "BUS" -> TransportationMode.BUS
  "TRAIN" -> TransportationMode.TRAIN
  "BOAT" -> TransportationMode.BOAT
  "BIKE" -> TransportationMode.BIKE
  "FLIGHT" -> TransportationMode.FLIGHT
  "SKIING" -> TransportationMode.SKIING
  "ON_FOOT" -> TransportationMode.ON_FOOT
  "IDLE" -> TransportationMode.IDLE
  "OTHER" -> TransportationMode.OTHER
  else -> null
}
