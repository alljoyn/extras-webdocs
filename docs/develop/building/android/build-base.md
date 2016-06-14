# Build Base Services From Source - Android

## Setup build tools and libs

Refer to instructions for [building Core from source][core].
The **Installing the Android SDK** section is also necessary for the Base Services. 

## Obtain the AllJoyn Base Services source

* Download the [AllJoyn&trade; Base Services source zip][download] and extract its contents into the `base` directory shown in the tree below. Note, extra directories may exist.
```sh
AJ_ROOT/
  core/
    alljoyn/
  services/
    base/
```
* Alternatively, use Git:
```sh
$ cd $AJ_ROOT
$ mkdir services/
$ cd services/
$ git clone https://git.allseenalliance.org/gerrit/services/base.git
```

## Building the Base Services 

NOTE: The Base Services require the following files from AllJoyn Core: `alljoyn.jar`, `alljoyn_about.jar`, `alljoyn_config.jar`, and `liballjoyn_java.so`. These can be located in the `dist` directory created from [building AllJoyn Core from source][core].
The Android Support Library can be downloaded with the Android SDK Manager. It is found under 'extras' and currently obsolete.
 
1. Build the Android Common Utilities library:
```sh
$ cd $AJ_ROOT/services/base/
$ export ANDROID_HOME={ANDROID_SDK}
$
$ pushd samples_apps/android/common_utils/ 
$ 
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar
$ mkdir libs/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$ 
$ # Build Common Utilities with Ant
$ ant
$
$ UTILS=`pwd`/build/deploy/alljoyn_apps_android_utils.jar
$ 
$ popd
```

2. Building Control Panel:
```sh
$ pushd controlpanel/java/ControlPanelService/
$ 
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar
$ mkdir libs/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$
$ # Build ControlPanelService with Ant
$ ant
$
$ CPS=`pwd`/build/deploy/ControlPanelService.jar
$ 
$ popd
```
```sh
$ pushd controlpanel/java/ControlPanelAdapter/
$ 
$ # ControlPanelAdapter requires previously built ControlPanelService.jar
$ mkdir libs/
$ cp $CPS libs/ 
$
$ # Build ControlPanelAdapter with Ant
$ ant {VARIANT}
$
$ CPA=`pwd`/bin/ControlPanelAdapter.jar
$ 
$ popd
```
```sh
$ pushd controlpanel/java/sample_applications/android/ControlPanelBrowser/
$ 
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar, and inside libs create an armeabi folder 
$ mkdir -p libs/armeabi/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$ cp $CORE_LIBS/liballjoyn_java.so libs/armeabi/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$
$ # The Android Support Library is required
$ cp $ANDROID_HOME/extras/android/support/v4/android-support-v4.jar libs/ 
$
$ # ControlPanelBrowser requires previous jars
$ cp $CPS $CPA libs/
$
$ # Build ControlPanelBrowser with Ant
$ ant {VARIANT}
$ 
$ popd
```

4. Building Notification
```sh
$ pushd notification/java/native_platform/NotificationServiceNativePlatformAndroid/ 
$ 
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar 
$ mkdir libs/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$
$ # Build Notification jars with Ant
$ ant
$
$ NS_DIR=`pwd`/build/deploy/
$ 
$ popd
```
```sh
$ pushd notification/java/sample_applications/android/NotificationServiceUISample/
$
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar, and inside libs create an armeabi folder 
$ mkdir -p libs/armeabi/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$ cp $CORE_LIBS/liballjoyn_java.so libs/armeabi/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$
$ # Notification sample also requires ControlPanel jars
$ cp $CPS $CPA libs/
$
$ # Copy previous Notification jars
$ cp $NS_DIR/{NotificationService,NSCommons,NSNativePlatformAndr}.jar libs/
$
$ # Build NotificationServiceUISample with Ant
$ ant {VARIANT} 
$
$ popd
```

5. Building Onboarding
```sh
$ pushd onboarding/java/OnboardingService/
$
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar
$ mkdir libs/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$
$ # Build OnboardingService with Ant
$ ant 
$
$ OS=`pwd`/build/deploy/alljoyn_onboarding.jar
$
$ popd
```
```sh
$ pushd onboarding/java/OnboardingManager/android/
$
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar
$ mkdir libs/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$
$ # OnboardingManager requires previously built alljoyn_onboarding.jar
$ cp $OS libs/  
$
$ # Build OnboardingManager with Ant
$ ant
$
$ OM=`pwd`/build/deploy/alljoyn_onboarding_manager.jar
$
$ popd
```
```sh
$ pushd onboarding/java/sample_applications/android/OnboardingSampleClient/
$
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar, and inside libs create an armeabi folder 
$ mkdir -p libs/armeabi/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$ cp $CORE_LIBS/liballjoyn_java.so libs/armeabi/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$ 
$ # Copy previously built Onboarding jars 
$ cp $OS $OM libs/
$
$ # Build OnboardingSampleClient with Ant
$ ant {VARIANT}
$
$ popd
```
```sh
$ pushd simulators/android/about_conf_onb_server/
$
$ # Create a libs folder containing alljoyn.jar and alljoyn_about.jar, and inside libs create an armeabi folder 
$ mkdir -p libs/armeabi/
$ cp $CORE_JARS/alljoyn.jar $CORE_JARS/alljoyn_about.jar libs/
$ cp $CORE_LIBS/liballjoyn_java.so libs/armeabi/
$
$ # Copy the Common Utils jar
$ cp $UTILS libs/
$ 
$ # Copy previously built alljoyn_onboarding.jar 
$ cp $OS libs/
$
$ # alljoyn_config.jar is also required
$ cp $CORE_JARS/alljoyn_config.jar libs/
$
$ # Build AboutConfOnbServer with Ant
$ ant {VARIANT}
$
$ popd
```


* ANDROID_SDK - The path to the installed Android SDK.
* VARIANT - Select the build variant to build. For debug, replace `{VARIANT}` with `debug`. For release, replace `{VARIANT}` with `release`.


**NOTE:** For a full list of SCons command line options to build
the AllJoyn Base Services, enter `scons --help`.

[core]: /develop/building/android/build-source
[download]: https://allseenalliance.org/framework/download
