package com.reactnativedrivekittripanalysis

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

class TripMappers {
  companion object {
    fun mapMetadataToReadableMap(metaData:  HashMap<String, String>?): ReadableMap? {
      if(metaData == null) {
        return null;
      }

      var metadataMap = Arguments.createMap();
      for ((key, value) in metaData){
        metadataMap.putString(key, value)
      }

      return metadataMap;
    }
  }
}
