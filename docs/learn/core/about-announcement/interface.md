# About Interface Definition

## Release History

To access a previous version of this document, click the release version link below.

|Release version | Date | What changed |
|---|---|---|
|[14.02][about-14.02] | 2/28/2014 | About interface version 1 was added. |
|14.06 | 6/30/2014 | No updates. |
|14.06 Update 1 | 9/29/2014 | * Updated the document title and Overview chapter title (changed from Specification to Definition) |
| | | * Added the release version number to the document title for version tracking. |
| | | * Added a note in the Definition Overview chapter to address the AllSeen Alliance Compliance and Certification program. |
| | | * Added a Mandatory column for method and signal parameters to support the AllSeen Alliance Compliance and Certification program. |

## Definition Overview

The About interface is to be implemented by an application 
on a target device. This interface allows the app to advertise 
itself so other apps can discover it. The following figure 
illustrates the relationship between a client app and a service app.

![about-arch][about-arch]

Figure: About feature architecture within the AllJoyn&trade; framework

NOTE: All methods and signals are considered mandatory to 
support the AllSeen Alliance Compliance and Certification program. 
Individual parameters for a given method or signal may be considered 
mandatory or optional, and are specified accordingly in this document.

## Discovery

A client can discover the app via an announcement which is a 
sessionless signal containing the basic app information like 
app name, device name, manufacturer, and model number. The 
announcement also contains the list of object paths and service 
framework interfaces to allow the client to determine whether 
the app provides functionality of interest.

In addition to the sessionless announcement, the About interface 
also provides the
on-demand method calls to retrieve all the available metadata 
about the app that are not published in the announcement.

## Discovery Call Flows

### Typical discovery flow

The following figure illustrates a typical call flow for a client 
to discover a service app. The client merely relies on the 
sessionless announcement to decide whether to connect to the 
service app to use its service framework offering.

![about-typical-discovery][about-typical-discovery]

Figure: Typical discovery flow (client discovers a service app)

### Nontypical discovery flow

The following figure illustrates a call flow for a client to 
discover a service app and make a request for more detailed information.

![about-nontypical-discovery][about-nontypical-discovery]

Figure: Nontypical discovery call flow

## Error Handling

The method calls in the About interface will use the AllJoyn 
error message handling feature (ER_BUS_REPLY_IS_ERROR_MESSAGE) 
to set the error name and error message.

| Error name | Error message |
|---|---|
| org.alljoyn.Error.LanguageNotSupported | The language specified is not supported |

## About Interface

| Interface name | Version | Secured | Object path |
|---|---|---|---|
| org.alljoyn.About | 1 | no | /About |

### Properties

|Property name | Signature | List of values | Writable | Description |
|---|---|---|---|---|
| Version | q | Positive integers | no | Interface version number |

### Methods

The following methods are exposed by a BusObject that implements 
the org.alljoyn.About interface.

#### GetAboutData

**Inputs**

| Parameter name| Mandatory | Signature | List of values | Description |
|---|---|---|---|---|
| languageTag | yes | s | IETF language tags specified by [RFC 5646](http://tools.ietf.org/html/rfc5646). | The desired language. |

**Output**

| Return signature | Mandatory | Description |
|---|---|---|
| a{sv} | yes | A dictionary of the available metadata fields. If language tag is not specified (i.e., ""), metadata fields based on default language are returned. |
|  |  | If a language tag is not supported, the error org.alljoyn.Error.LanguageNotSupported is returned. |

**Description**

Retrieve the list of available metadata fields based on the language tag.

#### About data interface fields

The following table lists the names of the metadata fields. 
The fields with a yes value in the Announced column will also 
be published via the Announce signal. See [Signals][signals] 
for more information.

| Field name| Mandatory | Announced | Localized | Signature | Description |
|---|---|---|---|---|---|
| appId | yes | yes | no | ay | The globally unique identifier for the application. |
| DefaultLanguage | yes | yes | no | s | The default language supported by the device. Specified as an IETF language tag listed in [RFC 5646](http://tools.ietf.org/html/rfc5646). |
| DeviceName | yes | yes | yes | s | Name of the device set by platform-specific means (such as Linux and Android). |
| DeviceId | yes | yes | no | s | Device identifier set by platform-specific means. |
| AppName | yes | yes | yes | s | Application name assigned by the app manufacturer (developer or the OEM). |
| Manufacturer | yes | yes | yes | s | The manufacturer's name of the app. |
| ModelNumber | yes | yes | no | s | The app model number. |
| SupportedLanguages | yes | no | no | as | List of supported languages. |
| Description | yes | no | yes | s | Detailed description expressed in language tags as in [RFC 5646](http://tools.ietf.org/html/rfc5646). |
| DateOfManufacture | no | no | no | s | Date of manufacture using format YYYY-MM-DD (known as XML DateTime format). |
| SoftwareVersion | yes | no | no | s | Software version of the app. |
| AJSoftwareVersion | yes | no | no | s | Current version of the AllJoyn SDK used by the application. |
| HardwareVersion | no | no | no | s | Hardware version of the device on which the app is running. |
| SupportUrl | no | no | no | s | Support URL (populated by the manufacturer). |

#### GetObjectDescription

**Inputs**

None.

**Outputs**

| Return signature | Mandatory | Description |
|---|---|---|
| a(oas) | yes | Return the array of object paths and the list of supported interfaces provided by each object. |

**Description**

Retrieve the object paths and the list of all interfaces 
implemented by each of objects.

### Signals

| Signal name| Parameters | Sessionless | Description |
|---|---|---|---|
| | **Name** / **Mandatory** / **Signature** | | |
| Announce | (listed below) | yes | This signal is used to announce the application information and the service framework interfaces that it supports. The following information is provided in the signal: |
|  | version / yes / q |  | * version - Version number of the About interface. |
|  | port / yes / q |  | * port - Session port. The app will listen on this port for incoming sessions. |
|  | objectDescription / yes / a(oas) |  | * objectDescription --Array of object paths and the list of supported interfaces provided by each object. |
|  | metaData / yes / a{sv} |  | * metaData - Metadata. All the fields listed in [About data interface fields][about-data-interface-fields] with a yes value in the Announced column are provided in this signal. |

## AllJoyn Introspection XML

```xml
<node name="/About" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="http://www.allseenalliance.org/schemas/ introspect.xsd">
   <interface name="org.alljoyn.About">
      <property name="Version" type="q" access="read"/>
      <method name="GetAboutData">
         <arg name="languageTag" type="s" direction="in"/>
         <arg name="aboutData" type="a{sv}" direction="out"/>
      </method>
      <method name="GetObjectDescription">
         <arg name="objectDescription" type="a(sas)" direction="out"/>
      </method>
      <signal name="Announce">
         <arg name="version" type="q"/>
         <arg name="port" type="q"/>
         <arg name="objectDescription" type="a(sas)"/>
         <arg name="metaData" type="a{sv}"/>
      </signal>
   </interface>
</node>
```

[about-14.02]: /learn/core/about-announcement/interface-14-02

[about-arch]: /files/learn/about-arch.png
[about-typical-discovery]: /files/learn/about-typical-discovery.png
[about-nontypical-discovery]: /files/learn/about-nontypical-discovery.png

[about-data-interface-fields]: #about-data-interface-fields
[signals]: #signals