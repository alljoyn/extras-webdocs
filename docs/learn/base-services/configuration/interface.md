# Configuration Interface Definition

## Release History

To access a previous version of this document, click the release version link below.

|Release version | Date | What changed |
|---|---|---|
| [14.02][config-14.02] | 2/28/2014 | Config interface version 1 was added. |
| 14.06 | 6/30/2014 | No updates |
| 14.06 Update 1 | 9/29/2014 | * Updated the document title and Overview chapter title (changed from Specification to Definition). |
| | | * Added the release version number to the document title for version tracking. |
| | | * Added a note in the Definition Overview chapter to address the AllSeen Alliance Compliance and Certification program. |
| | | * Added a Mandatory column for method and signal parameters to support the AllSeen Alliance Compliance and Certification program. |
| | | * Added configData output parameter information to the GetConfigurations method. |

## Definition Overview

The Configuration service framework exposes device-specific 
methods such as restart and factory reset, device passcode, 
and device-specific settable attributes such as friendly name 
and default language. It is expected that OEM of the device 
would take this service framework and bundle it with a single 
application (system app). The enforcement of singleton instance 
of the Configuration service framework must be performed using 
explicit guidelines provided to OEMs and application developers 
regarding the usage of the Configuration service framework.

The following figure  illustrates the relationship between 
software stack on the device hosting the AllJoyn&trade; service 
framework and the device hosting the AllJoyn client application.

![config-arch][config-arch]

Figure: Configuration service framework architecture within the AllJoyn framework

The figure describes the scope of Configuration service 
framework and About feature in a multiple applications-per-device 
scenario. The following system behavior should be noted:

* The system application bundles the Configuration service 
framework and provides a remote mechanism to invoke device-specific 
configuration.
* It could be that OEMs provide equivalent (as exposed by the 
Configuration service framework) functionality via the local 
user interface.

NOTE: All methods and signals are considered mandatory to support 
the AllSeen Alliance Compliance and Certification program. 
Individual parameters for a given method or signal may be considered 
mandatory or optional, and are specified accordingly in this document.

## Typical Call Flows

This section highlights call flows that involve the Configuration 
service framework. The system app on the AllJoyn service framework 
device is involved in these call flows.

### Device configuration change

The following figure illustrates a sample call flow where an Alljoyn 
app executing on an AllJoyn client device discovers the Configuration 
service framework via announcement and subsequently performs methods 
as specified in the Config interface to retrieve and update configuration 
data. See [Config Interface][config-interface] for complete details.

![config-device-config][config-device-config]

Figure: Device configuration change call flow

### Factory reset

The following figure illustrates a sample call flow where an Alljoyn 
app executing on an AllJoyn client device discovers the Configuration 
service framework via announcement, and subsequently performs methods 
as specified in the Config interface to retrieve the configuration 
data and perform factory reset action if needed. See [Config Interface][config-interface] 
for complete details.

![config-device-factory-reset][config-device-factory-reset]

Figure: Device factory reset call flow

### Error handling

The method calls in the Config interface use the AllJoyn error 
message handling feature (ER_BUS_REPLY_IS_ERROR_MESSAGE) to set 
the error name and error message.

| Error name | Error message |
|---|---|
| org.alljoyn.Error.InvalidValue | Invalid value |
| org.alljoyn.Error.FeatureNotAvailable | Feature not available |
| org.alljoyn.Error.LanguageNotSupported | The language specified is not supported |

## Config Interface

### Interface name

| Interface name | Version | Secured | Object path |
|---|---|---|---|
| org.alljoyn.Config | 1 | yes | /Config |

### Properties

|Property name | Signature | List of values | Writable | Description |
|---|---|---|---|---|
| Version | q | Positive integers | no | Interface version number |

### Methods

The following methods are exposed by the object that implements 
the org.alljoyn.Config interface.

#### FactoryReset

**Inputs**

None.

**Output**

None.

**Description**

Direct the device to disconnect from the personal AP, clear all 
previously configured data, and start the softAP mode.

Some devices may not support this feature. In such a case, 
the error org.alljoyn.Error.FeatureNotAvailable will be returned 
in the AllJoyn response.

#### SetPasscode

**Inputs**

| Parameter name| Mandatory | Signature | List of values | Description |
|---|---|---|---|---|
| daemonRealm | no | s | N/A | Identifies the daemon's identity for secure access. This parameter is currently ignored by the Configuration service framework. |
| newPasscode | no | s | N/A | Passphrase that will be utilized for the secure Config interface. |

**Output**

None.

**Description**

