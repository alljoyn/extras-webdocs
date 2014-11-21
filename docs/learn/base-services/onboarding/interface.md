# Onboarding Interface Definition

## Release History

To access a previous version of this document, click the release version link below.

|Release version | Date | What changed |
|---|---|---|
| [14.02][onboarding-14.02] | 2/28/2014 | Onboarding interface version 1 was added. |
| 14.06 | 6/30/2014 | No updates |
|14.06 Update 1 | 9/29/2014 | * Updated the document title and Overview chapter title (changed from Specification to Definition) |
| | | * Added the release version number to the document title for version tracking. |
| | |* Added a note in the Definition Overview chapter to address the AllSeen Alliance Compliance and Certification program. |
| | |* Added a Mandatory column for method and signal parameters to support the AllSeen Alliance Compliance and Certification program. |
| 14.12 | 12/17/2014 | Cleanup to make requirements for methods and signals more clear. |

## Definition Overview

The Onboarding interface is implemented by an application on 
a target device, referred to as an onboardee. A typical 
onboardee is an AllJoyn&trade; thin client device. This 
interface allows the onboarder to send the Wi-Fi credentials 
to the onboardee to allow it to join the personal access point.

![onboarding-arch][onboarding-arch]

Figure: Onboarding service framework architecture within the AllJoyn framework

NOTE:	All methods and signals are considered mandatory to 
support the AllSeen Alliance Compliance and Certification program. 

## Onboarding Call Flows

### Onboarding call flow using an Android onboarder

The following figure illustrates a call flow for onboarding 
an onboardee using an Android onboarder.

![onboarding-android-onboarder][onboarding-android-onboarder]

Figure: Onboarding a device using an Android onboarder

### Onboarding call flow using an iOS onboarder

The following figure illustrates a call flow for onboarding 
an onboardee using an iOS onboarder.

![onboarding-ios-onboarder][onboarding-ios-onboarder]

Figure: Onboarding a device using an iOS onboarder

## Error Handling

The method calls in the Onboarding interface use the AllJoyn 
error message handling feature (ER_BUS_REPLY_IS_ERROR_MESSAGE) 
to set the error name and error message.

| Error name | Error message |
|---|---|
| `org.alljoyn.Error.OutOfRange` | Value out of range |
| `org.alljoyn.Error.InvalidValue` | Invalid value |
| `org.alljoyn.Error.FeatureNotAvailable` | Feature not available |

## Onboarding Interface

### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.alljoyn.Onboarding` | 1 | yes | `/Onboarding` |

### Properties

|Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |
| State | `n` | * 0 - Personal AP Not Configured | Read-only | The configuration state |
| | | * 1 - Personal AP Configured/Not Validated | | |
| | | * 2 - Personal AP Configured/Validating | | |
| | | * 3 - Personal AP Configured/Validated | | |
| | | * 4 - Personal AP Configured/Error | | |
| | | * 5 - Personal AP Configured/Retry | | |
|LastError| `ns` | 0 - Validated | Read-only | The last error code and error message. Error_message is the error message received from the underlying Wi-Fi layer. |
| | | * 1 - Unreachable | | |
| | | * 2 - Unsupported_protocol | | |
| | | * 3 - Unauthorized | | |
| | | * 4 - Error_message | | |

### Methods

The following methods are exposed by a BusObject that 
implements the Onboarding interface.

#### `n ConfigWifi('ssn')`

**Message arguments**

| Argument | Parameter name| Signature | List of values | Description |
|:---:|---|:---:|---|---|---|
| 0 | `SSID` | `s` | N/A | Access point SSID |
| 1 | `passphrase` | `s` | N/A | Access point passphrase | 
| 2 | `authType` | `n` | * -3 - WPA2_AUTO | Authentication type. |
| | | | * -2 - WPA_AUTO |*When it is equal to any, the onboardee must attempt all possible authentication types it supports to connect to the AP. |
| | | | * -1 - Any |*When it is equal to -3 or -2 (WPA2_AUTO or WPA_AUTO), the onboardee attempts to connect to the AP with TKIP cipher and then AES-CCMP cipher. |
| | | | * 0 - Open |*WPA_TKIP indicates WPA with TKIP cipher. |
| | | | * 1 - WEP |*WPA2_CCMP indicates WPA2 with AES-CCMP cipher. |
| | | | * 2 - WPA_TKIP |*If the value is invalid, the AllJoyn error `org.alljoyn.Error.OutOfRange` will be returned. |
| | | | * 3 - WPA_CCMP | |
| | | | * 4 - WPA2_TKIP | |
| | | | * 5 - WPA2_CCMP | |
| | | | * 6 - WPS | |

