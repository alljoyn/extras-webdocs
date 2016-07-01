# Alljoyn&trade; Notification Framework Interface Definition

## Overview

The AllJoyn&trade; Notification Framework enables devices to send
user-presentable information to other devices on the network. _Producers_
prepare and send notifications; _consumers_ listen, receive, and present these
notifications for the user's attention and action. Several producers and
consumers can be active on the AllJoyn&trade; network at the same time.

The framework supports multilingual text, image icon, and audio message content.
Integration with the AllJoyn&trade; Control Panel Framework allows the producer
to supply a control panel for the consumer to present for direct user
interaction. It's also possible to implement application-specific content via
custom attributes.

**NOTE:** All methods and signals are considered mandatory to support the
AllSeen Alliance Compliance and Certification program.

### Architecture

The framework can be divided into three primary components:

* Notification Service
* Producer API
* Consumer API

The Notification Service implements the Notification Interface which performs
the work of delivering notification messages.

Depending on the role and capabilities of an application, either or both of the
Producer and Consumer APIs may be used to interact with the Notification
Service.

The following diagram shows how the Notification framework and its components
relate to the AllJoyn&trade; ecosystem.

![Notification Framework Architecture](/files/learn/notification-arch.png)

## A Typical Notification Flow

The figure below illustrates the typical flow of activity amongst a producer and
two consumers.

![Notification Flow](/files/learn/notification-typical-call-flow.png)

The producer sends out a notification, which the service transmits as a
sessionless signal over the network. Upon receiving the signal broadcast each
consumer establishes a unicast session with the producer to obtain the message
content. The producer then delivers the content individually to each consumer
that requests it.

## Specification

### Notification Structure

A notification is comprised of a Type, TTL (Time to Live), and a collection of
content fields. The producer is responsible for setting the values of all
necessary fields prior to sending.

#### Message Type and TTL

The message type is one of three predefined values that express the import of
the notification. Multiple notifications of different types may be sent by a
single producer, but only the most recently sent of each type will be persisted.

The TTL determines how long a notification will persist on the producer.
Consumers that connect after the initial send will still receive the
notification if the TTL has not expired. Once the TTL expires, the notification
is permanently removed. Consumers that connect after a notification's TTL has
expired will not receive it.

See [Notification Service Framework Use Cases][_r_usecases] for use case
scenarios related to notification message behavior.

#### Dismissing a Notification

Consumers can choose to dismiss a notification locally or globally on behalf of
all consumers on the AllJoyn&trade; network. To dismiss locally a consumer
simply stops presenting the notification.

Dismissing a notification globally can be useful when there are several
consumers on a network. Requiring the user to dismiss a notification everywhere
it may be presented would result in a poor experience. An consumer should only
dismiss globally in response to user action.

To dismiss a notification globally, the consumer connects to the producer of the
notification and directs it to cease its broadcast. The producer removes the
notification and sends a sessionless signal to all consumers directing them to
stop presenting the notification. If the producer cannot be reached, the
consumer may send out the dismiss sessionless signal on its own.

## Notification Interface

The Notification interface is announced such that when a device scans the
network, it can find all producer devices.

| Name | Version | Secured | Object Paths |
|---|:-:|:-:|---|
| `org.alljoyn.Notification` | 1 | &check; | <ul><li>`/emergency`</li><li>`/warning`</li><li>`/info`</li></ul> |

### Properties

| Name | Signature | Values | R/W | Description |
|---|:-:|---|:-:|---|
| `Version` | `q` | [`1`,`USHRT_MAX`] | `R` | Interface version |

### Methods

No methods are exposed by this interface.

### Signals

### `notify('qiqssaysa{ss}a{iv}a(ss)')`

#### Message Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `version` | `q` | [`1`,`USHRT_MAX`] | Protocol version |
| 1 | `msgId` | `i` | [`INT_MIN`,`INT_MAX`] | Message ID |
| 2 | `msgType` | `q` | see `NotificationMessageType` | Message type |
| 3 | `deviceId` | `s` | [RFC 4122][_r_rfc4122]-compliant GUID (as `string`)| Device ID |
| 4 | `deviceName` | `s` |  | Device name |
| 5 | `AppId` | `ay` | [RFC 4122][_r_rfc4122]-compliant GUID (as `byte[]`) | Application ID |
| 6 | `appName` | `s` |  | Application name |
| 7 | `attributes` | `a{iv}` | see [Attributes][_r_attrs] | Standard attributes |
| 8 | `customAttributes` | `a{ss}` | | Custom attributes |
| 9 | `langText` | `a{ss}` | Dictionary of message strings. The key must evaluate to a [RFC 5646][_r_rfc5646]-compliant language code | Message text |

&sup1; &ndash; The `msgId` is unique to the producer. It is possible that
notifications with identical `msgId` values may be broadcast simultaneously, but
from different producers.

#### Description

AllJoyn&trade; signal carrying a notification message.

### Attributes

