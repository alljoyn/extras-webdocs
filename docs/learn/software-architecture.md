# Software Architecture

The AllJoyn&trade; network comprises AllJoyn Applications and AllJoyn Routers.

The AllJoyn Application comprises the following components:
* [AllJoyn App Code][app-code]
* [AllJoyn Service Frameworks Libraries][services]
* [AllJoyn Core Library][core]

The [AllJoyn Router][router] can either run as standalone or is sometimes bundled with the AllJoyn Core Library.

![alljoyn-software-architecture][alljoyn-software-architecture]

## AllJoyn Router

The AllJoyn router routes AllJoyn messages between AllJoyn Routers and Applications.  It handles things like XYZ (TODO).

## AllJoyn Core Library

The AllJoyn Core Library provides the lowest level set of APIs to interact with the AllJoyn network.  It provides direct access to:

* Advertisements and discovery
* Session sreation
* Interface defintion of methods, properties, and signals
* Object creation and handling

Developers use these APIs to implement AllJoyn service frameworks, or to implement private interfaces.

[Learn more about AllJoyn Core Frameworks][learn-core].

## AllJoyn Service Frameworks Libraries

The AllJoyn Service Frameworks implement a set of common services, like onboarding, notification, or control panel. By using the common AllJoyn service frameworks, apps and devices can properly interoperate with each other to perform a specific functionality.

Service frameworks are broken out into AllJoyn Working Groups:

* [Base Services][base-services]
  * [Onboarding][onboarding]. Provide a consistent way to bring a new device onto 
    the Wi-Fi network.

  * [Configuration][configuration]. Allows one to configure certain attributes of 
    an application/device, such as its friendly name.

  * [Notifications][notifications]. Allows text-based notifications to be sent and 
    received by devices on the AllJoyn network. Also supports audio and images
    via URLs.

  * [Control Panel][controlpanel]. Allows devices to advertise a virtual control
    panel to be controlled remotely.

* [Lighting Service][lighting-service]
  * [Lamp][lamp]
  * [Lighting Controller][lighting-controller]

Developers are encouraged to use AllJoyn services where possible. If an existing service is not available, then the developer is encouraged to work with the AllSeen Alliance to create a standard service.  In some cases, using private services and intefaces makes the most sense; howerver, those services would not be able to interoperate and take advantage of the larger AllJoyn ecosystem of devices and apps.

[Learn more about AllJoyn Service Frameworks][learn-services].

## AllJoyn App Code

This is the application logic of the AllJoyn application. It can be programmed to either the AllJoyn Service Frameworks Libraries, which provide higher level functionality, or the AllJoyn Core Library, which provides direct access to the AllJoyn Core APIs.

## Thin and Standard

The AllJoyn framework provides two variants:
* Standard.  For non-embedded devices, like Android, iOS, Linux
* Thin.  For resource-constrained embedded devices, like Arduino, ThreadX, Linux with limited memory

![alljoyn-standard-and-thin][alljoyn-standard-and-thin]

# Programming Models

Typically, applications will be written using the AllJoyn Service Framework APIs so that
the applications can be compatible with devices using the same Service Frameworks.

If an application wishes to implement its own service, it can do so by programming
directly to the AllJoyn Core APIs. When doing so, it is recommended to follow the 
Events and Actions convention to enable ad hoc interactions between other AllJoyn
devices.

The application can use both the Service Framework and Core APIs side by side.

[Learn more about Events and Actions][events-and-actions]

[learn-core]: /learn/core-framework
[learn-services]: /learn/base-services

[app-code]: #alljoyn-app-code
[services]: #alljoyn-service-frameworks-libraries
[core]: #alljoyn-core-library
[router]: #alljoyn-router

[events-and-actions]: /learn/core-framework/events-and-actions
[alljoyn-software-architecture]: /files/learn/alljoyn-software-architecture.png
[alljoyn-standard-and-thin]: /files/learn/alljoyn-standard-and-thin.png

[base-services]: /learn/base-services
[onboarding]: /learn/base-services/onboarding
[configuration]: /learn/base-services/configuration
[notifications]: /learn/base-services/notifications
[controlpanel]: /learn/base-services/controlpanel

[lighting-service]: /learn/lighting-services
[lamp]: /learn/lighting-services/lamp
[lighting-controller]: /learn/lighting-services/lighting-controller
