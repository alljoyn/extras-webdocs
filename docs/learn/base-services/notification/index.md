Notification
============

The AllJoyn Notification Service framework provides a common mechanism for
devices/apps to send human readable text to be displayed or otherwise rendered
(e.g. text to speech can render the text as audio). Notifications are broadcasted
on the AllJoyn network for all devices/apps to receive, and persists for a 
specified TTL defined by the producer of the notification. In addition to text,
extra meta data like audio, images, control panel objects, or other custom 
attributes can be sent; it is up to the receipient to determine the best 
way to handle and render custom attributes. Also, Notifications can be
globally dismissed on all consumers.

Concepts and Terminology
------------------------

### Producer and Consumer

Two roles exist:
* Producer. This is who sends the notification.
* Consumer. This is who receives the notification.

### Message Types

Notifications can be one of three types: Info, Warning, and Emergency. Info
should be used most of the time. When appropriate a Warning can be used to
draw more attention to the notification. Similary, Emergency can be used 
prudently in situations when extreme attention is required.

### Time-to-live (TTL)

Each message is sent with a specific Time-to-live (TTL), in units of 
milliseconds. The message will persist on the network until its TTL 
expires. If a Consumer joins the network within the TTL, he will 
receive the message.

Additionally, messages using the same Message Type overwrite one 
another. So, at any given time, no more than 1 message from each of
the 3 Message Types can be valid for a given Producer. For example, 
if a Producer sends an Info message 20 seconds after sending the 
previous Info message with a 100 second TTL, the new message will 
overwrite the previous message; Consumers from this point forward 
would only receive the new message and not the old message, even 
though the TTL of the old message did not yet expire.

### Multiple Language Support

Like all AllJoyn services, Notification supports multiple languages. The
consumer would need to provide the text string in all supported langauges.

### Dismiss

add text

### Audio and Image

Notifications allows for attributes to be specified. This gives the 
notification an extra dimension beyond just text. Most common attributes
are audio and image. The attribute can either be specified as a URL or as
an AllJoyn object path. If the URL is provdied, the consumer can optionally 
fetch the audio and/or image via the specified URL and render it locally as
appropriate. If the object path is provided, the consumer can optionally

### Control Panel

A special attribute is the control panel object path. The producer fills
out this attribute to provide extra direction to the consumer. When the
consumer receives this notificaiton, if it supports control panel, it
is encouraged to fetch the control panel at the object path and render
it to the user. Typically this is done to allow the consumer to perform
an action associated with a notification. 

An example is if the oven has been left on for some, in addition to 
sending a notification, it can include a control panel to be rendered 
to provide to the user the option of turning off the oven.

### Custom Attributes

### More?

deviceid, appid, sender

How It works?
-------------

Learn More
----------

* [Learn more about the Notification Interface Definition][notif-interface]
* [Download the SDK][download], [build][build] and 
  [run the sample apps][sample-apps]
* [Learn more about the APIs][api-guide]

[notif-interface]: /learn/base-services/notification/interface
[download]: /download
[build]: /develop/building
[sample-apps]: /develop/run_sample_apps/notification
[api-guide]: /develop/api-guides