| Key | Signature | Values | Description |
|---|:-:|---|---|
| `RICH_CONTENT_ICON_URL_ATTRIBUTE_KEY` | `s` | Valid URL | Icon URL |
| `RICH_CONTENT_AUDIO_URL_ATTRIBUTE_KEY` | `a{ss}` | Dictionary of valid URLs. The key must evaluate to a [RFC 5646][_r_rfc5646]-compliant language code  | Audio URL |
| `RICH_CONTENT_ICON_OBJECT_PATH_ATTRIBUTE_KEY` | `o` |  Valid Object Path | Icon Object Path |
| `RICH_CONTENT_AUDIO_OBJECT_PATH_ATTRIBUTE_KEY` | `o` | Valid Object Path | Audio Object Path |
| `CPS_OBJECT_PATH_ATTRIBUTE_KEY` | `o` | Valid Object Path | Response Object Path |
| `ORIGINAL_SENDER_ATTRIBUTE_KEY` | `s` | Valid Bus Name | Producer Bus Name |

### Introspection XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<node xsi:noNamespaceSchemaLocation="https://www.allseenalliance.org/schemas/introspect.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <interface name="org.alljoyn.Notification">
      <property name="Version" type="q" access="read"/>
      <signal name="notify">
         <arg name="version" type="q"/>
         <arg name="msgId" type="i"/>
         <arg name="msgType" type="q"/>
         <arg name="deviceId" type="s"/>
         <arg name="deviceName" type="s"/>
         <arg name="appId" type="ay"/>
         <arg name="appName" type="s"/>
         <arg name="attributes" type="a{iv}"/>
         <arg name="customAttributes" type="a{ss}"/>
         <arg name="langText" type="a(ss)"/>
      </signal>
   </interface>
</node>
```

## Producer Interface

The Notification Producer interface is announced such that, when a device scans
the network, it can find all producer devices.

| Name | Version | Secured | Object path |
|---|:-:|:-:|---|
| `org.alljoyn.Notification.Producer` | 1 | &check; | `/notificationProducer` |

### Properties

| Name | Signature | Values | R/W | Description |
|---|:-:|---|---|---|
| `Version` | `q` | [`1`,`USHRT_MAX`] | R | Interface version |

### Methods

The following methods are exposed by the object that implements
the this interface.

### `Dismiss('i')`

#### Message Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `msgId` | `i` | [`INT_MIN`,`INT_MAX`] | ID of notification to be dismissed |

#### Reply arguments

None.

#### Description

The consumer requests the producer cease broadcasting a notification and send
out a dismiss signal.

### Introspection XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<node xsi:noNamespaceSchemaLocation="https://www.alljoyn.org/schemas/introspect.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <interface name="org.alljoyn.Notification.Producer">
      <method name="Dismiss">
         <arg name="msgId" type="i" direction="in"/>
      </method>
      <property name="Version" type="q" access="read"/>
   </interface>
</node>
```

## Dismisser Interface

The Dismiss sessionless signals are sent to notify other consumers on the
proximal network that a notification has been dismissed.

| Name | Version | Secured | Object Path |
|---|:-:|:-:|---|
| `org.alljoyn.Notification.Dismisser` | 1 | &cross; | `/notification/Dismisser` |

### Properties

| Name | Signature | Value | R/W | Description |
|---|:-:|---|---|---|
| `Version` | `q` | [`1`,`USHRT_MAX`] | R | Interface version |

### Signals

#### `Dismiss('iay')`

Dismiss signal is a sessionless signal.

#### Message Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `msgId` | `i` | [`INT_MIN`,`INT_MAX`] | ID of notification to dismiss |
| 1 | `appId` | `ay`| [RFC 4122][_r_rfc4122]-compliant GUID (as `byte[]`) | ID of producer |

#### Description

Notifies consumers that the notification has been dismissed.

### Introspect XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<node xsi:noNamespaceSchemaLocation="https://www.alljoyn.org/schemas/introspect.xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <interface name="org.alljoyn.Notification.Dismisser">
      <signal name="Dismiss">
         <arg name="msgId" type="i" direction="in"/>
         <arg name="appId" type="ay" direction="in"/>
      </signal>
      <property name="Version" type="q" access="read"/>
   </interface>
</node>
```

## Notification Service Framework Use Cases

### Device Connecting Within and Outside the TTL Period

The following figure illustrates two consumers (television and tablet)
connecting within the notification message TTL period and a third consumer
(smartphone) connecting after the TTL period. The first two consumers receive
the notification message, the third consumer does not.

**NOTE:** The _AllJoyn Core_ block represents the collective AllJoyn&trade;
framework functionality on various producers and consumers.

![Notification and TTL](/files/learn/notification-use-case-ttl-period.png)

### Notification Message Handling Based on Message Types

The following figure illustrates how a notification message overwrites a
notification message of the same type, and how notification messages of
different types can coexist using the AllJoyn&trade; framework.

**NOTE:** The _AllJoyn Core_ block represents the collective AllJoyn framework
functionality on various producers and consumers.

![Notification and Message Types](/files/learn/notification-use-case-msg-handling.png)

### Notifications Dismissed When Producer Is on Network

The following figure illustrates the flow of dismissing a notification from the
consumer until it is received by other consumers on the network.

![Notification and Dismissal](/files/learn/notification-use-case-dismissed-notification-producer.png)

[_r_attrs]: #attributes
[_r_usecases]: #notification-service-framework-use-cases
[_r_rfc4122]: http://tools.ietf.org/html/rfc4122
[_r_rfc5646]: http://tools.ietf.org/html/rfc5646
