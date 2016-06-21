## Getting Started with AllJoyn.js

### Background
The primary goal of AllJoyn.js is to make it easy to develop AllJoyn applications in one of the most widely used programming languages in the world.

AllJoyn.js is a deep integration of the AllJoyn Thin Core Library (AJTCL) and base services with Duktape (www.duktape.org), an ECMAScript 5.0 compliant compiler and runtime specifically designed for running in small-footprint embedded microcontrollers. Although designed to work within the limited resources of embedded mocrocontrollers, Alljoyn.js is not limited to this use case and can also be used for general AllJoyn programming on Windows, Linux, and other high-level operating systems.

The AllJoyn.js runtime environment includes a "ScriptConsole" service that provides support for installing new scripts and interacting with a running JavaScript application. The ScriptConsole service is an AllJoyn service and like any other AllJoyn service can be accessed over the network from another device running a corresponding client application. The current code base includes a command line ScriptConsolse client on Linux and Windows. This command line tool can be used to install new scripts into a running AllJoyn.js instance and also allows JavaScript code to be entered in real time. The ScriptConsole also supports remote logging of string data passed to the `print()` and `alert()` JavaScript functions.

Over time the plan is to add additional features to the ScriptConsole to support debugging features such as breakpoints, single-stepping, and navigation up the callstack.

As AllJoyn.js matures we expect the community will produce binary images for specific microcontroller boards and installable packages for high level operating systems. Currently AllJoyn.js must be built from source code. The instructions for building AllJoyn.js are below.

### Building AllJoyn.js on Windows 7
Even if you are planning to use the prebuilt SDK (see below) you will need to setup the build environment as described in the link below.
https://allseenalliance.org/docs-and-downloads/documentation/configuring-build-environment-microsoft-windows-xp-and-windows-7

Note:  At this time AllJoyn.js has not been built for Windows XP

To build AllJoyn.js run the scons script in the alljoyn-js project directory. It will be simpler if you keep the directory structure as it appears in the git repo with ajtcl, alljoyn, and alljoyn-js all at the same level.

You may need to specify the version of visual studio on the scons command line. For example if you are using Visual Studio 11.0 (Visual Studio 2012) you will need to run `scons MSVC_VERSION=11.0`

#### Console client for Windows
The console client is an AllJoyn standard core library application. It can be compiled against the AllJoyn 16.04 prebuilt SDK and libraries which can be downloaded from here:
https://allseenalliance.org/source-code

After unzipping the appropriate SDK version set the ALLJOYN_DISTDIR environment variable to point to the SDK directory and run scons to build it.
`scons VARIANT=[release|debug]`

Note: the beta SDK is compiled with Visual Studio 11.0 - if you have a different version of Visual Studio you will need to build the AllJoyn standard core library from source.

### Building AllJoyn.js on Linux
On Linux AllJoyn.js must be built from source. The following link has instructions on how to configure the build environment for Linux.
https://allseenalliance.org/framework/documentation/develop/building/linux/build-source

Run scons in ajtcl first to build the thin core libraries.

To build AllJoyn.js run the scons script in the alljoyn-js project directory. It will be simpler if you keep the directory structure as it appears in the git repo with ajtcl, alljoyn, and alljoyn-js all at the same level.

#### Console client for Linux
The console client is an AllJoyn standard core library application. You can download the AllJoyn 16.04 source code tarball from here:
https://allseenalliance.org/framework/download

Follow the build instructions for building the standard core library
https://allseenalliance.org/framework/documentation/develop/building/linux/build-source

After building the standard core libraries set the ALLJOYN_DISTDIR environment variable to point to the SDK directory and run scons to build the console application.
`scons VARIANT=[release|debug]`

### Running AllJoyn.js
AllJoyn.js always runs as an AllJoyn leaf node which requires that there be a routing node available somewhere on the network. For testing purposes it is convenient to run a routing node and multiple AllJoyn.js applications on the same computer.

If you are running on Windows with the 16.04 SDK there is a pre-built routing node called SampleDaemon in the bin\samples subdirectory. If you are on Linux the SampleDaemon get built when the AllJoyn standard libraries are built and is in dist/cpp/bin/samples.

