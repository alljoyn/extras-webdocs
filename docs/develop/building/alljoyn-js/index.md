## Getting Started with AllJoyn.js

### Background
The primary goal of AllJoyn.js is to make it easy to develop AllJoyn applications in one of the most widely used programming languages in the world.

AllJoyn.js is a deep integration of the AllJoyn Thin Core Library (AJTCL) and base services with Duktape (www.duktape.org), an ECMAScript 5.0 compliant compiler and runtime specifically designed for running in small-footprint embedded microcontrollers. Although designed to work within the limited resources of embedded mocrocontrollers, Alljoyn.js is not limited to this use case and can also be used for general AllJoyn programming on Windows, Linux, and other high-level operating systems.

The AllJoyn.js runtime environment includes a "ScriptConsole" service that provides support for installing new scripts and interacting with a running JavaScript application. The ScriptConsole service is an AllJoyn service and like any other AllJoyn service can be accessed over the network from another device running a corresponding client application. The current code base includes a command line ScriptConsolse client on Linux and Windows. This command line tool can be used to install new scripts into a running AllJoyn.js instance and also allows JavaScript code to be entered in real time. The ScriptConsole also supports remote logging of string data passed to the `print()` and `alert()` JavaScript functions.

Over time the plan is to add additional features to the ScriptConsole to support debugging features such as breakpoints, single-stepping, and navigation up the callstack.

As AllJoyn.js matures we expect the community will produce binary images for specific microcontroller boards and installable packages for high level operating systems. Currently AllJoyn.js must be built from source code. The instructions for building AllJoyn.js are below.

# Building from source (Windows and Linux)
Building AllJoyn.js from source has external dependencies. The AllJoyn functionality is based on the AllJoyn Thin Client. Underneath the Thin Client is the JavaScript engine itself which compiles and runs the scripts. This JavaScript engine is called Duktape.

## Duktape

*Note:*  SCons will automatically download Duktape. This step is only required if specific version of Duktape is needed.

AllJoyn.js depends on the Duktape ECMAScript compiler. That source code can be found [here](http://www.duktape.org). AllJoyn.js v16.04 depends on Duktape v1.2.1. After downloading, extract the archive and note the location. AllJoyn Thin Client compiles and links against the Duktape source so an environment variable needs to be set to Duktape's location.

#### Windows

```
set DUKTAPE_SRC="C:\Path\to\duktape\root"
```

#### Linux

```
export DUKTAPE_SRC=/Path/to/duktape/root
```

## AllJoyn Thin Client

AllJoyn.js itself is built on top of AllJoyn Thin Client. The console application uses the AllJoyn Standard Client. You will need to build both Thin and Standard Core in order to both run AllJoyn.js and use the console.

Instructions for getting Thin Client sources can be found [here](/develop/building/thin-linux)

Note: Use version 16.04 or later of the AllJoyn Thin Client

```
git checkout RB16.04
scons
```

## Base Services

AllJoyn.js also depends on several of the base services. The git repository for the base services can be downloaded using git clone:

```
git clone https://git.allseenalliance.org/gerrit/services/base.git
```

The RB16.04 release branch must also be checked out:

```
git checkout RB16.04
```

## AllJoyn.js

After building the Thin Client library check that your folder structure is set up correctly or AllJoyn.js won't know where to find the libraries you built in the previous steps. Your folder structure should be as follows:

```
allseen
   | ---- core
   |        | ---- alljoyn-js
   |        | ---- ajtcl    (Thin Client)
   |        | ---- alljoyn  (Standard Client)
   |
   | ---- services
            | ---- base_tcl
            | ---- base
```

As shown above, the AllJoyn.js git repository must be checked out at the same level as AllJoyn Thin Client. AllJoyn.js can be pulled from git in the same manner as the other AllJoyn repositories:

```
git clone https://git.allseenalliance.org/gerrit/core/alljoyn-js.git
git checkout RB16.04
scons
```

## Console Application

To build the console application another environment variable needs to be set which points to the location of the alljoyn library (alljoyn.lib or liballjoyn.so). This location is in the build directory in the alljoyn (Standard Client) repository. The full path is “/build/{os}/{architecture}/{debug|release}/dist”. Set the environment variable the same way as you did for duktape. For example, for an x86 debug build the path would look like:

#### Windows

```
set ALLJOYN_DIST="<path-to-alljoyn-folder>/build/win7/x86/debug/dist"
```

#### Linux

```
export ALLJOYN_DIST="<path-to-alljoyn-folder>/build/linux/x86/debug/dist"
```

With that set the console application should be able to build. Navigate to the console folder and run scons

```
cd console
scons
```

## Python Debugger Console
The AllJoyn.js Console application also supports a debugging feature. The command line debugger is built into the standard console discussed above. Additionally there is a Python GUI that delivers a much better debugging experience. In order to use the Python GUI you must build a Python extension for the AllJoyn.js console, which has some additional dependencies. The Python GUI debugger works with Python 2.7 or 3.x on Linux, and Python 3.x on Windows. Building Python 2.7 extensions on Windows requires an older version of Visual Studio that is not compatible with current AllJoyn code. The Python GUI extension is currently easiest to build and use on Linux.


#### Linux

On Ubuntu Linux use the following commands to install the required tools:

```
sudo apt-get install build-essential python-dev
```

Once these packages are installed, navigate to the console directory in your AllJoyn.js repository. From here you need to build the library that allows Python to communicate with AllJoyn.js.

```
cd <ajs_git_repo>
cd console
python setup.py build
python setup.py install  # <--- May need to run as root user!
```

These commands will build the library and install it in a location that python can find. If the installation was successful you can start up the GUI and begin debugging. The examples below illustrate how to connect to an arbitrary AllJoyn.js device, or to a specific one (using the --name flag):

```
python pydebugger.py

python pydebugger.py --name <device>
```

Once an AllJoyn.js client is found the GUI will launch and you can start debugging your script.


#### Windows

Building the Python GUI on Windows is not quite as easy as Linux and may require a workaround. The issue is that the Python 3 interpreters prior to 3.5 were built using Visual Studio 2010, while many users have upgraded past that release. If you have Visual Studio 2010 installed you should have no problem building Python 3 extensions. If not, you will need to take some extra steps. The initial steps are the same for all Visual Studio versions.

1. Download [Python 3.4](https://www.python.org/downloads/release/python-342/) (preferably 64 bit)

2. Download [Python extensions for Windows](http://sourceforge.net/projects/pywin32/files/) (same architecture as Python 3.4)

3. Install Python 3.4 first, then Python extensions for Windows

If you have multiple versions of Python installed, make sure your PATH environment variable has the Python 3.4 directory listed before any other Python installations.

The next steps will depend on your Visual Studio version. If you have Visual Studio 2010 skip to the “Building” section. Otherwise continue.

As mentioned before, Python 3.4 was built with Visual Studio 2010. It's possible to work around Python's toolchain version checking to use your version of Visual Studio. Navigate to the Python 3.4 install directory and open this file:

```
<Python34 dir>/Lib/distutils/msvs9compile.py
```

Search for the line:

```
VERSION = get_build_version()
```

Replace it with:

```
VERSION = 12.0
```

The actual number you use (12.0 in this case) will depend on the VS version you
have installed.

* VS 2011 = 10.0
* VS 2012 = 11.0
* VS 2013 = 12.0

Once that change is made you may move on to building the Python GUI debugger below.


#### Building

The steps for building are nearly the same as Linux. As mentioned before, make sure your PATH environment variable has the Python 3.4 directory listed first.

```
cd <ajs_git_repo>
cd console
python setup.py build
python setup.py install
```

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
