# Alljoyn&trade; Notification Framework

The AllJoyn&trade; Notification Framework provides a common way for devices to
send and receive information intended for presentation to the user.

Notifications are broadcast to all connected devices on the AllJoyn&trade;
network. A notification persists for a specified duration. Message content
can include text, audio, image, or AllJoyn&trade; Control Panel objects, as
well as custom-defined data.

The notification framework leverages the power of AllJoyn&trade; Sessionless
Signals to deliver messages across the network.

## Concepts and Terminology

### Roles

* _**Producer**_ &ndash; The device that _sends_ the notification.
* _**Consumer**_ &ndash; The device that _receives_ the notification.

### Message Types

* _**Info**_ &ndash; The most general and most commonly used message type.
* _**Warning**_ &ndash; Can be used to draw more attention to the message.
* _**Emergency**_ &ndash; To be used in the most extreme circumstances, where
lack of action may result in harm to people or property.

### TTL (Time to Live)

Each notification is sent with a prescribed TTL, in seconds. The notification
will persist on the network (within the producer) until its TTL expires.
Consumers that connect to the network after a notification is sent will receive
the notification if the TTL has not expired.

### One Notification per Message Type per Producer

Notifications are not queued. Only one notification of a specific message type
is persisted within the producer at a time. When a new notification is sent,
any existing notification with an equivalent message type is overwritten, even
if its TTL has not expired.

### Dismissal

A notification may be dismissed:

* _**Locally**_ &ndash; An individual consumer removes the notification from its
UI. The notification remains available to other consumers on the network.

* _**Connected**_ &ndash; A consumer or producer sends a message to all
consumers to remove the notification from their respective UIs. The notification
remains on the producer and may be sent to consumers that connect before the TTL
expires.

* _**Producer**_ &ndash; A consumer sends a message the producer to cease
broadcasting the notification. The notification will be removed, and new
consumers will not receive it when they connect to the network.

### Language Support

Notification content can be provided in multiple languages. The producer
provides content in every language it supports. The consumer then selects the
content most appropriate for its needs.

### Attributes for Audio and Image Content

Attributes provide a flexible means of supplementing the content of a
notification with more than text.

Support is pre-defined for supplying icon and audio content. Either can be
provided via AllJoyn&trade; Object Path or URL. On receiving the notification,
the consumer may acquire the icon and/or prompt and present it to the user
alongside the text content.

### Control Panel Integration

Notifications can also direct consumers to an AllJoyn&trade; Control Panel
object. If the consumer supports the Control Panel framework, it can present the
controls to the user for immediate action in response to the notification.

A good example would involve an oven appliance that's been left on for an long
time and sends a notification to warn the user. With control panel support, the
consumer of this message can present the controls necessary to turn off the oven
without requiring the user to find the necessary controls manually.

### Custom Attributes

Message attributes are key-value pairs. They can be used for just about anything
that might improve context or control for the user. An AllJoyn&trade;
application can add any number of custom attributes to a notification. For these
attributes to be useful, consumers must be aware of them. Thus, custom
attributes are best suited to systems where the producer and consumer are either
the same device or made by the same vendor.

## Learn More

* [Learn more about the Framework Interface Definition][_r_interface]
* [Download the source][_r_download], [build][_r_build] and
  [run the sample apps][_r_samples]
* [Learn more about the APIs][_r_api]

[_r_interface]: /learn/base-services/notification/interface
[_r_download]: https://allseenalliance.org/framework/download
[_r_build]: /develop/building
[_r_samples]: /develop/run-sample-apps/notification
[_r_api]: /develop/api-guide/notification
