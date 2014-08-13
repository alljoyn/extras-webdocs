# Notification Service Framework API Guide

-----

## Release history

In release 14.02, the dismiss method was added.

## Reference code

The reference code consists of an application that implements a producer and consumer.

## Source code

Table 1 lists the packages used to build an application that sends and/or receives notifications. These packages have a dependency on the alljoyn.jar, about_alljoyn.jar, and alljoyn_apps_android_utils.jar.

### Table 1. Notification service framework packages
| Package  | Description |
|---|---|
| NotificationService | Notification service framework code not platform-dependent |
| NotificationServiceCommons | Code that is common to all Java AllJoyn&trade; service frameworks |
| NotificationServiceNativePlatformAndroid | Code that is Android-specific |

## Reference Java application code

### Table 2. Applications
| Application  | Description |
|---|---|
| NotificationServiceUISample | UI-based application that can be used as a producer and/or a consumer to send and receive notifications |

## Obtain the Notification service framework

Refer to the *Getting Started with the AllJoyn Notification Service Framework (Android)* document for instructions on compiling the Notification service framework.

## Build a Notification Producer

Perform the following steps at a high level to build a Notification Producer.

1. Create the base for the AllJoyn application.
2. Implement the PropertyStore and use this with the AboutService in server mode. (Refer to the *AllJoyn About Feature Usage Guide (Android)* for instructions)
3. Initialize the Notification service framework and create a Producer.
4. Create a notification, populate the necessary fields, and use the Producer to send the notification.

## Build a Notification Consumer

Perform the following steps at a high level to build a Notification Consumer.

1. Create the base for the AllJoyn application.
2. Initialize the AboutService in client mode. (Refer to the *AllJoyn About Feature Usage Guide (Android)* for instructions)
3. Create a class that implements the NotificationReceiver.
4. Initialize the Notification service framework and provide the receiver implementation.
5. Start receiving notifications.

## Setting up the AllJoyn framework and About feature

The steps required for this service are universal to all applications that use the AllJoyn framework and for any application using one or more AllJoyn service frameworks. Prior to use of the Notification service framework as a Producer or Consumer, the About feature must be implemented and the AllJoyn framework set up.

Complete the procedures in the following documents to guide you in this process:

 - *Getting Started with the AllJoyn About Feature (Android)*
 - *AllJoyn About Feature Usage Guide (Android)*

# Implementing a Notification Producer

## Initialize the AllJoyn framework
Refer to the Getting Started with the AllJoyn About Feature (Android) for instructions to set up the AllJoyn framework.

## Start the AboutService in server mode
The Notification service framework Producer depends on the About feature.

For more information about the About feature, refer to the *AllJoyn About Feature Usage Guide (Android)*.

## Initialize the About feature

`aboutService = AboutServiceImpl.getInstance();`

## Create a PropertyStore

```
PropertyStore propertyStore = new PropertyStoreImpl(this);
Map<String, Object> config	=
propertyStore.ReadAll(Property.NO_LANGUAGE,Filter.READ);
String deviceName = (String)config.get(AboutKeys.ABOUT_DEVICE_NAME);
     propertyStore.setValue(AboutKeys.ABOUT_DEVICE_NAME, DEVICE_NAME, Property.NO_LANGUAGE);
}
propertyStore.setValue(AboutKeys.ABOUT_APP_NAME, appName, Property.NO_LANGUAGE);
try {
     aboutService.startAboutServer((short)1080, propertyStore, bus);
}
catch (Exception e) {
     Log.e(TAG, "AboutConfigService failed, Error: " + e.getMessage());
```

## Initialize the Notification service framework

`notificationService = NotificationService.getInstance();`

## Start the Notification service framework producer
Start the Notification service framework, and pass it the bus attachment and the newly created PropertyStore.

```
notificationSender = notificationService.initSend(bus, propertyStore);
isSenderStarted    = true;
```

## Send a notification
### Prepare the text per language to be sent

```
List<NotificationText> text = new LinkedList<NotificationText>();
text.add(new NotificationText("en", "The fridge door is open"));
text.add(new NotificationText("ru", "????? ???????????? ???????"));
```

