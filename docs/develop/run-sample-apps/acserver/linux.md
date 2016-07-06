# Linux - Running Server Sample App

## Running ServerSample

### Prerequisites

1. Open a terminal window:

```sh
$ # Set {CPU} to the "CPU=" value used when running scons, e.g. x86_64, x86.
$
$ AJ_CPP_LIB=$AJ_ROOT/core/alljoyn/build/linux/{CPU}/debug/dist/cpp/lib
$ AJ_NOTIFICATION_LIB=$AJ_ROOT/services/base/notification/build/linux/{CPU}/debug/dist/notification/lib
$ AJ_CONTROLPANEL_LIB=$AJ_ROOT/services/base/controlpanel/build/linux/{CPU}/debug/dist/controlpanel/lib
$ AJ_SERVICES_COMMON_LIB=$AJ_ROOT/services/base/services_common/build/linux/{CPU}/debug/dist/services_common/lib
$
$ export LD_LIBRARY_PATH=$AJ_CPP_LIB:$AJ_CONTROLPANEL_LIB:$AJ_NOTIFICATION_LIB:$AJ_SERVICES_COMMON_LIB:$LD_LIBRARY_PATH
```
  
### Run the Server Sample App

1. In the terminal, run `ServerSample`:
```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/{CPU}/debug/dist/sample_apps/bin/
$ ./ServerSample
```
   The app will continuously print out its values to the terminal.

2. On an Android device, run the **ControlPanelBrowser** sample app and select
   the application from the device list to control features of the air
   conditioner such as temperature, mode and fan speed:

   ![][1.ControllingAC]

   On an iOS or Android device, run the **NotificationService** sample app and
   select 'Consumer', or on a Linux device run the **ConsumerService** sample
   app, to observe notifications sent from the Server Sample. To receive
   notifications exclusive to Server Sample, the app name set in the .conf file
   can also entered into the app as shown below in the Android version:

   ![][2.ACNotifications]

   Notifications are produced by the Server Sample in response to events like
   changes in settings and the target temperature being reached. Some
   notifications have actions attached, such as the alert the fan has been left
   running.

[1.ControllingAC]: /files/develop/run-sample-apps/linux-server-sample/1.ControllingAC.png
[2.ACNotifications]: /files/develop/run-sample-apps/linux-server-sample/2.ACNotifications.png