**Reply arguments**

| Argument | Parameter name| Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | `status` | `n` | The possible values for the connection result status are: |
| | | | * 1 - Current SoftAP mode will be disabled upon receipt of Connect. In this case, the Onboarder application must wait for the device to connect on the personal AP and query the State and LastError properties.|
| | | | * 2 - Concurrent step used to validate the personal AP connection. In this case, the Onboarder application must wait for the ConnectionResult signal to arrive over the AllJoyn session established over the SoftAP link.|

**Description**

Sends the personal AP information to the onboardee. When the 
authType is equal to -1 (any), the onboardee must try out 
all the possible authentication types it supports to connect to the personal AP.

**Error reply**

| Error | Description |
|---|---|
| `org.alljoyn.Error.OutOfRange` | Returned in the AllJoyn method call reply if authType parameter is invalid. |

#### `Connect`

**Message arguments**

None.

**Reply arguments**

This method does not have any reply message. It's a fire-and-forget 
method call.

**Description**

Tells the onboardee to connect to the personal AP. It is 
recommended that the onboardee use the concurrency feature, 
if it is available.

#### `Offboard`

**Message arguments**

None.

**Reoly arguments**

This method does not have any reply message. It's a fire-and-forget 
method call.

**Description**

Tells the onboardee to disconnect from the personal AP, clear 
the personal AP configuration fields, and start the soft AP mode.

#### `qa(sn) GetScanInfo`

**Message arguments**

None.

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | `age` | `q` | | Age of the scan information in minutes. It reflects how long ago the scan procedure was performed by the device. |
| 1 | `scanList` | `a(sn)` | | Scan list. It's an array of records holding SSID and authType. |

**Description**

Scans all the Wi-Fi access points in the onboardee's proximity.

**Error reply**

| Error | Description |
|---|---|
| `org.alljoyn.Error.FeatureNotAvailable` | Returned in the AllJoyn response if the device does not support this feature. |

### Signals

#### `ConnectionResult`

| Data type | Description |
|---|---|
|ns | Connect result code and message. The list of values for the result code is: |
| | * 0 - Validated |
| | * 1 - Unreachable |
| | * 2 - Unsupported_protocol |
| | * 3 - Unauthorized |
| | * 4 - Error_message |

**Description**

This signal is emitted when the connection attempt against 
the personal AP is completed. The signal is sent over the 
AllJoyn session established over the SoftAP link.

This signal will be received only if the concurrency feature 
is supported by the onboardee.

##Introspect XML

```xml
<node xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="http://www.allseenalliance.org/schemas/introspect.xsd">
   <interface name="org.alljoyn.Onboarding">
      <property name="Version" type="q" access="read"/>
      <property name="State" type="n" access="read"/>
      <property name="LastError" type="(ns)" access="read"/>
      <method name="ConfigureWifi">
         <arg name="SSID" type="s" direction="in"/>
         <arg name="passphrase" type="s" direction="in"/>
         <arg name="authType" type="n" direction="in"/>
         <arg name="status" type="n" direction="out"/>
      </method>
      <method name="Connect">
<annotation name="org.freedesktop.DBus.Method.NoReply" value="true" />
      </method>
      <method name="Offboard">
         <annotation name="org.freedesktop.DBus.Method.NoReply" value="true" />
      </method>
      <method name="GetScanInfo">
         <arg name="age" type="q" direction="out"/>
         <arg name="scanList" type="a(sn)" direction="out"/>
      </method>
      <signal name="ConnectionResult">
         <arg type="(ns)" />
      </signal>
   </interface>
</node>

```

[onboarding-14.02]: /learn/base-services/onboarding/interface-14-02

[onboarding-arch]: /files/learn/onboarding-arch.png
[onboarding-android-onboarder]: /files/learn/onboarding-android-onboarder.png
[onboarding-ios-onboarder]: /files/learn/onboarding-ios-onboarder.png