//
//  RNVehicleMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Cyril Bonaccini on 21/11/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import DriveKitTripAnalysisModule

func mapNSDictionaryToVehicle(dictionary: NSDictionary?) -> TripVehicle? {
    let result = TripVehicle();
        
    if let carTypeIndex = dictionary?.value(forKey: "carTypeIndex") as? Int {
        result.carTypeIndex = carTypeIndex;
    }
    
    if let carEngineIndex = dictionary?.value(forKey: "carEngineIndex") as? Int {
        result.carEngineIndex = carEngineIndex;
    }
    
    if let carPower = dictionary?.value(forKey: "carPower") as? Double {
        result.carPower = carPower;
    }
    
    if let carMass = dictionary?.value(forKey: "carMass") as? Double {
        result.carMass = carMass;
    }
    
    if let carGearboxIndex = dictionary?.value(forKey: "carGearboxIndex") as? Int {
        result.carGearboxIndex = carGearboxIndex;
    }
    
    if let carConsumption = dictionary?.value(forKey: "carConsumption") as? Double {
        result.carConsumption = carConsumption;
    }
    
    if let carAutoGearboxNumber = dictionary?.value(forKey: "carAutoGearboxNumber") as? Int {
        result.carAutoGearboxNumber = carAutoGearboxNumber;
    }

    if let engineDisplacement = dictionary?.value(forKey: "engineDisplacement") as? Double {
        result.engineDisplacement = engineDisplacement;
    }
    
    if let frontTireSize = dictionary?.value(forKey: "frontTireSize") as? String {
        result.frontTireSize = frontTireSize;
    }

    if let rearTireSize = dictionary?.value(forKey: "rearTireSize") as? String {
        result.rearTireSize = rearTireSize;
    }

    if let length = dictionary?.value(forKey: "length") as? Double {
        result.length = length;
    }

    if let width = dictionary?.value(forKey: "width") as? Double {
        result.width = width;
    }

    if let height = dictionary?.value(forKey: "height") as? Double {
        result.height = height;
    }

    if let engineCylinderNb = dictionary?.value(forKey: "engineCylinderNb") as? Int {
        result.engineCylinderNb = engineCylinderNb;
    }

    if let driveWheels = dictionary?.value(forKey: "driveWheels") as? Int {
        result.driveWheels = driveWheels;
    }

    return result;
}
