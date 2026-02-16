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

    stringContents = appendContentsInsideDeclarationBlock(
      stringContents,
      'onCreate',
      `val tripNotification = RNTripNotification(123, "${tripNotificationTitle}", "${tripNotificationBody}", 0)\n
       DriveKitTripAnalysisModule.Companion.configureTripNotification(tripNotification)\n
       val headlessJSNotification: RNHeadlessJSNotification = RNHeadlessJSNotification("${headlessNotificationTitle}", "${headlessNotificationBody}")\n
       DriveKitTripAnalysisModule.Companion.configureHeadlessJSNotification(headlessJSNotification)\n`
    );
    config.modResults.contents = stringContents;

    return config;
  });
};

export default withDKTripAnalysis;
