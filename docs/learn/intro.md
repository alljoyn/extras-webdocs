# What is AllJoyn&trade;?

AllJoyn is an open-source software framework that makes it easy for developers
to write applications that can discover nearby devices, and communicate with each 
other directly without the need of the cloud. The AllJoyn framework is extremely flexible with 
many features to help make the vision of the Internet of Things come to life.

## Nearby Point-to-Point

The AllJoyn framework handles the complexities of discovering nearby devices, creating sessions 
between devices, and communicating securely between those devices.  It abstracts 
out the details of the physical transports and provides a simple-to-use API.
Multiple connection session topologies are supported, including point-to-point 
and group sessions. The security framework is flexible, supporting many mechanisms 
and trust models. And the types of data transferred is also flexible, supporting 
raw sockets or abstracted objects with well-defined interfaces, methods, properties, 
and signals.

## Flexible

One of the defining traits of the AllJoyn framework is its flexibility.  It was designed to run 
on multiple platforms, ranging from small embedded RTOS platforms to full-featured 
OSs. It supports multiple language bindings and transports. And since the AllJoyn framework is 
open-source, more can be supported in the future.

* Transports: Wi-Fi, Ethernet
* Bindings: C, C++, Obj-C, Java
* Platforms: RTOS, Arduino, Linux, Android, iOS, Windows, Mac, Unity
* Security: 
* RAM/ROM: XX/YY (for Standard) AA/BB (for Thin)

## Common language for Internet of Things

In order to fully realize the vision of the Internet of Things, devices and apps
need a common way to speak to each other.  At the AllSeen Alliance, we, along 
with all of the 50+ member companies, believe that common language is the AllJoyn framework. 
The AllJoyn framework serves as the glue to allow devices from different companies, running
on different operating systems, written with different language bindings to all
speak together, and just work.

The AllSeen Alliance, working with the community, is defining and implementing 
standard services and interfaces that solves a specific use case, such as 
[onboarding a new device for the first time][onboarding], [sending notifications][notifs], 
and [controlling a device][controlpanel]. Devices and apps can then take these 
services, integrate them into their products, and release products that are 
compatible with other devices and apps in the AllJoyn ecosystem. 
(TODO: Maybe add a bit about certification)

Beyond standard services and interfaces, an app or device can also implement 
private interfaces. So, the app can both use standard services and interfaces
to participate in the larger AllJoyn ecosystem, while at the same time, use
the AllJoyn framework to communicate with apps and devices in a private fashion. The AllJoyn
framework enables this flexibility.

(TODO, need shorthand for "apps and devices" and "services and interfaces".)

## Optional Cloud

The AllJoyn framework runs on the local network and does not require the cloud to function.
Apps and devices talk to each other direclty.  In the case where the cloud is
needed, the AllJoyn framework supports that as well through a Gateway Agent.  One main
advantage of this architecture is security. Only the Gateway Agent is direclty
connected to the Internet, so only that one device needs to be hardened.

## Momentum

The AllJoyn ecosystem continues to evolve. It is an open-source project being shepherded by 
the AllSeen Alliance along with its growing member companies of 50+. More 
standard services are being added with each release, including source for 
each service on multiple platforms. There is strong momentum, and with
your help, the AllJoyn framework can very well be the common language for the Internet
of Things.

## Next steps

Learn more about example [use-cases][].  Then mosey over to learn about the 
overall [Network Architecture][network-arch], [Software Architecture][software-arch],
[Core Framework][core], and [Service Frameworks][services].

[onboarding]: /learn/base-services/onboarding
[notifs]: /learn/base-services/notification
[controlpanel]: /learn/base-services/controlpanel

[use-cases]: /learn/use-cases
[network-arch]: /learn/network-architecture
[software-arch]: /learn/software-architecture
[core]: /learn/core-framework
[services]: /learn/base-services
