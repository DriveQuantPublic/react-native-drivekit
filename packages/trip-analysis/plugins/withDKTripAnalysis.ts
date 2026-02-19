import CONFIG_PLUGINS from '@expo/config-plugins';
const { withMainApplication } = CONFIG_PLUGINS;

import {
  addImports,
  appendContentsInsideDeclarationBlock,
} from '@expo/config-plugins/build/android/codeMod';

type AndroidProps = {
  tripNotificationTitle?: string;
  tripNotificationBody?: string;
  headlessNotificationTitle?: string;
  headlessNotificationBody?: string;
};

const DEFAULT_ANDROID_PROPS: AndroidProps = {
  tripNotificationTitle: 'DriveKit SDK',
  tripNotificationBody: 'Start a trip with DriveKit SDK',
  headlessNotificationTitle: 'DriveKit SDK',
  headlessNotificationBody: 'Loading in progress…',
};

const withDKTripAnalysis = (config: any, options: AndroidProps) => {
  const tripNotificationTitle =
    options.tripNotificationTitle ||
    DEFAULT_ANDROID_PROPS.tripNotificationTitle;
  const tripNotificationBody =
    options.tripNotificationBody || DEFAULT_ANDROID_PROPS.tripNotificationBody;
  const headlessNotificationTitle =
    options.headlessNotificationTitle ||
    DEFAULT_ANDROID_PROPS.headlessNotificationTitle;
  const headlessNotificationBody =
    options.headlessNotificationBody ||
    DEFAULT_ANDROID_PROPS.headlessNotificationBody;

  return withMainApplication(config, (modConfig) => {
    let stringContents = modConfig.modResults.contents;
    stringContents = addImports(
      stringContents,
      [
        'com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule',
        'com.reactnativedrivekittripanalysis.RNHeadlessJSNotification',
        'com.reactnativedrivekittripanalysis.RNTripNotification',
      ],
      modConfig.modResults.language === 'java'
    );

    stringContents = stringContents.replace(
      /.*(DriveKitExpoPlugin)+.*\n?/g,
      ''
    );

    stringContents = appendContentsInsideDeclarationBlock(
      stringContents,
      'onCreate',
      `  val appIconId = applicationContext.getApplicationInfo().icon;
    val tripNotification = RNTripNotification(123, "${tripNotificationTitle}", "${tripNotificationBody}", appIconId) /*DriveKitExpoPlugin*/
    DriveKitTripAnalysisModule.Companion.configureTripNotification(tripNotification)  /*DriveKitExpoPlugin*/
    val headlessJSNotification: RNHeadlessJSNotification = RNHeadlessJSNotification("${headlessNotificationTitle}", "${headlessNotificationBody}")  /*DriveKitExpoPlugin*/
    DriveKitTripAnalysisModule.Companion.configureHeadlessJSNotification(headlessJSNotification)  /*DriveKitExpoPlugin*/
`
    );
    modConfig.modResults.contents = stringContents;

    return modConfig;
  });
};

export default withDKTripAnalysis;
