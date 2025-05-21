import type {
  TripMetadata as TripMetadataType,
  TripVehicle as TripVehicleType,
  CurrentTripInfo as CurrentTripInfoType,
  LastTripLocation as LastTripLocationType,
  CreateTripSharingLinkResponse as CreateTripSharingLinkResponseType,
  GetTripSharingLinkResponse as GetTripSharingLinkResponseType,
  DKTripRecordingStartedState as DKTripRecordingStartedStateType,
  DKTripRecordingConfirmedState as DKTripRecordingConfirmedStateType,
  DKTripRecordingCanceledState as DKTripRecordingCanceledStateType,
  DKTripRecordingFinishedState as DKTripRecordingFinishedStateType,
  TripResult as TripResultType,
  CrashInfo as CrashInfoType,
  Location as LocationType,
  TripPoint as TripPointType,
} from '../NativeDriveKitTripAnalysis';
import {
  StartMode as StartModeEnum,
  TripResultStatusType as TripResultStatusTypeEnum,
  SDKState as SDKStateEnum,
  CancelTripReason as CancelTripReasonEnum,
  DKTripCancelationReason as DKTripCancelationReasonEnum,
  AccuracyLevel as AccuracyLevelEnum,
  CreateTripSharingLinkStatus as CreateTripSharingLinkStatusEnum,
  GetTripSharingLinkStatus as GetTripSharingLinkStatusEnum,
  RevokeTripSharingLinkStatus as RevokeTripSharingLinkStatusEnum,
  TripResponseInfo as TripResponseInfoEnum,
  TripResponseError as TripResponseErrorEnum,
  CrashStatus as CrashStatusEnum,
  CrashFeedbackType as CrashFeedbackTypeEnum,
  CrashFeedbackSeverity as CrashFeedbackSeverityEnum,
} from '../NativeDriveKitTripAnalysis';

export type TripMetadata = TripMetadataType;
export type TripVehicle = TripVehicleType;
export type CurrentTripInfo = CurrentTripInfoType;
export type LastTripLocation = LastTripLocationType;
export type CreateTripSharingLinkResponse = CreateTripSharingLinkResponseType;
export type GetTripSharingLinkResponse = GetTripSharingLinkResponseType;
export type DKTripRecordingStartedState = DKTripRecordingStartedStateType;
export type DKTripRecordingConfirmedState = DKTripRecordingConfirmedStateType;
export type DKTripRecordingCanceledState = DKTripRecordingCanceledStateType;
export type DKTripRecordingFinishedState = DKTripRecordingFinishedStateType;
export type TripResult = TripResultType;
export type CrashInfo = CrashInfoType;
export type Location = LocationType;
export type TripPoint = TripPointType;

export const StartMode = StartModeEnum;
export const SDKState = SDKStateEnum;
export const CancelTripReason = CancelTripReasonEnum;
export const TripResultStatusType = TripResultStatusTypeEnum;
export const RevokeTripSharingLinkStatus = RevokeTripSharingLinkStatusEnum;
export const DKTripCancelationReason = DKTripCancelationReasonEnum;
export const AccuracyLevel = AccuracyLevelEnum;
export const TripResponseInfo = TripResponseInfoEnum;
export const TripResponseError = TripResponseErrorEnum;
export const CrashStatus = CrashStatusEnum;
export const CrashFeedbackType = CrashFeedbackTypeEnum;
export const CrashFeedbackSeverity = CrashFeedbackSeverityEnum;
export const GetTripSharingLinkStatus = GetTripSharingLinkStatusEnum;
export const CreateTripSharingLinkStatus = CreateTripSharingLinkStatusEnum;
