package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.databaseutils.entity.TripVehicle
import com.facebook.react.bridge.ReadableMap

fun mapReadableMapToVehicle(vehicle: ReadableMap): TripVehicle {
  var result = TripVehicle();
  if (vehicle.hasKey("carTypeIndex")) {
    result.typeIndex = vehicle.getInt("carTypeIndex");
  }

  if (vehicle.hasKey("carEngineIndex")) {
    result.engineIndex = vehicle.getInt("carEngineIndex");
  }

  if (vehicle.hasKey("carPower")) {
    result.power = vehicle.getDouble("carPower");
  }

  if (vehicle.hasKey("carMass")) {
    result.mass = vehicle.getDouble("carMass");
  }

  if (vehicle.hasKey("carGearboxIndex")) {
    result.gearboxIndex = vehicle.getInt("carGearboxIndex");
  }

  if (vehicle.hasKey("carConsumption")) {
    result.consumption = vehicle.getDouble("carConsumption");
  }

  if (vehicle.hasKey("carAutoGearboxNumber")) {
    result.autoGearboxNumber = vehicle.getInt("carAutoGearboxNumber");
  }

  if (vehicle.hasKey("engineDisplacement")) {
    result.engineDisplacement = vehicle.getDouble("engineDisplacement");
  }

  if (vehicle.hasKey("frontTireSize")) {
    result.frontTireSize = vehicle.getString("frontTireSize");
  }

  if (vehicle.hasKey("rearTireSize")) {
    result.rearTireSize = vehicle.getString("rearTireSize");
  }

  if (vehicle.hasKey("length")) {
    result.length = vehicle.getDouble("length");
  }

  if (vehicle.hasKey("width")) {
    result.width = vehicle.getDouble("width");
  }

  if (vehicle.hasKey("height")) {
    result.height = vehicle.getDouble("height");
  }

  if (vehicle.hasKey("engineCylinderNb")) {
    result.engineCylinderNb = vehicle.getInt("engineCylinderNb");
  }

  if (vehicle.hasKey("driveWheels")) {
    result.driveWheels = vehicle.getInt("driveWheels");
  }

  return result;
}
