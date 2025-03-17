export enum CrashStatus {
  CONFIRMED = 'CONFIRMED',
  UNCONFIRMED = 'UNCONFIRMED',
}

export type CrashInfo = {
  crashId: string;
  timestamp: number;
  probability: number;
  latitude: number;
  longitude: number;
  velocity: number;
  crashStatus: CrashStatus;
  userLocationUrl: string | null;
};

export enum CrashFeedbackType {
  NO_CRASH = 'NO_CRASH',
  CONFIRMED = 'CONFIRMED',
  NO_FEEDBACK = 'NO_FEEDBACK',
}

export enum CrashFeedbackSeverity {
  CRITICAL = 'CRITICAL',
  MINOR = 'MINOR',
  NONE = 'NONE',
}

export type CrashFeedback = {
  crashInfo: CrashInfo;
  feedbackType: CrashFeedbackType;
  severity: CrashFeedbackSeverity;
};
