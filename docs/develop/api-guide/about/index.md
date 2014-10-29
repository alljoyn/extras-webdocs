# About API Guide

* [Android][about-android]
* [Linux][about-linux]
* [iOS][about-ios]
* [Thin Linux][about-thin-linux]

## Common Best Practices

### Handling BusListener::BusDisconnected

If you are writing an app intended for a platform that is 
running a standalone router (such as OpenWRT or Linux), 
it is recommended to register a Bus Listener and implement 
BusListener::BusDisconnected to support scenarios when the 
connection between the AllJoyn&trade; app and the AllJoyn router is lost.

This can happen in the following scenarios:

* The standalone router is restarted (manually or otherwise)
* The Onboarding service framework forces a restart of the 
standalone router after onboarding a device.

After BusListener::BusDisconnected is invoked:
* Clear now-obsolete application data such as session IDs.
* Shut down any service frameworks being used.
* Create a new bus attachment.
* Periodically invoke BusAttachment::Connect until it returns successfully.

After the AllJoyn router restarts and the new bus attachment is 
reconnected, any sessions the old bus attachment was previously 
a part of must be re-established to resume proper function. 
Likewise, any service frameworks must be restarted using the 
reconnected bus attachment.

The process is summarized below:
1. Verify the BusListener implements BusListener::BusDisconnected.
2. When BusListener::BusDisconnected is invoked, make sure to:
  1. Clear any now-obsolete application data, such as session IDs. 
  2. Shut down any service frameworks being used.
  3. Create a new bus attachment.
  4. Continually try to reconnect the bus attachment. 
  5. Once reconnected:
    1. Set listeners.
    2. Bind session ports as needed.
    3. Restart service frameworks.
    4. Connect to any pre-established sessions as needed.


## Best Practices (across all services)

### When to call the AboutService Announce() method

When using the About feature, the Announce() method should 
be invoked once all AllJoyn interfaces have been registered 
and whenever the data structure changes. A few scenarios 
for calling the Announce() method follow:

* Some embedded devices have certain functionality enabled 
through the device's Settings options. After any change to 
activate the AllJoyn interfaces, the Announce() method should 
be called again.
* Some embedded devices support configuring a name or other 
values that a user will enter. Each time there is a change, 
a call to Announce() should be made.

### How the AboutClient receives information

The AboutClient registers for an AllJoyn Signal and does 
not need to poll, creating and then registering the AnnounceListener 
is all that is required. The AboutClient object should exist the 
lifetime of the application in order to receive up to date information.

For more information on AboutClient, refer to the About API Guide 
listed at the top of the page for the platform you are targeting.

### Generating a unique appId/unique ID

The About feature has a mandatory field that requires a unique 
value be set per the application using the AboutService class.

This unique ID should follow the Internet Engineering Task Force 
(IETF) RFC 4122. This means the appId will always be 128 bits in 
length. When setting the value, there is no need to use the "-" hyphen 
symbol; use the raw hex value and store it into a byte array.

The generation of the AppId can occur through various online 
offerings. Perform a search for "GUID generator" on various 
online search engines to aid in the generation of the appId.

NOTE: If two or more applications use the same appId, it does 
not hinder the AboutService or its ability to interact with an 
AboutClient. If an application using the AboutClient relies on 
the appId to display information, it may render incorrect results 
due to the non-unique appId.

### When to send an Icon

Although not required, the About feature can support broadcasting 
and receiving an icon. The icon can be used by the applications to 
help visually identify the embedded device.

The recommended size for this icon is 72 x 72 pixels, but can be 
larger as long as the total number of bytes is less than the 
maximum supported by the AllJoyn framework in a single `BusMethod` 
call (ALLJOYN_MAX_ARRAY_LEN, 131072 bytes). If the icon image 
size is larger than ALLJOY_MAX_ARRAY_LEN, provide a valid URL 
when initializing the AboutIconService.

In order for the icon to correctly render, it is important to 
set the mimeType to the image type as some devices require this 
to show the icon on a display.

### Ping discovered devices

NOTE: The BusAttachment.Ping option is part of the 
AllSeen Alliance 14.06 release in the Announcement interface.

It is possible to receive an Announce signal with information 
about a bus name that is stale. Use the BusAttachment.Ping 
method to discover if the name is still present before trying 
to join a session with the remote bus.

A short timeout can be specified when calling the `BusAttachment.Ping` 
method. This can make applications more responsive since they 
will wait as long for a JoinSession timeout failure.



[about-android]: /develop/api-guide/about/android
[about-linux]: /develop/api-guide/about/linux
[about-ios]: /develop/api-guide/about/ios
[about-thin-linux]: /develop/api-guide/about/thin-linux
[api-guide]: /docs/develop/api-guide/index