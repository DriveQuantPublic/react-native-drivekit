export interface VehicleBase {
  carTypeIndex: number;
  carEngineIndex: number;
  carPower: number;
  carMass: number;
  carGearboxIndex: number;
  carConsumption: number;
  carAutoGearboxNumber: number;
}

export interface Vehicle extends VehicleBase {
  engineDisplacement: number;
}
