//
//  Dictionary+toJSONString.swift
//  DrivekitTripAnalysis
//
//  Created by Cyril Bonaccini on 17/11/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation

extension Dictionary {
    var jsonData: Data? {
        return try? JSONSerialization.data(withJSONObject: self, options: [.prettyPrinted])
    }
    
    func toJSONString() -> String? {
        if let jsonData = jsonData {
            let jsonString = String(data: jsonData, encoding: .utf8)
            return jsonString
        }
        
        return nil
    }
}
