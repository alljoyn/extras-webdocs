# Notification Service Usage Guide - iOS

## Using the Notification Service

There are two ways to use the Notification Service, as a ‘Producer’ and as ‘Consumer’. The power of the [Notification service][learn_notif] is its simplicity and ability to allow devices to "talk" to end users to provide meaningful information.

The Notification Producer side of an application is responsible for sending a [sessionless signal][sessionless_signal] that contains a small amount of text with some optional values.  This text is intended to be rendered on any device that contains the Consumer side of the Notification Service.

The Notification Consumer side of an application is responsible for registering to receive the [sessionless signal][sessionless_signal] from any application that supports the Producer side of the Notification service.

An application can be a consumer, a producer, or both.

## Prerequisites

Follow the steps in the 'Develop->Building->iOS' section to get your environment and project setup to use the AllJoyn&trade; framework and the Notification Service. 

## Producing Notifications

### General AllJoyn Setup
### About Feature Setup
### Create Notification Producer

* Initialize the Notification service framework 
  
```
  AJNSNotificationService *producerService;
  // Initialize a AJNSNotificationService object
  self.producerService =  [[AJNSNotificationService alloc] init];
```

* Start the Notification producer, providing the bus attachment and About property store implementation

```
  AJNSNotificationSender *Sender; 
  // Call initSend
  self.Sender = [self.producerService startSendWithBus:self.busAttachment andPropertyStore:self.aboutPropertyStoreImpl];
  if (!self.Sender) {
      [self.logger fatalTag:[[self class] description] text:@"Could not initialize Sender"];
      return ER_FAIL;
  }
```

* Create a Notification

  Required parameters are `Message Type` and `Notification Text`

```
  AJNSNotification *notification;
  self.notification = [[AJNSNotification alloc] initWithMessageType:self.messageType andNotificationText:self.notificationTextArr];
```

  Set the `DeviceId` `DeviceName` `AppId` `AppName` and `Sender` so that applications that receive and consumer the notification know where it came from and who sent it.
  
```
  [self.notification setDeviceId:nil];
  [self.notification setDeviceName:nil];
  [self.notification setAppId:nil];
  [self.notification setAppName:self.appName];
  [self.notification setSender:nsender];
```
  
* Send the Notification

  Provide a valid TTL.

```
  QStatus sendStatus = [self.Sender send:self.notification ttl:nttl];
  if (sendStatus != ER_OK) {
    [self.logger infoTag:[[self class] description] text:[NSString stringWithFormat:@"Send has failed"]];
  }
  else {
    [self.logger infoTag:[[self class] description] text:[NSString stringWithFormat:@"Successfully sent!"]];
  }
```

* Advanced Features
  * Audio
  * Image
  * Custom Attributes
  * Delete the last message sent

## Consuming Notifications

### General AllJoyn Setup
### About Feature Setup
### Create Notification Consumer
* Initialize the Notification service framework 

```
  AJNSNotificationService *consumerService;
  self.consumerService = [AJNSNotificationService sharedInstance];
```
* Implement the `notificationReceiver` interface (`receive` and `dismissMsgId` methods)

```
  - (void)receive:(AJNSNotification *)ajnsNotification
  {
    // application logic to handle the received notification
  }
```
```
  - (void)dismissMsgId:(const int32_t)msgId appId:(NSString*) appId
  {
    // application logic to handle the dismissed notification
  }
```

* Start the Notification consumer, providing the bus attachment and Notification receiver

```
  // Call "initReceive"
  status = [self.consumerService startReceive:self.busAttachment withReceiver:self];
  if (status != ER_OK) {
    [self.logger fatalTag:[[self class] description] text:@"Could not initialize receiver"];
    return ER_FAIL;
  }
```
  
Refer to the Notification Service Sample App source code and API documentation for examples and more details.  

[learn_notif]: /learn/base-services/notifications
[sessionless_signal]: /learn/core-framework#sessionless-signal
