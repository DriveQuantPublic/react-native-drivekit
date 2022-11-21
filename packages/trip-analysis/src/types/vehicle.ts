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
  carPassengers: number;
  dqIndex: string | null;
  engineDisplacement: number;
  sra: string | null;
}
