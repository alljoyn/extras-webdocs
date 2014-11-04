# Running Chat Sample - iOS

## Prerequisites
* [Build the sample][build-ios-osx]
* Install the Chat sample app on two iOS devices.
* Both iOS devices must be connected to the same Wi-Fi network.

## Run AllJoyn&trade; Chat

Launch the AllJoyn Chat app on two iOS devices. 

The AllJoyn Chat should now now be running on both iOS devices. The initial screen should look like this: 
  ![][setup-screen]

### Chat using a session 

1. On both devices, ensure that the **Use a session** option is toggled to _ON_.

2. On one device, select the **Host** button, then press **Start**. 
On the second device, select the **Join** button, then press 
**Start**. The screen on both apps should look like this:
  ![][chat-screen]

3. On one device, enter a message and press **Send**. The message 
appears on the device it was entered on, and also on the second 
device. Example screenshots:
  ![][chat-device1-1]
  ![][chat-device2-1]  

### Chat using sessionless signals

1. On both devices, ensure that the **Use a session** option is toggled to _OFF_.
2. On both devices, press **Start**. The screen on both apps should look like this:
  ![][sls-chat-screen]

3. On one device, enter a message and press **Send**. The message 
appears on the device it was entered on, and also on the second device. 
Example screenshots:
  ![][sls-chat-device1-1]
  ![][sls-chat-device2-1]  

[setup-screen]: /files/develop/run-sample-apps/ios-chat-sample/setup-screen.png
[chat-screen]: /files/develop/run-sample-apps/ios-chat-sample/chat-screen.png
[chat-device1-1]: /files/develop/run-sample-apps/ios-chat-sample/chat-device1-1.png
[chat-device1-2]: /files/develop/run-sample-apps/ios-chat-sample/chat-device1-2.png
[chat-device2-1]: /files/develop/run-sample-apps/ios-chat-sample/chat-device2-1.png
[chat-device2-2]: /files/develop/run-sample-apps/ios-chat-sample/chat-device2-2.png
[sls-chat-device1-1]: /files/develop/run-sample-apps/ios-chat-sample/sls-chat-device1-1.png
[sls-chat-device2-1]: /files/develop/run-sample-apps/ios-chat-sample/sls-chat-device2-1.png
[sls-chat-screen]: /files/develop/run-sample-apps/ios-chat-sample/sls-chat-screen.png

[build-ios-osx]: /develop/building/ios-osx