### Create a notification object
Create a notification object where you can set all the optional fields such as an audio URL, etc.

`Notification notif = new Notification(messageType, text);`

### Notification optional parameters
The following optional parameters can be added to the notification:
- Icon URL - Set an icon URL that can be used to display along with the notification.

    `notif.setRichIconUrl("http://iconUrl.com/notification.jpeg");`

- Audio URL - Set an audio URL that can be used to enrich the notification. Each audio URL is set per language.

```
List< RichAudioUrl> audioUrl = new LinkedList< RichAudioUrl>();
audioUrl.add(new NotificationText("en", "http://audioUrl.com/notif_en.wav"));
audioUrl.add(new NotificationText("ru", "http://audioUrl.com/notif_ru.wav""));
notif.setRichAudioUrl(audioUrl);
```

- Icon object path - Set an icon object path so that the receiver can fetch the content of the icon to display along with the notification.

    `notif.setRichIconObjPath("/OBJ/PATH/ICON");`
    
- Audio object path - Set an audio object path so that the receiver can fetch the audio content to play along with the notification.

    `notif.setRichAudioObjPath("/OBJ/PATH/AUDIO");`
    
- Response object path - Set a response object path that can be used to interact with a bus object to allow the user to perform a control action as a result of a notification.

    `notif.setResponseObjectPath(/CPS/OBJ/PATH);`
    
### Send the notification

`notificationSender.send(notif, ttl);`

### Delete the last message
Once a notification was sent out and the application writer would like to cancel it, for example, if the notification was sent for an event that no longer occurs, and the TTL is still valid, use the deleteLastMsg API to delete the last notification for a given messageType.

`notificationSender.deleteLastMsg(messageType);`

# Implementing a Notification Consumer

## Initialize the AllJoyn framework
Refer to the *Getting Started with the AllJoyn About Feature (Android)* for instructions to set up the AllJoyn framework.

## Start an AboutClient in client mode
The Notification service framework consumer depends on the About feature.

For more information about the About feature, refer to the *AllJoyn About Feature Usage Guide (Android)*.

## Initialize the About feature

`aboutService = AboutServiceImpl.getInstance();`

## Start the AboutClient in client mode
Start the client to receive announcements.

`aboutService.startAboutClient(bus);`

## Initialize the Notification service framework

`notificationService = NotificationService.getInstance();`

## Start the Notification service framework consumer

###Implement the notificationReceiver interface
The notificationReceiver interface contains the following methods that can be implemented.

### Receive
The receive method gets a notification object as an argument. Implement this method to receive the notifications sent on the network.

When a notification is received by the service, it will call the receive method of the implemented notificationReceiver interface with the notification.

```
@Override
public void receive(Notification notification)
```

The notificationObject has a dismiss method and "getters" for all notification arguments that were sent in the message.

### Dismiss a message:
Implement this method to receive dismiss signals that were sent on the network so you can dismiss notifications that were received and should not be shown.

`notification.dismiss();`

Arguments that describe the device and app it were received from follow.
```
UUID notifAppId          = notification.getAppId();
String notifAppName     = notification.getAppName();
String notifDeviceId    = notification.getDeviceId();
String notifDeviceName  = notification.getDeviceName();
```

Arguments that describe the message follow.
```
int msgID      = notification.getMessageId();
String msgType = notification.getMessageType();
```

Arguments that give the content of the message follow.
```
List<NotificationText> text      = notification.getText();
List<RichAudioUrl> richAudioUrlL = notification.getRichAudioUrl();

String richIconUrl        = notification.getRichIconUrl();
String richIconObjPath    = notification.getRichIconObjPath();
String richAudioObjPath   = notification.getRichAudioObjPath();
String responseObjectPath = notification.getResponseObjectPath();
```

For more details, refer to the API documentation.

### Dismiss
When a dismiss signal is received by the service it calls the dismiss method the application writer provided the service, so that the application can remove the application from the UI:
```
@Override
public void dismiss(int notifId, UUID appId)
```

### Start the consumer
Start the consumer and pass it the bus attachment and the notificationReceiver from above.

`notificationService.initReceive(bus, notificationReceiver);`