Start a SampleDaemon in terminal or command windows - after checking that the program launched correctly you can minimize that window.  In another terminal/command window run alljoynjs. If you built in debug mode you will see some debug output like this - release mode will be much quieter.

```
Allocated heap 362640 bytes
000.000 aj_nvram.c:207 AJ_NVRAM_Open(): Data set 4098. does not exist
000.001 aj_nvram.c:230 AJ_NVRAM_Open(): failure: status=AJ_OK
000.002 aj_nvram.c:207 AJ_NVRAM_Open(): Data set 4099. does not exist
000.002 aj_nvram.c:230 AJ_NVRAM_Open(): failure: status=AJ_OK
000.006 aj_nvram.c:207 AJ_NVRAM_Open(): Data set 4100. does not exist
000.008 aj_nvram.c:230 AJ_NVRAM_Open(): failure: status=AJ_OK
000.010 aj_nvram.c:207 AJ_NVRAM_Open(): Data set 4101. does not exist
000.015 aj_nvram.c:230 AJ_NVRAM_Open(): failure: status=AJ_OK
Attempting to connect to bus 'org.alljoyn.BusNode'
Connected to Routing Node with BusUniqueName=:LH9ybZbr.4
000.315 aj_msg.c:1093 Discarding bad message AJ_ERR_NO_MATCH
000.512 aj_msg.c:1093 Discarding bad message AJ_ERR_NO_MATCH
000.517 aj_msg.c:1093 Discarding bad message AJ_ERR_NO_MATCH
```
Don't worry about the "Discarding bad message" errors;  this is reporting that an unrecognized message was received and has been ignored.  The NVRAM errors are from the config service and just mean that the device has not been configured - again nothing to be concerned about.

The important output is the line that says that alljoynjs has connected to the routing node as has been given a unique name.

Open another term/cmd window and run ajs_console you should see something like this:
```
Found script console service: :LH9ybZbr.4
Joined session: 2799231907
```
The string ":LH9ybZbr.4" should be the same unique name that alljoynjs reported and tells us we connected to the correct application.

Now the console is connected we can send JavaScript to AllJoyn.js.  Type "2+3" and you should see the following:
```
2+3
Eval: 2+3;
Eval result=0: 5
```
This shows the string sent to AllJoyn.js ("2+3") and the status and value returned. You can also try this:
```
for (i = 0; i < 10; ++i) {  print(i)  }
```
As you will see the output from the `print()` function call is sent to the console application.

The console application is configured as a notification listener for AllJoyn notifications sent by the connected application. This is mainly for debugging but also makes for a nice demonstration of how easy it is to send an AllJoyn notification. To send a notification try typing this into ajsconsole:
```
AJ.notification(AJ.notification.Warning, "Door is unlocked").send(100)
```
This builds a notification with severity level of "Warning" then sends it with a time to live of 100 seconds. There are two other notification severity levels, Info and Emergency.  The notification output looks like this:
```
Warning Notification from app:AllJoyn.js on device:Manufacturer Name Product Name 2
en: Door is unlocked
```
Because the device has not been configured it does not have manufacturer or product names so the notification just contains default values. The notification text itself is in the default language "en". There are APIs for setting additional language strings and other metadata on the notification before sending it.

### Simulated I/O
AllJoyn.js includes APIs that provide access to low-level I/O functions such as digital and analog GPIO pins and various other IO ports commonly found on embedded microcontrollers.  These APIs sit above a hardware abstraction layer that in turn sits above a board support package providing access to the physical I/O devices. For Windows and Linux desktops AllJoyn.js provides a simulated board support package that interacts with a simple GUI application written in Python. It provides four virtual LEDs that are mapped to digital output IO pins 1..4, four check boxes that are mapped to digital input IO pins 5..8, and four push buttons mapped to digital input pins 9..12. The test application simio.js shows how to drive these pins.

The simulation I/O script is in tools/simio.py

If you are running on Windows and do not already have the Python for Windows extensions installed, please install those extensions using the executable installer for your specific Python version and platform within Build 219. The extensions can be found here:
http://sourceforge.net/projects/pywin32/files/pywin32/
