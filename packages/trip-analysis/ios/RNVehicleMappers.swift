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
    return result;
}
