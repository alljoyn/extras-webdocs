# Running Notification Sample - Thin Linux

## Prerequisites
* [Build the thin Linux samples][build-thin-linux]
* [Build the AllJoyn&trade; router][build-linux]. AllJoyn thin 
  apps require an AllJoyn router to connect to in order to function properly.

## Run Notification Producer and Consumer

1. Launch the AllJoyn daemon using the config file to allow thin apps to connect.

   ```sh
   # <TARGET CPU> can be either x86_64, x86, or whatever value you set for CPU= when running SCons.
   export TARGET_CPU=<TARGET CPU>
   cd $AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/release/dist/cpp/bin
   
   BASE_THIN_DIST_LIB=$AJ_ROOT/services/base_tcl/dist/lib
   CORE_THIN_DIST_LIB=$AJ_ROOT/core/ajtcl/dist/lib

   export LD_LIBRARY_PATH=`pwd`/../lib:$BASE_THIN_DIST_LIB:$CORE_THIN_DIST_LIB:$LD_LIBRARY_PATH
   # This sets the library path to load the liballjoyn.so shared library.

    ./alljoyn-daemon &
    ```

3. Launch NotificationConsumerSample (in a new terminal). Ensure LD_LIBRARY_PATH is set as above.

   ```sh
   cd $AJ_ROOT/services/base_tcl/build/release/samples
   ./NotificationConsumerSample
   ```

4. Launch NotificationProducerSample (in a new terminal). Ensure LD_LIBRARY_PATH is set as above.

   ```sh
   cd $AJ_ROOT/services/base_tcl/build/release/samples
   ./NotificationProducerSample
   ``` 

   This won't produce output (run the sample from ```$AJ_ROOT/services/base_tcl/build/debug/samples``` for output)

The output from NotificationConsumerSample should look like this:

```
./NotificationConsumerSample 
******************** Begin New Message Received ********************
Message Id: 1000189632
Version: 2
Device Id: 1609870266dc3e02f926ef98623b5126
Device Name: COMPANY GENERIC BOARD 23b5126
App Id: 1609870266DC3E02F926EF98623B5126
App Name: Company A(EN)
Message Type: 2
OriginalSender bus unique name: :qWt-d9Uz.3
Language: en  Message: Hello AJ World.
Language: de-AT  Message: Hallo AJ Welt.
Other parameters included:
Custom Attribute Key: On  Custom Attribute Value: Hello
Custom Attribute Key: Off  Custom Attribute Value: Goodbye
Rich Content Icon Url: http://www.getIcon1.org
******************** Begin Rich Audio Content ********************
Language: en  Audio URL http://www.getAudio1.org
Language: de-AT  Audio URL http://www.getAudio2.org
******************** End Rich Audio Content ********************
Rich Content Icon Object Path: /icon/MyDevice
Rich Content Audio Object Path: /audio/MyDevice
******************** End New Message Received ********************
```

[build-thin-linux]: /develop/building/thin-linux
[build-linux]: /develop/building/linux