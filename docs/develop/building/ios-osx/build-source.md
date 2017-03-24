# Build From Source - iOS and OS X

## Development Environment Requirements

The AllJoyn™ build environment requires:

* Apple computer system with OS X 10.11 (El Capitan) or later.
* Xcode 8.x or higher for AllJoyn 16.10a
* Xcode 7.x or higher for AllJoyn 16.04, 16.10
* Xcode 6.x or higher for AllJoyn 15.04

**NOTE:** This document is based on OS X 10.12.3 with Xcode 8.2.1 newly installed. Both are the latest versions at time of publication.

**NOTE:** Pay attention that you could add AllJoyn 16.10a or higher to your project using CocoaPods. You can find more details in [api-guide].

## Installation

Install the following on your OS X 10.12 or above system:

### Xcode

1. Click on the Apple icon in the upper left of your desktop.
2. Click on App Store...
3. Search for Xcode.
4. Download and install Xcode.
5. After successful installation, you may open Xcode from your Applications folder.

**NOTE:** This document recommends using Xcode 8 and is written as such.  However, if you are using Xcode 7.x to build AllJoyn 16.04 or Xcode 6.x to build AllJoyn 15.04 you may need to run the following command from a terminal window to install the Command Line Tools:

```sh
$ xcode-select --install
```

### Homebrew

Use Homebrew to deploy SCons, Git, and Uncrustify to your OS X system.

To install Homebrew, open a terminal window, and type the following command:

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**NOTE:** More information on Homebrew can be found at http://mxcl.github.com/homebrew.

### SCons

Use the SCons build tool to generate the AllJoyn C++ API binaries for iOS and OS X.

To install SCons, open a terminal window, and type the following command:

```sh
$ brew install scons
```

### Git

Use Git for source control.

To install Git, open a terminal window, and type the following command:
```sh
$ brew install git
```

### Appledoc, Doxygen, and Graphviz

**NOTE:** Appledoc, Doxygen, and Graphviz are only required if you want to generate the API Reference Manual.

The Appledoc and Doxygen tools generates documentation for the AllJoyn Objective-C and C++ language bindings respectively.  Graphviz diagrams class hierarchies.  More information is available at the following websites.

* Appledoc - http://gentlebytes.com/appledoc/
* Doxygen - http://www.doxygen.org
* Graphviz - http://www.graphviz.org

To install these programs, open a terminal window and type the following commands:

```sh
$ brew install appledoc
$ brew install doxygen
$ brew install graphviz
```

## Obtaining the AllJoyn source

To download the AllJoyn source code, select the version you'd like, and follow the steps below:

### 16.10

Open a terminal window and type the following commands:

```sh
$ mkdir ~/alljoyn_src
$ cd ~/alljoyn_src
$ git clone https://git.allseenalliance.org/gerrit/core/alljoyn.git
$ cd alljoyn
$ git checkout RB16.10
```

### 16.04

Open a terminal window and type the following commands:

```sh
$ mkdir ~/alljoyn_src
$ cd ~/alljoyn_src
$ git clone https://git.allseenalliance.org/gerrit/core/alljoyn.git
$ cd alljoyn
$ git checkout RB16.04
```

### 15.04

Open a terminal window and type the following commands:

```sh
$ mkdir ~/alljoyn_src
$ cd ~/alljoyn_src
$ git clone https://git.allseenalliance.org/gerrit/core/alljoyn.git
$ cd alljoyn
$ git checkout RB15.04
$ Download the patch
$ cp ~/Downloads/alljoyn_darwin.patch .
$ git apply alljoyn_darwin.patch
```

### Obtaining OpenSSL

OpenSSL is an open source toolkit for implementing the Secure Sockets Layer (SSL v2/v3) and Transport Layer Security (TLS v1).

**NOTE:** OpenSSL is only required if building 15.04.  If you are building 16.04 or 16.10, please skip to Building the Alljoyn Framework.
**NOTE:** You may put these files wherever you’d like.  For the purposes of this document, they will be put in their own directories under ~/openssl_src/
**NOTE:** If you are building for 32 bit, replace step 6 below with ./config.

To install OpenSSL, open a terminal window, and type the following commands:

