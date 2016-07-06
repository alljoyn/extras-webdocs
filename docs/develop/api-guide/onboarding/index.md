# AllJoyn&trade; Onboarding Framework API Guide

* [Java](java)
* [Objective-C](objc)

## Best Practices: Onboardee

### Perform a Wi-Fi Scan Prior to Entering SoftAP Mode

Prior to starting up as a SoftAP, the device should scan and store a list of the
nearby APs. This allows for an onboarder to make a call to `GetScanInfo`. This
helps remove errors for the end user because both sides of the exchange can
validate that each device detects the target network.

### Add `AJ_` Prefix to the SoftAP SSID

When switching the device into a SoftAP, the SSID should be prefixed with `AJ_`.
This allows onboarders to show a short list of the nearby devices that are
eligible to be onboarded to the target network.

### Use the AllJoyn&trade; Configuration Framework

When there are multiple devices of the same type on the network, the user should
be able to use a custom name to distinguish one from another (e.g. "Kitchen
Fridge", "Man-Cave Altar of Refreshment", or "Bug-Out Shelter Emergency Cooling
Store").

Adding Configuration into the onboardee can also expose a set of initial values
that are customized to the device to allow any third-party application to
discover these input options and show a UI for end users.

### Announce Again On Connecting to the Target Network

Use AllJoyn&trade; About to send an `announce` once connected to the target
network. This will ensure that other devices on the network will see the
onboardee as soon as possible.

### One Onboardee (Application) per Device

Running multiple onboardee applications can cause unpredictable behavior since
the primary feature involves changing global device settings.

## Best Practices: Onboarder

### Allow User to Set a Hidden Target Network

Provide a means for the user to enter hidden network information, including
SSID and security settings. Hidden networks will not be detected by Wi-Fi scans.

### Allow User to Customize the Onboardee

As it is best practice for onboardees to support the AllJoyn&trade;
Configuration Framework, so should onboarders provide the user with the means to
view and modify the available configuration data.

The absolute minimum level of support should include the ability to set a custom
name for the onboardee.

### Security 2.0

The onboarding sample application demonstrates the process for claiming a
factory-reset application.  Security 2.0 is currently in developer preview. You
can refer to the process in the high level design document.  

[Security 2.0 High Level Design (HLD)](/learn/core/security2_0/hld)
