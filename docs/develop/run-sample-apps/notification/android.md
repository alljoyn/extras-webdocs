# Android - Notification Sample Apps

## Running Android NotificationServiceUISample

### Prerequisites
Open a terminal and navigate to the AllJoyn&trade; root dir, then, with an android device connected:

```sh
export AJ_ROOT=`pwd`
adb install $AJ_ROOT/services/base/notification/java/sample_applications/android/NotificationServiceUISample/bin/NotificationServiceUISample.apk
```

### App Flow
The Android NotificationServiceUISample provides a sample 
Android implementation of an app that uses the Notification service framework.

You can use the NotificationServiceUISample app to act as a Notification Producer, a Notification Consumer, or both a Producer and Consumer, simultaneously.
If you run the app as both a producer and consumer simultaneously, you will be able to send and receive notifications on a single Android device.

Alternatively, you can run the app as a Producer on one device, and as a Consumer on another device.

**NOTE:** Both devices must be on the same Wi-Fi network.

1. On two or more devices, load the NotificationServiceUISample.apk, 
and start app `NotificationService UI Sample`.

  ![][1.StartScreen]

2. Check the **Consumer** checkbox for the app instances which will be receiving notifications.

  ![][2.CheckConsumerCheckbox]

3. Check the **Producer** checkbox for the app instances which will be sending notifications.

  ![][3.CheckProducerCheckbox]

4. In an app instance with **Producer** checked, enter a message and press **Send**.

  ![][4.ProducerSendsHelloWorld]

5. All app instances with **Consumer** checked will receive and 
display the notification text and message type.

  ![][5.ConsumerReceivesHelloWorld]

## Additional Tips
You can select received notifications from the list to dismiss them or execute an action. Dismissing the notification will stop
the producer from broadcasting the notification. To receive a notification with an action, run the ServerSample application (which
runs an air conditioner controllee.) From a controller set the mode to 'Fan'. Wait for your notification consumer to receive a notification
with the message 'Fan is still running'. Executing the action on this message will present a [Control Panel][controlpanel-learn-index] with additional options.

To receive a notification in a different language change the consumer language dropdown to your preferred choice. Note, this will not update
notifications that were previously received and are currently displayed in the list.
To send a notification in a different language, use the secondary message input and select the language of choice from the producers dropdown.

To see an example of a notification with a url and object path select the audio or icon checkboxes before sending a notification from the producer.

Pressing the "Delete" button will stop the producer from broadcasting the notification with the currently selected message type.

[1.StartScreen]: /files/develop/run-sample-apps/android-notification-sample/1.StartScreen.png
[2.CheckConsumerCheckbox]: /files/develop/run-sample-apps/android-notification-sample/2.CheckConsumerCheckbox.png
[3.CheckProducerCheckbox]: /files/develop/run-sample-apps/android-notification-sample/3.CheckProducerCheckbox.png
[4.ProducerSendsHelloWorld]: /files/develop/run-sample-apps/android-notification-sample/4.ProducerSendsHelloWorld.png
[5.ConsumerReceivesHelloWorld]: /files/develop/run-sample-apps/android-notification-sample/5.ConsumerReceivesHelloWorld.png
[controlpanel-learn-index]: /learn/base-services/controlpanel/index 