```sh
$ mkdir ~/openssl_src
$ cd ~/openssl_src
$ git clone https://github.com/openssl/openssl.git
$ cd openssl
$ git checkout OpenSSL_1_0_1-stable
$ ./Configure darwin64-x86_64-cc
$ cd ~/openssl_src
$ git clone https://github.com/jmartinezhern/openssl-xcode.git
$ cd openssl-xcode
$ mv ~/openssl_src/openssl .
```

Open the openssl.xcodeproj in Xcode.

1. File menu > Open
2. Navigate to ~/openssl_src/openssl-xcode/ in Finder
3. Select openssl.xcodeproj
4. Click on Open

In Xcode, build the crypto target (libssl.a and libcrypto.a) for each platform that you need for your project.

**NOTE:** As an example, this document will use Generic iOS Device for OpenSSL and alljoyn_core_arm64 for the AllJoyn section below.

1. In the menu, go to Product > Destination
2. Select Generic iOS Device
3. Go to Product > Build (Or Press Play)

Next, copy the libraries to your OpenSSL directory.

Open a terminal window and type the following commands:

```sh
$ cd ~/openssl_src/openssl-xcode/openssl
$ mkdir build
$ cd ~/Library/Developer/Xcode/DerivedData
$ ls to find the openssl libraries you just built.
$ cd openssl-xxxxxxxxxxxxxxx/Build/Products
$ cp -R Debug-iphoneios ~/openssl_src/openssl-xcode/openssl/build/
```

**NOTE:** You’ll want to repeat the last step for each platform that you’ll be using.

## Building the AllJoyn Framework

Using the building scripts is recommended for 16.10a and higher, but Xcode Integrated Development Environment (IDE) or command line instructions for 16.10, 16.04 and 15.04 are below.

### Script build for 16.10a

Open a terminal window and type the following command

* cd ~/alljoyn_src/alljoyn/alljoyn_objc/

Run one of the following scripts to build static fat library:

for iOS with Objective-C bindings
* ./build_ios.sh 

for iOS with using C++
* ./build_core_ios.sh

for macOS with Objective-C bindings
* ./build_macos.sh

for macOS with using C++
* ./build_core_macos.sh

### Xcode IDE build for 16.04

1. Open Xcode.
2. In the menu, go to File > Open
3. Navigate Finder to ~/alljoyn_src/alljoyn/alljoyn_objc/alljoyn_darwin.xcodeproj and click Open.
4. Go to Product > Scheme > alljoyn_core_arm64
5. Go to Product > Destination > Generic iOS Device
6. Go to Product > Build (Or Press Play)

### Xcode IDE build for 15.04

1. Open Xcode.
2. In the menu, go to File > Open
3. Navigate Finder to ~/alljoyn_src/alljoyn/alljoyn_objc/alljoyn_darwin.xcodeproj and click Open.
4. On the left panel, click on alljoyn_darwin
5. On the middle panel, click on info
6. Enter "OPENSSL_ROOT=<PathToOpenSSLBuild>" before "--$(ACTION)". **NOTE** Include the quotes
7. Press Return
8. Go to Product > Scheme > alljoyn_core_arm64
9. Go to Product > Destination > Generic iOS Device
10. Go to Product > Build (Or Press Play)

You can find the output in the follow directories:
* `~/alljoyn_src/alljoyn/build/darwin/arm64/iphoneos/debug/dist/cpp`

**NOTE:** Each platform will appear in it's own directory in `.../darwin/<architecture>/<platform>/<build>/dist/cpp`.

### Command line build

Open a terminal window and type the following commands

* cd ~/alljoyn_src/alljoyn/alljoyn_objc/

64-bit iOS devices, run the following command:
```sh
$ /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -project alljoyn_darwin.xcodeproj -scheme alljoyn_core_arm64 -sdk iphoneos -configuration Debug
```

For all other iOS devices, run the following command:

```sh
$ /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -project alljoyn_darwin.xcodeproj -scheme alljoyn_core_ios -sdk iphoneos -configuration Debug
```

iOS simulator, run the following command:

```sh
$ /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -project alljoyn_darwin.xcodeproj -scheme alljoyn_core_ios -sdk iphonesimulator -configuration Debug
```

OS X, run the following command:

```sh
$ /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -project alljoyn_darwin.xcodeproj -scheme alljoyn_core_osx
```

[api-guide]: /develop/api-guide/core/objc