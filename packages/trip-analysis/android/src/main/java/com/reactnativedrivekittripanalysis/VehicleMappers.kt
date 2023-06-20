package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.entity.TripVehicle
import com.facebook.react.bridge.ReadableMap

fun mapReadableMapToVehicle(vehicle: ReadableMap): TripVehicle {
  var carTypeIndex = 1
  var carEngineIndex = 1
  var carPower = 150.0
  var carMass = 1400.0
  var carGearboxIndex = 2
  var carConsumption = 4.5
  var carAutoGearboxNumber = 0
  var engineDisplacement = 1200.0
  var frontTireSize: String? = null
  var rearTireSize: String? = null
  var length: Double? = null
  var width: Double? = null
  var height: Double? = null
  var engineCylinderNb: Int? = null
  var driveWheels: Int? = null

  if (vehicle.hasKey("carTypeIndex")) {
    carTypeIndex = vehicle.getInt("carTypeIndex")
  }

  if (vehicle.hasKey("carEngineIndex")) {
    carEngineIndex = vehicle.getInt("carEngineIndex")
  }

  if (vehicle.hasKey("carPower")) {
    carPower = vehicle.getDouble("carPower")
  }

  if (vehicle.hasKey("carMass")) {
    carMass = vehicle.getDouble("carMass")
  }

  if (vehicle.hasKey("carGearboxIndex")) {
    carGearboxIndex = vehicle.getInt("carGearboxIndex")
  }

  if (vehicle.hasKey("carConsumption")) {
    carConsumption = vehicle.getDouble("carConsumption")
  }

  if (vehicle.hasKey("carAutoGearboxNumber")) {
    carAutoGearboxNumber = vehicle.getInt("carAutoGearboxNumber")
  }

  if (vehicle.hasKey("engineDisplacement")) {
    engineDisplacement = vehicle.getDouble("engineDisplacement")
  }

  if (vehicle.hasKey("frontTireSize")) {
    frontTireSize = vehicle.getString("frontTireSize")
  }

  if (vehicle.hasKey("rearTireSize")) {
    rearTireSize = vehicle.getString("rearTireSize")
  }

  if (vehicle.hasKey("length")) {
    length = vehicle.getDouble("length")
  }

  if (vehicle.hasKey("width")) {
    width = vehicle.getDouble("width")
  }

  if (vehicle.hasKey("height")) {
    height = vehicle.getDouble("height")
  }

  if (vehicle.hasKey("engineCylinderNb")) {
    engineCylinderNb = vehicle.getInt("engineCylinderNb")
  }

  if (vehicle.hasKey("driveWheels")) {
    driveWheels = vehicle.getInt("driveWheels")
  }

  return TripVehicle(
    carTypeIndex = carTypeIndex,
    carEngineIndex = carEngineIndex,
    carPower = carPower,
    carMass = carMass,
    carGearboxIndex = carGearboxIndex,
    carConsumption = carConsumption,
    carAutoGearboxNumber = carAutoGearboxNumber,
    engineDisplacement = engineDisplacement,
    frontTireSize = frontTireSize,
    rearTireSize = rearTireSize,
    length = length,
    width = width,
    height = height,
    engineCylinderNb = engineCylinderNb,
    driveWheels = driveWheels
  )
}
