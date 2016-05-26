# Running Control Panel Sample - Thin Linux

## Prerequisites
* [Build the thin Linux samples][build-thin-linux]
* [Build the AllJoyn&trade; router][build-linux]. AllJoyn thin 
  apps require an AllJoyn router to connect to in order to function properly.

## Run Controllee Sample

1. Navigate to the AllJoyn™ root directory, then:

  ```sh
  export AJ_ROOT=`pwd`

  # <TARGET CPU> can be either x86_64, x86, or whatever value you set for CPU= when running SCons.
  export TARGET_CPU=<TARGET CPU>
  cd $AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/release/dist/cpp/bin

  BASE_THIN_DIST_LIB=$AJ_ROOT/services/base_tcl/dist/lib
  CORE_THIN_DIST_LIB=$AJ_ROOT/core/ajtcl/dist/lib

  # This sets the library path to load the liballjoyn.so shared library.
  export LD_LIBRARY_PATH=`pwd`/../lib:$BASE_THIN_DIST_LIB:$CORE_THIN_DIST_LIB:$LD_LIBRARY_PATH

  # Launch the alljoyn daemon to allow thin apps to connect to the alljoyn router
  ./alljoyn-daemon &
   ```

2. Launch the Controllee Sample (in a new terminal).

  ```sh
  cd $AJ_ROOT/services/base_tcl/build/release/samples
  ./ControlleeSample
  ```

3. Use one of the following Controller apps to interact with the Controllee:
  * [iOS Controller][ios_controller]
  * [Android Controller][android_controller]
  * [Linux Controller][linux_controller]

[ios_controller]: /develop/run-sample-apps/controlpanel/ios-osx
[android_controller]: /develop/run-sample-apps/controlpanel/android
[linux_controller]: /develop/run-sample-apps/controlpanel/linux
[build-thin-linux]: /develop/building/thin-linux
[build-linux]: /develop/building/linux

