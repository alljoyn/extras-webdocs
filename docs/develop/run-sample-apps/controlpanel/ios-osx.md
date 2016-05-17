# Running the Control Panel Sample App - iOS

## Prerequisites

Follow steps in the [Building - iOS OS X section][build-ios-osx] 
to build and install the Control Panel sample app on an iOS device.

The Control Panel service sample app functions as the 
Controller side of the Control Panel service framework. 
At this time, there is not an iOS Controllee sample application. 
In order to have a Controllee to interact with, follow the instructions 
in [Run a Controllee][run-controllee] to set up and run a sample 
Controllee application on a Linux machine. Make sure the Linux 
machine and the iOS device are on the same network.

To install the app navigate to the AllJoyn™ root directory, then:
```sh
export AJ_ROOT=`pwd`

# For installing on the simulator use the following .app file
$AJ_ROOT/services/base/controlpanel/ios/samples/sampleApp/build/Debug-iphonesimulator/ControlPanelService.app

# For installing on a device use the following .app file
$AJ_ROOT/services/base/controlpanel/ios/samples/sampleApp/build/Debug-iphoneos/ControlPanelService.app
```

## Run the Control Panel Sample App
1. Launch the Control Panel sample app on your iOS device.

![][1.StartScreen]

2. Click the "Connect to AllJoyn" button.

![][2.DiscoverScreen]

The application is now running as a Controller. In the list 
area below the "Disconnect from AllJoyn" button, you will see
any nearby applications that have been discovered via About 
that support the Control Panel service framework and are acting as a Controllee.

4. To interact with a Controllee, select one from the list 
of nearby applications that have been discovered.
5. Choose an option from the pop-up that appears:

  ![][3.ModalScreen]

  * Show Announce: This will allow you to view the About announcement 
  that was received from the nearby application.

    ![][4.AnnounceScreen]

  * About: This will show the full set of information retrieved 
  by the About Client from the nearby application.

    ![][5.AboutScreen]

  * Control Panel: You can use the Control Panel Controller 
  to interact with the control panel(s) exposed by the Controllee.

    ![][6.ControllerScreen]

    * After selecting this option, click the **Language** button 
    in the upper right-hand corner of the screen and enter
    one of the available languages into the text field.
    For example, enter "en" to see the English version of the control panel (selected by default).
    * Once you have chosen a control panel and a language, 
    the data for the corresponding control panel is displayed.

## Run a Controllee

Follow the instructions in the [Running - Linux section][run-linux] 
to build and run the Controllee sample app. This will allow you 
to run the ControlPanelService Controllee sample on a Linux machine.

[build-ios-osx]: /develop/building/ios-osx
[run-linux]:  /develop/run-sample-apps/controlpanel/linux
[run-controllee]: #run-a-controllee

[1.StartScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/1.StartScreen.png
[2.DiscoverScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/2.DiscoverScreen.png
[3.ModalScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/3.ModalScreen.png
[4.AnnounceScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/4.AnnounceScreen.png
[5.AboutScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/5.AboutScreen.png
[6.ControllerScreen]: /files/develop/run-sample-apps/ios-controlpanel-sample/6.ControllerScreen.png
