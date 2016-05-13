# Linux - Running Notification Sample Apps

## Running ConsumerService and ProducerBasic Sample Apps

### Prerequisites

Open two terminal windows. In each, navigate to the AllJoyn&trade; root dir, then:

```sh
export AJ_ROOT=`pwd`

# <TARGET CPU> can be either x86_64, x86, or whatever value you set for "CPU=" when running SCons.
export TARGET_CPU=x86

AJ_CPP_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/cpp/lib
AJ_NOTIFICATION_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/lib
AJ_SERVICES_COMMON_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/services_common/lib

export LD_LIBRARY_PATH=$AJ_CPP_LIB:$AJ_NOTIFICATION_LIB:$AJ_SERVICES_COMMON_LIB:$LD_LIBRARY_PATH
```

### Run the ProducerBasic Sample App

In one of the terminal windows, run `ProducerBasic`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/bin/ProducerBasic
```

The output from `ProducerBasic` should look like this:
```
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/bin/ProducerBasic
lstat: No such file or directory
   0.210 TRACE    Notification external         .../NotificationService.cc:62 | NotificationService::initSend
   0.210 TRACE    Notification external         ...n/cpp/src/Transport.cc:175 | Transport::startSenderTransport
   0.211 TRACE    Notification external         ...n/cpp/src/Transport.cc:414 | Transport::cleanupNotificationProducerReceiverInternal start
   0.211 TRACE    Notification external         ...n/cpp/src/Transport.cc:420 | Transport::cleanupNotificationProducerReceiverInternal end
   0.211 TRACE    Notification external         ...n/cpp/src/Transport.cc:527 | Transport::cleanupNotificationProducerSender start
   0.211 TRACE    Notification external         ...ionProducerReceiver.cc:106 | NotificationProducerReceiver::ReceiverThreadWrapper()
   0.212 DEBUG    Notification external         ...n/cpp/src/Transport.cc:222 | Transport::startSenderTransport - registered NotificationProducerReceiver successfully.
   0.213 DEBUG    Notification external         ...n/cpp/src/Transport.cc:237 | bind Session Port successfully for notification producer service
   0.213 TRACE    Notification external         ...n/cpp/src/Transport.cc:459 | Transport::cleanupNotificationDismisserReceiverInternal start
   0.213 TRACE    Notification external         ...n/cpp/src/Transport.cc:465 | Transport::cleanupNotificationDismisserReceiverInternal end
   0.213 DEBUG    Notification external         ...ationDismisserSender.cc:47 | NotificationDismisserSender()  - Got objectpath=/notificationDismisser
   0.213 TRACE    Notification external         ...n/cpp/src/Transport.cc:260 | Started Sender successfully
   0.214 TRACE    Notification external         ...c/NotificationSender.cc:51 | Send Message called
   0.214 DEBUG    Notification external         .../src/PayloadAdapter.cc:424 | Attempting to send messageId: 1879962717
   0.215 DEBUG    Notification external         ...ionTransportProducer.cc:65 | Sent signal successfully
   0.215 HL_DBG   Notification external         .../src/PayloadAdapter.cc:429 | Message sent successfully with messageId: 1879962717
Notification sent!
Hit Ctrl+C to exit the application
```

### Run the ConsumerService Sample App

In the other terminal window, run `ConsumerService`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/bin/ConsumerService
```

The output from `ConsumerService` should look like this:
```
Begin Consumer Application. (Press CTRL+C to end application)
Enter in a list of app names (separated by ';') you would like to receive notifications from.
Empty list means all app names.

1.408 DEBUG    Notification external         ...NotificationService.cc:208 | Init receive
1.408 DEBUG    Notification external         ...ionTransportConsumer.cc:73 | Registered the SignalHandler successfully
1.408 DEBUG    Notification external         ...n/cpp/src/Transport.cc:292 | Match String is: type='signal',sessionless='t',interface='org.alljoyn.Notification'
1.409 TRACE    Notification external         ...n/cpp/src/Transport.cc:414 | Transport::cleanupNotificationProducerReceiverInternal start
1.409 TRACE    Notification external         ...n/cpp/src/Transport.cc:420 | Transport::cleanupNotificationProducerReceiverInternal end
1.410 TRACE    Notification external         ...ionDismisserReceiver.cc:42 | NotificationDismisserReceiver::NotificationDismisserReceiver() - called()
1.410 DEBUG    Notification external         ...ionDismisserReceiver.cc:79 | Registered the SignalHandler successfully
1.410 DEBUG    Notification external         ...n/cpp/src/Transport.cc:333 | NotificationDismisserReceiver Match String is: type='signal',sessionless='t',interface='org.alljoyn.Notification.Dismisser'
1.413 TRACE    Notification external         ...n/cpp/src/Transport.cc:459 | Transport::cleanupNotificationDismisserReceiverInternal start
1.413 TRACE    Notification external         ...n/cpp/src/Transport.cc:465 | Transport::cleanupNotificationDismisserReceiverInternal end
1.413 DEBUG    Notification external         ...ationDismisserSender.cc:47 | NotificationDismisserSender()  - Got objectpath=/notificationDismisser
1.413 DEBUG    Notification external         ...n/cpp/src/Transport.cc:364 | Started Receiver successfully
Waiting for notifications.
1.679 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
1.976 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
1.977 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
1.978 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
2.474 DEBUG    Notification lepDisp1_1       ...ionTransportConsumer.cc:84 | Received Message from producer.
******************** Begin New Message Received ********************
Message Id: 1814180121
Device Id: ProducerBasic
Device Name: ProducerBasic
App Id: 30464642393946452D374141382D3432
App Name: DISPLAY_ALL
Sender BusName: :_FVRAlI2.2
Message Type 0 emergency
Notification version: 2
Language: en  Message: hello world
Other parameters included:
OriginalSender: :_FVRAlI2.2
******************** End New Message Received ********************

Notification action (0-Nothing 1-Dismiss):
2.910 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
3.207 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
3.208 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
3.511 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
5.355 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
5.362 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
5.363 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
5.364 ****** ERROR IPNS    IpNameServiceImpl .../IpNameServiceImpl.cc:7650 | Ignoring advertisement from 192.168.1.93 for 192.168.2.136 received on en0: ER_WARNING
0
Nothing planed to do with the notification message id:1814180121
End handling notification!!!
```