# Build From Source - Android

## Prerequisites

* The following content uses many terms and concepts that are described in the 
[Introduction to the AllJoyn Framework][intro-to-alljoyn-framework]. 
Therefore, it is strongly recommended that you read the Introduction content first.

* Before proceeding with development, make sure that you have set up the development 
environment as described here for [Windows][config-build-environment-windows] or 
for [Linux][config-build-environment-linux].

## Setting Up the Programming Environment

This section explains how to set up the programming environment 
for developing AllJoyn&trade;-enabled Android applications. 
It covers the following topics:

* Install the Android SDK and NDK
* Install Eclipse and the ADT plug-in

**NOTE:** The procedures described in this section require the 
specified tool versions.

### Installing the Android SDK

The Android software development kit (SDK) provides the 
tools needed for building Android applications and transferring 
applications to or from an Android device.The 'adb' tool is used to:

* Transfer/pull files to/from the phone
* Run the AllJoyn standalone router
* Install/uninstall applications

If you want to run AllJoyn on Android 2.2 (Froyo), you can 
install Android SDK version r9 or above.

If you want to run AllJoyn on Android 2.3 (Gingerbread), 
you can install at least Android SDK version r11 or above.

Download Android SDK version r11 or above from the following location:

http://developer.android.com/sdk/index.html

Install the SDK by following the directions given on the download page.

In order to run, the SDK requires certain software packages 
to be pre-installed on your system. For more information, 
see the following location:

http://developer.android.com/sdk/requirements.html

After installing the SDK, you must install the Android platform 
support packages you wish to use. See:

http://developer.android.com/sdk/installing.html#AddingComponents

The AllJoyn framework runs on any SDK platform with Android API 
levels 8 through 11. Note that installing these packages may take some time.

### Installing the Android NDK

The Android native development kit (NDK) enables developers 
to build Java native libraries (JNI libraries) which can be 
called from Android (Java) applications. Android NDK is 
required only to write Java native libraries. The Android NDK 
is not required to use the Android Java bindings.

The main tool used from the Android NDK is 'ndk-build', which 
is used to build the native library of the JNI application.

To run Android JNI applications using AllJoyn, install any 
NDK version 7 or above from http://developer.android.com/tools/sdk/ndk/index.html .

Install the NDK by following the directions given on the download page.

To run, the NDK requires that the following software packages 
are pre-installed on your system:

* Latest Android SDK (including all dependencies)
* GNU Make 3.81 or later
* Recent version of awk (GNU awk or nawk)

For more information, see the NDK download page.

### Installing Eclipse and the ADT plug-in

The Android SDK operates in the Eclipse integrated development 
environment, with the addition of the Eclipse plug-in for the 
Android development tools (ADT).

Since Android applications are Java-based, installing Eclipse 
for Java development may be helpful.

Download Eclipse from the following location:

http://eclipse.org

Install Eclipse by following the directions given on the 
download page.

Instructions for installing the Eclipse ADT plug-in can be 
found at the following location:

http://developer.android.com/guide/developing/projects/projects-eclipse.html

**NOTE:** If the plug-in cannot find the SDK executable, it displays 
an error and then prompts  for its location. (Point it to where 
you installed the SDK.) Also, if you haven't already selected 
the packages that need installing (see [Installing the Android SDK][install-android-sdk]), 
you are prompted to do so upon launching ADT.

### Downloading the OpenSSL header files and library

The AllJoyn framework uses the OpenSSL crypto library for 
end-to-end encryption and authentication.
 
The prebuilt library is required to link AllJoyn applications. 
It can be downloaded directly from the Android device or 
emulator into the lib folder of the AllJoyn distribution. 
Attach the device (or launch the Android emulator), then 
run the following commands:

```sh
cd <alljoyn_dir>/lib
adb pull /system/lib/libcrypto.so libcrypto.so
```

The above command means:

adb pull <location of the file on the phone that you want to pull> 
<destination on your machine where you want to store the pulled 
file with the name that you want>

The library can also be built from the Android source repository. 
For details on building the Android source tree, see the 
Android source repository web site:

http://source.android.com/source/download.html

IMPORTANT: If you are building for Froyo, the `libcrypto.so` 
library must be pulled from Froyo, not Gingerbread. 
Conversely, if you are building for Gingerbread, the 
`libcrypto.so` library must be pulled from Gingerbread.
 
## Building AllJoyn from Source for Android

For most developers, the SDK package available to download 
from http://allseenalliance.org is sufficient for developing 
Android applications using AllJoyn. However, if you wish to 
obtain and compile AllJoyn from source, follow the directions 
in this section.

To compile AllJoyn from source, the following items are required:

* Android SDK
* Android NDK
* Eclipse and the ADT plug-in
* Android source

Instructions for obtaining the Android SDK, Android NDK, 
Eclipse and the ADT plug-in are in [Setting Up the Programming Environment][set-up-programming-environment].

### The Android source

The Android source (http://source.android.com) is required 
for building Android targets. For most developers, downloading 
and building Android source is the most complicated step 
in building AllJoyn for Android. Google has detailed 
instructions for downloading and building Android source.

For a list of system requirements and instructions for obtaining 
the required tools, see http://source.android.com/source/initializing.html.

For instructions on obtaining the Android Source Tree, 
see http://source.android.com/source/downloading.html. 

When running the repo init command specify:

* `-b froyo-release for Froyo source`
* `-b gingerbread-release for Gingerbread source`

For instructions on building and running the build source, see
http://source.android.com/source/building.html

* Build the "generic" version of Android.
* There is no need to run the code. Only the build libraries 
that are not available in the NDK are used.
 
### Obtaining the AllJoyn source

If you followed the instructions in [The Android source][android-source], 
you should have the repo tool and git installed on your system. 
Enter the following commands to get the AllJoyn source:

```sh
$ mkdir $HOME/alljoyn # for example
$ cd $HOME/alljoyn
$ repo init -u git://github.com/alljoyn/manifest.git
$ repo sync
$ repo start master --all
```

### Building the AllJoyn framework for Android

At this point. you have all of the files and programs required 
to build the AllJoyn framework for Android. The following commands assume 
you have installed the Android NDK at `/usr/local/android-ndk-r5b`, 
you have downloaded and built the Android source, and it is 
located in `$HOME/android-platform`.

IMPORTANT: If you are building for Froyo, the Android source 
must be built for Froyo, not Gingerbread. Conversely, if you 
are building for Gingerbread, the Android source must be 
built for Gingerbread.

Use the following commands to build the AllJoyn framework for Android:

```sh
$ export JAVA_HOME="/usr/lib/jvm/java-6-sun" # or java-5-sun
$ export CLASSPATH="/usr/share/java/junit.jar"
$ scons OS=android CPU=arm ANDROID_NDK=/usr/local/android-ndk-r5b 
   ANDROID_SRC=$HOME/android-platform WS=off
```

It is possible to specify that the AllJoyn framework uses 
additional tools during the build process. For example, the 
AllJoyn framework can use Uncrustify to check white space 
compliance and Doxygen for producing API documentation for 
the C++ APIs. See [Configuring the Build Environment (Linux Platform)][config-build-environment-linux]
for detailed instructions for installing these two tools.

[intro-to-alljoyn-framework]: /learn/core/standard-core
[config-build-environment-windows]: /develop/building/windows/build-source
[config-build-environment-linux]: /develop/building/linux/build-source

[install-android-sdk]: #Installing the Android SDK
[set-up-programming-environment]: #setting-up-the-programming-environment
[android-source]: #the-android-source
