export interface Vehicle {
  carTypeIndex: number;
  carEngineIndex: number;
  carPower: number;
  carMass: number;
  carGearboxIndex: number;
  carConsumption: number;
  carAutoGearboxNumber: number;
  engineDisplacement: number;
}

export interface TripVehicle extends Vehicle {
  frontTireSize: string | null;
  rearTireSize: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  engineCylinderNb: number | null;
  driveWheels: number | null;
}
