export type Trip = {
  itinId: string;
  endDate: Date;
  startDate: Date;
  vehicleId: string;
  transportationMode: TransportationMode;
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  // TODO
};

export enum TransportationMode {
  UNKNOWN = '0',
  CAR = '1',
  // TODO
}
