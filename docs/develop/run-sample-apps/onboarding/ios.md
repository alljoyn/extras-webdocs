# Run the Onboarding Sample App - iOS

## Prerequisites

[Build the iOS sample apps][build-ios-osx] and install the 
Onboarding sample app on an iOS device.

The Onboarding service sample app functions as the Onboarder 
side of the Onboarding service framework. At this time, there 
is not an iOS Onboardee sample application. In order to have 
an Onboardee to interact with, follow the instructions in 
[Run an Onboardee][run-onboardee] to set up and run a 
sample Onboardable application on an Android device.

## Run the Onboarding Sample App

1. Use the **Settings** > **Wi-Fi** menu option on your iOS device 
to connect to the AP being advertised by the device that you want to onboard.
2. Once you have connected to the device's AP, run the 
Onboarding service sample app on your iOS device.

  ![][1.ConnectToAllJoyn]

3. Click the **Connect to AllJoyn** button. The application will now be running 
as an Onboarder. The list area below the **Disconnect from AllJoyn** button 
will show all nearby applications discovered by the About feature that 
support the Onboarding service framework and are acting as an Onboardee.

  ![][2.SelectDevice]

4. To interact with an Onboardee, select one from the list 
of nearby applications that have been discovered. 
A pop-up box will appear with the following options:
  * **Show Announce:** This will allow you to view the About 
  announcement that was received from the nearby application.
  * **About:** This will show the full set of information 
  retrieved by the About Client from the nearby application.
  * **Onboarding:** This will let you use the Onboarder to step through 
  the process of onboarding the Onboardee onto the local Wi-Fi network.

  ![][3.ChooseOnboarding]

5. Select the **Onboarding** option to proceed to the target network 
configuration screen.

  ![][4.Onboarding]

6. Enter the SSID, authentication type and password of the Wi-Fi network 
you want to onboard the device onto.

  ![][5.FillOnboardingDetails]

7. Click **Configure**. This will use the Onboarding service to pass 
these values to the Onboardee.

  ![][6.Configure]

8. Click **Connect**. You should see a success message popup appear.
  * Note at this point in time the change in Wi-Fi network may redirect 
  you back to the app's opening screen in order to reconnect to AllJoyn 
  via the **Connect to AllJoyn** button. Go on to step #9 first and 
  *then* reconnect, or else the following steps may not work.

  ![][7.Connect]

9. Go to the **Settings** > **Wi-Fi** menu option on your iOS device 
and switch networks to the one that you onboarded the other device to. 

10. Return to the app and navigate back to the onboardee list screen from 
step #3. You should now see a list of nearby devices on the network you 
just switched to, including your newly onboarded device.

  ![][8.AllJoynNetwork]

To offboard the onboarded device from the AllJoyn network, repeat steps #4 and #5. A new screen will appear which has an **Offboarding** button to execute offboarding.
  * Note that for iOS simulators, the offboarding option is located on 
  the target network configuration screen from steps #5 to #8.

  ![][9.Offboarding]
  ![][10.OffboardComplete]

## Run an Onboardee

Follow the [instructions to run the AboutConfOnbServer in Android][onboardee]. 
You will then be able to use the iOS Onboarding Service 
sample app to onboard the app on the Android device.

[1.ConnectToAllJoyn]: /files/develop/run-sample-apps/ios-onboardingclient-sample/1.ConnectToAllJoyn.png
[2.SelectDevice]: /files/develop/run-sample-apps/ios-onboardingclient-sample/2.SelectDevice.png
[3.ChooseOnboarding]: /files/develop/run-sample-apps/ios-onboardingclient-sample/3.ChooseOnboarding.png
[4.Onboarding]: /files/develop/run-sample-apps/ios-onboardingclient-sample/4.Onboarding.png
[5.FillOnboardingDetails]: /files/develop/run-sample-apps/ios-onboardingclient-sample/5.FillOnboardingDetails.png
[6.Configure]: /files/develop/run-sample-apps/ios-onboardingclient-sample/6.Configure.png
[7.Connect]: /files/develop/run-sample-apps/ios-onboardingclient-sample/7.Connect.png
[8.AllJoynNetwork]: /files/develop/run-sample-apps/ios-onboardingclient-sample/8.AllJoynNetwork.png
[9.Offboarding]: /files/develop/run-sample-apps/ios-onboardingclient-sample/9.Offboarding.png
[10.OffboardComplete]: /files/develop/run-sample-apps/ios-onboardingclient-sample/10.OffboardComplete.png

[build-ios-osx]: /develop/building/ios-osx
[run-onboardee]: #run-an-onboardee
[onboardee]: /develop/run-sample-apps/onboarding/android#running-android-sample-onboardingserver
