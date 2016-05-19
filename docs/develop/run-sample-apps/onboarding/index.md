# Running The Onboarding Samples 

There are two types of Onboarding sample applications, an Onboarder and an Onboardee. The [Onboarding service framework][learn_onboarding] is both a definition of how a Wi-Fi Radio will function on a device and the AllJoyn&trade; interface used to communicate.

An Onboardee application is responsible for starting up as a software enabled access point (SoftAP) and advertising that it supports the Onboarding service framework via [About Announcements][learn_about]. 
Once provided a set of credentials, the application will stop advertising as an access point and connect to the target network using the provided credentials.

An application that provides the Onboarder side of the service is responsible for using the Onboarding interface to transmit AP credentials that the Onboardee application should connect to.

The Onboarding interface is defined as follows:

```xml
<node>
    <interface name="org.alljoyn.Onboarding">
        <annotation name="org.alljoyn.Bus.Secure" value="true"/>
        <property name="LastError" type="(ns)" access="read"/>
        <property name="State" type="n" access="read"/>
        <property name="Version" type="q" access="read"/>
        <method name="ConfigureWiFi">
            <arg name="SSID" type="s" direction="in"/>
            <arg name="passphrase" type="s" direction="in"/>
            <arg name="authType" type="n" direction="in"/>
            <arg name="status" type="n" direction="out"/>
            <annotation name="org.alljoyn.Bus.DocString.en" value="Configure WiFi"/>
        </method>
        <method name="Connect">
            <annotation name="org.freedesktop.DBus.Method.NoReply" value="true"/>
            <annotation name="org.alljoyn.Bus.DocString.en" value="Connect"/>
        </method>
        <method name="Offboard">
            <annotation name="org.freedesktop.DBus.Method.NoReply" value="true"/>
            <annotation name="org.alljoyn.Bus.DocString.en" value="Offboard"/>
        </method>
        <method name="GetScanInfo">
            <arg name="age" type="q" direction="out"/>
            <arg name="scanList" type="a(sn)" direction="out"/>
            <annotation name="org.alljoyn.Bus.DocString.en" value="Get WiFi Scan Information"/>
        </method>
        <signal name="ConnectionResult">
            <arg type="(ns)"/>
            <annotation name="org.alljoyn.Bus.DocString.en" value="Connection Result"/>
        </signal>
    </interface>
</node>
```

Onboarder samples are available for [Linux][linux], [Android][android] and [iOS][ios].
Onboardee samples are available for [Android][android].

The samples can be run on the following platforms:

 - [Android][android]
 - [Linux][linux]
 - [iOS][ios]

[android]: /develop/run-sample-apps/onboarding/android
[linux]: /develop/run-sample-apps/onboarding/linux
[ios]: /develop/run-sample-apps/onboarding/ios

[learn_about]: /learn/core/about-announcement
[learn_onboarding]: /learn/base-services/onboarding
