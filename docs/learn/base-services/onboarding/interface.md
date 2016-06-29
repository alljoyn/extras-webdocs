# Onboarding Interface Definition
## Overview
The Onboarding interface is implemented by an application on a target device,
referred to as an onboardee. A typical onboardee is an AllJoyn&trade; thin
client device. This interface allows the onboarder to send the network ID and
credentials to the onboardee to allow it to join the target network.

![Onboarding Architecture Diagram](/files/learn/onboarding-arch.png)

**NOTE:** All methods and signals are considered mandatory to support the
AllSeen Alliance Compliance and Certification program.

## Call Flows

### Using an Android Onboarder

The following diagram illustrates a call flow for onboarding an onboardee using
an Android onboarder.

![Android Call Flow Diagram](/files/learn/onboarding-android-onboarder.png)

### Using an iOS Onboarder

The following diagram illustrates a call flow for onboarding an onboardee using
an iOS onboarder.

![iOS Call Flow Diagram](/files/learn/onboarding-ios-onboarder.png)

## Error Handling

The method calls in the Onboarding interface use the AllJoyn&trade; error
message handling feature (`ER_BUS_REPLY_IS_ERROR_MESSAGE`) to set the error name
and error message.

| Name | Message |
|---|---|
| `org.alljoyn.Error.OutOfRange` | Value out of range |
| `org.alljoyn.Error.InvalidValue` | Invalid value |
| `org.alljoyn.Error.FeatureNotAvailable` | Feature not available |

## Interface

|Name | Version | Secured | Path |
|---|:-:|:-:|---|
| `org.alljoyn.Onboarding` | 1 | yes | `/Onboarding` |

### Properties
| Name | Signature | Values | R/W | Description |
|---|:-:|---|:-:|---|
| Version | `q` | [`1`, `SHRT_MAX`] | `R` | Interface version |
| State | `n` | `OBState` | `R` | Configuration state |
| LastError | `ns` | `OBValidationState` | `R` | Last error code and message |

### Methods

The following methods are exposed by a `BusObject` that
implements the Onboarding interface.

### `n ConfigureWifi('ssn')`

#### Message Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `SSID` | `s` | Valid SSID | Target network ID |
| 1 | `passphrase` | `s` | Valid passphrase | Target network passphrase |
| 2 | `authType` | `n` | `OBAuthType` | Target network authentication method |

#### Reply Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `status` | `n` | `OBConcurrency` |  Operational status of onboardee |

#### Description

Sends the personal AP information to the onboardee. When the authType is set to
`ANY`, the onboardee must try out all the possible authentication types it
supports to connect to the personal AP.

#### Error Reply

| Error | Description |
|---|---|
| `org.alljoyn.Error.OutOfRange` | unrecognized `authType` |
| `org.alljoyn.Error.InvalidValue` | `passphrase` is invalid |

### `Connect`

#### Message Parameters

None.

#### Reply Parameters

None.

#### Description

Instructs onboardee to connect to the target network. The onboardee should use
the concurrency feature, if available.

### `Offboard`

#### Message Parameters

None.

#### Reply Parameters

None.

#### Description

Instructs onboardee to disconnect from the target network, clear the network
configuration fields, and return to SoftAP mode.

### `qa(sn) GetScanInfo`

#### Message Parameters

None.

#### Reply Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `age` | `q` | [`1`, `SHRT_MAX`] | Minutes elapsed since scan was performed |
| 1 | `scanList` | `a(sn)` | SSID, `OBAuthType` | List of found networks |

#### Description

Scans all the Wi-Fi access points in the onboardee's proximity.

#### Error Reply

| Error | Description |
|---|---|
| `org.alljoyn.Error.FeatureNotAvailable` | Device does not support `GetScanInfo` |

### Signals

### `ConnectionResult(ns)`

ConnectionResult signal is not a Sessionless signal.

#### Message Parameters

| Index | Name | Signature | Values | Description |
|:-:|---|:-:|---|---|
| 0 | `resultCode` | `n` | `OBValidationState` | Result of connection attempt |
| 1 | `resultMessage` | `s` | | Descriptive message |

#### Description

This signal is emitted when the attempt to connect to the target network is
completed. The signal is sent over the AllJoyn&trade; session established over
the SoftAP link.

This signal will be received only if the concurrency feature is supported by the
onboardee.

## Introspect XML

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
