import CONFIG_PLUGINS from '@expo/config-plugins';
const { ConfigPlugin, withMainApplication } = CONFIG_PLUGINS;

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

const withDKTripAnalysis: ConfigPlugin<AndroidProps> = (
  config,
  options = {}
) => {
  const tripNotificationTitle = options.tripNotificationTitle || 'DriveKit SDK';
  const tripNotificationBody =
    options.tripNotificationBody || 'Start a trip with DriveKit SDK';
  const headlessNotificationTitle =
    options.headlessNotificationTitle || 'DriveKit SDK';
  const headlessNotificationBody =
    options.headlessNotificationBody || 'Loading in progress…';

  return withMainApplication(config, (config) => {
    //config.
    let stringContents = config.modResults.contents;
    stringContents = addImports(
      stringContents,
      [
        'com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule',
        'com.reactnativedrivekittripanalysis.RNHeadlessJSNotification',
        'com.reactnativedrivekittripanalysis.RNTripNotification',
      ],
      config.modResults.language === 'java'
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
    config.modResults.contents = stringContents;

    return config;
  });
};

export default withDKTripAnalysis;