Update the passcode to be used for the org.alljoyn.Config interface 
which is secure. The default passcode is 000000 until it is overwritten 
by `SetPasscode` method.

#### GetConfigurations

**Inputs**

| Parameter name| Mandatory | Signature | List of values | Description |
|---|---|---|---|---|
| languageTag | no | s | IETF language tags specified by RFC 5646 | Language tag used to retrieve Config fields. |

**Outputs**

| Parameter name| Mandatory | Return signature | Description |
|---|---|---|---|
| configData | no | a{sv} | Returns configuration fields in the form of dictionary. See [Configuration map fields][config-map-fields] for the default set of Configuration map fields. |

**Description**

Return all the configurable fields specified within the scope of 
the Config interface.

Error handling regarding the input parameter:

* If language tag is not specified (i.e., ""), configuration 
fields based on device's default language are returned.
* If a language tag is not supported by the device, AllJoyn 
error org.alljoyn.Error.LanguageNotSupported is returned.

#### UpdateConfigurations

**Inputs**

| Parameter name | Mandatory | Signature | List of values | Description |
|---|---|---|---|---|
| languageTag | no | s | IETF language tags specified by RFC 5646 | Identifies the language tag. |
| configMap | no | a{sv} | See [Configuration map fields][config-map-fields] | Set of configuration fields being updated. |

**Outputs**

None.

**Description**

Provide a mechanism to update the configuration fields.
* Whenever there is an error in updating the value for a specific 
field in the configMap, the error org.alljoyn.Error.InvalidValue 
will be returned. The error message will contain the field name 
of the invalid field.
* If a language tag is not supported by the device, the error 
org.alljoyn.Error.LanguageNotSupported is returned.

#### ResetConfigurations

**Inputs**

| Parameter name| Mandatory | Signature | List of values | Description |
|---|---|---|---|---|
| languageTag | no | s | IETF language tags specified by RFC 5646 | Identifies the language tag. |
| fieldList | no | as | N/A | List of fields or configuration items that are being reset. |

**Outputs**

None.

**Description**

Provide a mechanism to reset (i.e., value is restored to factory 
default but the field itself is retained) values of configuration fields.

* Whenever there is an error related to fieldList, the error 
org.alljoyn.Error.InvalidValue will be returned. The error 
message will contain the field name of the invalid field.
* If a language tag is not supported by the device, the error 
org.alljoyn.Error.LanguageNotSupported is returned.

#### Configuration map fields 

The following table lists the known configuration fields that 
are part of the configMap parameter fields. The OEM or 
application developer can add additional fields.

| Field name| Mandatory | Localized | Signature | Description |
|---|---|---|---|---|
| defaultLanguage | yes | no | s | Default language supported by the device. IETF language tags specified by RFC 5646. |
|  |  |  |  | * If the parameter is not set as per the RFC, the error org.alljoyn.Error.InvalidValue is returned. |
|  |  |  |  | * If a language tag is not supported by the device, the error org.alljoyn.Error.LanguageNotSupported is returned. |
|  |  |  |  | In this case, the default language on the device is unchanged. |

## Introspection XML

```
<node name="/Config" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

xsi:noNamespaceSchemaLocation="http://www.allseenalliance.org/schemas/introspect.xsd">

   <interface name="org.alljoyn.Config">
      <property name="Version" type="q" access="read"/>
      <method name="FactoryReset">
         <annotation name="org.freedesktop.DBus.Method.NoReply" value="true"/>
      </method>
      <method name="Restart">
         <annotation name="org.freedesktop.DBus.Method.NoReply" value="true"/>
      </method>
      <method name="SetPasscode">
         <arg name="daemonRealm" type="s" direction="in"/>
         <arg name="newPasscode" type="ay" direction="in"/>
      </method>
      <method name="GetConfigurations">
         <arg name="languageTag" type="s" direction="in"/>
         <arg name="configData" type="a{sv}" direction="out"/>
      </method>
      <method name="UpdateConfigurations">
         <arg name="languageTag" type="s" direction="in"/>
         <arg name="configMap" type="a{sv}" direction="in"/>
      </method>
      <method name="ResetConfigurations">
         <arg name="languageTag" type="s" direction="in"/>
         <arg name="fieldList" type="as" direction="in"/>
      </method>
   </interface>
</node>
```


[config-14.02]: /learn/base-services/configuration/interface-14-02

[config-arch]: /files/learn/config-arch.png
[config-device-config]: /files/learn/config-device-config.png
[config-device-factory-reset]: /files/learn/config-device-factory-reset.png

[config-interface]: #config-interface
[config-map-fields]: #configuration-map-fields