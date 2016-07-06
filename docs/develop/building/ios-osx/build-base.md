# Build Base Services From Source - iOS

## Setup build tools and libs

Refer to instructions for [building Core from source][core].
The **Obtaining OpenSSL** section is also necessary for the Base Services.
Note that the sample apps provided will by default require all architectures to
be built for its Core dependencies.

## Obtain the AllJoyn Base Services source

* Download the [AllJoyn&trade; Base Services source zip][download] and extract
its contents into the `base` directory shown in the tree below. Note, extra
directories may exist.
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

1. Build the `services_common` libraries:
```sh
$ cd $AJ_ROOT/services/base/
$ export ALLSEEN_BASE_SERVICES_ROOT=`pwd`
$ 
$ pushd services_common/ios/samples/
$ xcodebuild -project alljoyn_services_cpp/alljoyn_services_common_cpp.xcodeproj -sdk {PLATFORM} -configuration {VARIANT} ALLJOYN_SDK_ROOT={PATH}
$ xcodebuild -project alljoyn_services_objc/alljoyn_services_common_objc.xcodeproj -sdk {PLATFORM} -configuration {VARIANT} ALLJOYN_SDK_ROOT={PATH}
$ popd
```
2. Navigate to the directory of the service you would like to build:
```sh
$ # Perform one of the following:
$ cd controlpanel/ios/samples/
$ cd onboarding/ios/samples/
$ cd notification/ios/samples/
```
3. Then call `xcodebuild` with the following arguments to build the libraries for that service:
```sh
$ xcodebuild -project alljoyn_services_cpp/alljoyn_<service>_cpp.xcodeproj -sdk {PLATFORM} -configuration {VARIANT} ALLJOYN_SDK_ROOT={PATH}
$ xcodebuild -project alljoyn_services_objc/alljoyn_<service>_objc.xcodeproj -sdk {PLATFORM} -configuration {VARIANT} ALLJOYN_SDK_ROOT={PATH}
```
4. Next, call `xcodebuild` with the following arguments to build the sample app for that service:
```sh
$ xcodebuild -project sampleApp/<service>.xcodeproj -sdk {PLATFORM} -configuration {VARIANT} ALLJOYN_SDK_ROOT={PATH} ENABLE_BITCODE=NO
```


* PLATFORM - Pass `iphoneos` when targeting an iPhone device, or
`iphonesimulator` when building for the iOS simulator.
* ALLJOYN_SDK_ROOT - Replace `{PATH}` with the path to the root `alljoyn`
directory once [building AllJoyn Core from source][core] has been completed.
* VARIANT - Select the build variant to build. For debug, replace `{VARIANT}`
with `Debug`. For release, replace `{VARIANT}` with `Release`.


**NOTE:** For a full list of SCons command line options to build
the AllJoyn Base Services, enter `scons --help`.

The libraries and sample apps that have been built can be found in the
following directories:
```sh
$ # Sample apps
$ $AJ_ROOT/services/base/<service>/ios/samples/sampleApp/build/{VARIANT}-{SDK}/
$ # Libraries
$ $AJ_ROOT/services/base/<service>/ios/samples/alljoyn_services_cpp/build/{VARIANT}-{SDK}/
$ $AJ_ROOT/services/base/<service>/ios/samples/alljoyn_services_objc/build/{VARIANT}-{SDK}/
```

## Installing the samples

Apps built for iPhone devices can be installed by following these steps:
1. Connect an iOS device
2. Launch Xcode
3. Go to Window -> Devices
4. Select connected device and click '+' icon
5. Navigate to desired sample app and click 'Open'

Apps built for the iPhone simulator can be installed by following these steps:
1. Launch Simulator and allow it to boot
2. From the terminal, enter `xcrun simctl install booted <path_to_simulator_app>`

[core]: /develop/building/ios-osx/build-source
[download]: https://allseenalliance.org/framework/download
