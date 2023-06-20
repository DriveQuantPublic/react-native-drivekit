package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.entity.TripVehicle
import com.facebook.react.bridge.ReadableMap

fun mapReadableMapToVehicle(vehicle: ReadableMap): TripVehicle {
  return TripVehicle(
    carTypeIndex = vehicle.getInt("carTypeIndex"),
    carEngineIndex = vehicle.getInt("carEngineIndex"),
    carPower = vehicle.getDouble("carPower"),
    carMass = vehicle.getDouble("carMass"),
    carGearboxIndex = vehicle.getInt("carGearboxIndex"),
    carConsumption = vehicle.getDouble("carConsumption"),
    carAutoGearboxNumber = vehicle.getInt("carAutoGearboxNumber"),
    engineDisplacement = vehicle.getDouble("engineDisplacement"),
    frontTireSize = vehicle.getString("frontTireSize"),
    rearTireSize = vehicle.getString("rearTireSize"),
    length = vehicle.getDouble("length"),
    width = vehicle.getDouble("width"),
    height = vehicle.getDouble("height"),
    engineCylinderNb = vehicle.getInt("engineCylinderNb"),
    driveWheels = vehicle.getInt("driveWheels")
  );
}
