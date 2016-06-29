# AllJoyn&trade; Onboarding Framework

The onboarding framework provides a common and simple way for new device to be
brought onto the AllJoyn&trade; network. This is especially useful for devices
that have a limited user interface, like a SmartPlug.

## How Does it Work?

Onboarding currently supports Wi-Fi only, though the system can evolve to
leverage additional protocols (like BTLE) as they become more prevalent in this
class of devices.

### Device Roles:

* _**Onboardee**_ &ndash; This is the device that needs to be brought onto the
target network.

* _**Onboarder**_ &ndash; This is the device that will provide the onboardee
with the information it needs to connect to the target network. This is
typically a mobile or desktop application.

## The Onboarding Process

### 1. Onboardee Broadcasts its SSID

When an onboardee device is first plugged in, it initiates a SoftAP network. It
then advertises an SSID prefixed with `AJ_` to indicate that this device
supports the AllJoyn&trade; onboarding service.

### 2. Onboarder Connects to Onboardee

The onboarder will scan for available AllJoyn&trade; devices by looking for
specially prefixed SSID names. A user can then choose to onboard a specific
onboardee device. The onboarder will then connect to the onboardee device.
Depending on the onboarder's platform, this may be done automatically by the
application.

### 3. Onboarder Sends Network Information to Onboardee

After connecting to the onboardee's SoftAP, the onboarder will listen for
[AllJoyn&trade; About announcements][_r_about]. Then, the onboarder will use the
onboarding service interface to send the target network information to the
onboardee device.

### 4. Switch to Target Network

Both devices then switch to the target network.

### 5. Onboarder Listens for Onboardee Device

As a final step, the onboarder will listen for receive About announcements from
the onboardee device. When received, the onboarder considers the onboardee
device fully onboarded.

![Onboarding State Diagram](/files/learn/onboarding-state-diagram.png)

## Learn More

* [Learn more about the Onboarding Interface Definition][_r_interface]
* [Download the source][_r_download], [build][_r_build] and [run the sample apps][_r_samples]
* [Learn more about the Onboarding APIs][_r_api]

[_r_about]: /learn/core/about-announcement
[_r_interface]: /learn/base-services/onboarding/interface
[_r_download]: https://allseenalliance.org/framework/download
[_r_build]: /develop/building
[_r_samples]: /develop/run-sample-apps/onboarding
[_r_api]: /develop/api-guide/onboarding
