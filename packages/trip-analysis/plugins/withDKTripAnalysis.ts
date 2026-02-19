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
      /(\/\*DriveKitExpoPlugin-START\*\/)+(\n|.)*?(\/\*DriveKitExpoPlugin-END\*\/\n)+/g,
      ''
    );

    stringContents = appendContentsInsideDeclarationBlock(
      stringContents,
      'onCreate',
      `/*DriveKitExpoPlugin-START*/
    val appIconId = applicationContext.getApplicationInfo().icon;
    val tripNotification = RNTripNotification(123, "${tripNotificationTitle}", "${tripNotificationBody}", appIconId)
    DriveKitTripAnalysisModule.Companion.configureTripNotification(tripNotification)
    val headlessJSNotification: RNHeadlessJSNotification = RNHeadlessJSNotification("${headlessNotificationTitle}", "${headlessNotificationBody}")
    DriveKitTripAnalysisModule.Companion.configureHeadlessJSNotification(headlessJSNotification)
    /*DriveKitExpoPlugin-END*/\n`
    );
    modConfig.modResults.contents = stringContents;

    return modConfig;
  });
};

export default withDKTripAnalysis;
