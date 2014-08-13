# Network Architecture

The AllJoyn&trade; framework runs on the local network. It enables devices and apps to advertise and discover each other. This section explains the network architecture and the relationship between various AllJoyn components.

## Apps and Routers

The AllJoyn framework comprises AllJoyn Apps and AllJoyn Routers, or Apps and Routers for short. Apps communicate with Routers and Routers communicate with Apps. Apps can only communicate with other Apps by going through a Router.

Apps and Routers can live on the same physical device, or on different devices. From an AllJoyn perspective, it doesn't matter.  In reality, three common topologies exist:

1. An App uses its own Router. In this case, the Router is called a "Bundled Router" as it is bundled with the App.  AllJoyn Apps on mobile OSes like Android and iOS and desktop OS like Mac OSX and Windows generally fall in this group.

2. Mulitple Apps on the same device use one Router.  In this case, the Router is called a "Standalone Router" and it typically runs in a background/service process.  This is common on Linux systems where the AllJoyn Router runs as a daemon process and other AllJoyn apps connect to the Standalone Router. By having multiple apps on the same device use the common AllJoyn Router, the device consumes less overall resources.

3. An App uses a Router on a different device. Embedded devices (which use the Thin variant of the AllJoyn framework, more on this later) typically fall in this camp as the embedded device typically does not have enough CPU and memory to run the AllJoyn router.

![apps-and-routers][apps-and-routers]

## Transports

The AllJoyn framework runs on the local network.  It currently supports Wi-Fi and Ethernet, but since the AllJoyn software was written to be transport-agnostic and since the AllJoyn system is an evolving open-source project, support for more transports can be added in the future.

Additionally, bridge software can be created to bridge the AllJoyn framework to other systems like Zigbee, Z-wave, or the cloud. In fact, a Working Group is working on adding a Gateway Agent as a standard AllJoyn service.

[apps-and-routers]: /files/learn/apps-and-routers.png
