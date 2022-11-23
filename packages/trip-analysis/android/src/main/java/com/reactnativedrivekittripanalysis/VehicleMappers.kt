package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.databaseutils.entity.Vehicle
import com.facebook.react.bridge.ReadableMap

fun mapReadableMapToVehicle(vehicle: ReadableMap): Vehicle {
  var result = Vehicle();
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

  return result;
}
