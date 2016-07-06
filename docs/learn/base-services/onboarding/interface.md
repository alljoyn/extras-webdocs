# AllJoyn&trade; Onboarding Framework Interface Definition

## Overview

The Onboarding interface is implemented by an application on a target device,
referred to as an onboardee. A typical onboardee is an AllJoyn&trade; thin
client device. This interface allows the onboarder to send a set of network ID
and credentials to the onboardee to allow it to join a target network.

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

| Name                                    | Message                            |
|:----------------------------------------|:-----------------------------------|
| `org.alljoyn.Error.OutOfRange`          | Value provided is out of range     |
| `org.alljoyn.Error.InvalidValue`        | Value provided is invalid          |
| `org.alljoyn.Error.FeatureNotAvailable` | Requested feature is not available |

## Onboarding Interface

| Name                     | Version | Secured | Path          |
|:-------------------------|:-------:|:-------:|:--------------|
| `org.alljoyn.Onboarding` |    1    | &check; | `/Onboarding` |

### Properties
| Name        | Signature | Values                                        | R/W | Description                 |
|:------------|:---------:|:----------------------------------------------|:---:|:----------------------------|
| `Version`   |    `q`    | [`1`, `USHRT_MAX`]                            |  R  | Interface version           |
| `State`     |    `n`    | _see_ [`State` table](#-state-values)         |  R  | Configuration state         |
| `LastError` |   `ns`    | _see_ [`LastError` table](#-lasterror-values) |  R  | Last error code and message |

#### `State` Values
| Value | Description                                        |
|:-----:|:---------------------------------------------------|
|   0   | Configuration not set                              |
|   1   | Configuration not validated                        |
|   2   | Configuration is being validated                   |
|   3   | Configuration successfully validated               |
|   4   | There is an error with the configuration           |
|   5   | There was an error and the system is in retry mode |

#### `LastError` Values
| Value | Description          |
|:-----:|:---------------------|
|   0   | Connection Validated |
|   1   | Network Unreachable  |
|   2   | Unsupported Protocol |
|   3   | Not authorized       |
|   4   | Error                |

### Methods

The following methods are exposed by a `BusObject` that
implements the Onboarding interface.

### `n ConfigureWifi('ssn')`

#### Message Parameters

| Index | Name         | Signature | Values                                      | Description                          |
|:-----:|:-------------|:---------:|:--------------------------------------------|:-------------------------------------|
|   0   | `SSID`       |    `s`    | Valid SSID                                  | Target network ID                    |
|   1   | `passphrase` |    `s`    | Valid passphrase                            | Target network passphrase            |
|   2   | `authType`   |    `n`    | _see_ [`authType` table](#-authtype-values) | Target network authentication method |

#### `authType` Values
| Value | Description                    |
|:-----:|:-------------------------------|
|  -3   | WPA2 (auto-determine protocol) |
|  -2   | WPA (auto-determine protocol)  |
|  -1   | ANY                            |
|   0   | OPEN                           |
|   1   | WEP                            |
|   2   | WPA with TKIP protocol         |
|   3   | WPA with CCMP protocol         |
|   4   | WPA2 with TKIP protocol        |
|   5   | WPA2 with CCMP protocol        |
|   6   | WPS                            |

#### Reply Parameters

| Index | Name     | Signature | Values                                  | Description                     |
|:-----:|:---------|:---------:|:----------------------------------------|:--------------------------------|
|   0   | `status` |    `n`    | _see_ [`status` table](#-status-values) | Operational status of onboardee |

#### `status` Values
| Value | Description                                                          |
|:-----:|:---------------------------------------------------------------------|
|   1   | Concurrent connection (i.e. fast channel switching) is not supported |
|   2   | Concurrent connection is supported                                   |

#### Description

Sends the target network information to the onboardee. When the authType is set
to `ANY`, the onboardee must try out all the possible authentication types it
supports to connect to the target network.

#### Error Reply

| Error                            | Description             |
|:---------------------------------|:------------------------|
| `org.alljoyn.Error.OutOfRange`   | unrecognized `authType` |
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

| Index | Name       | Signature | Values                                             | Description                              |
|:-----:|:-----------|:---------:|:---------------------------------------------------|:-----------------------------------------|
|   0   | `age`      |    `q`    | [`1`, `USHRT_MAX`]                                 | Minutes elapsed since scan was performed |
|   1   | `scanList` |  `a(sn)`  | SSID + _see_ [`authType` table](#-authtype-values) | List of found networks                   |

#### Description

Scans all the Wi-Fi access points in the onboardee's proximity.

#### Error Reply

| Error                                   | Description                        |
|:----------------------------------------|:-----------------------------------|
| `org.alljoyn.Error.FeatureNotAvailable` | `GetScanInfo` method not supported |

### Signals

### `ConnectionResult(ns)`

ConnectionResult signal is not a Sessionless signal.

#### Message Parameters

| Index | Name            | Signature | Values                                        | Description                  |
|:-----:|:----------------|:---------:|:----------------------------------------------|:-----------------------------|
|   0   | `resultCode`    |    `n`    | _see_ [`LastError` table](#-lasterror-values) | Result of connection attempt |
|   1   | `resultMessage` |    `s`    |                                               | Descriptive message          |

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
