# Build from Source - Windows

## Configuring a Windows-Specific Environment

It is recommended to note the install location of each tool 
discussed in this section to complete the system configuration.

### Microsoft Visual Studio 2010, 2012

You should have at least one version of Microsoft Visual Studio 
installed on your system. Visual Studio 2008 is no longer officially
supported. If you are still using Visual Studio 2008, you should 
still be able to build AllJoyn from source. See [Legacy Build Options][legacy-build-options] 
for instructions for setting up Visual Studio 2008.

### Python 2.7.3 for Windows

NOTE: Python 2.6 may also be used. Use the 32-bit version of 
Python even if you are building the AllJoyn&trade; framework for a 64-bit architecture.

1. Open a browser and navigate to http://www.python.org/download/.
2. From the Python web page, select **Python 2.7.3 Windows Installer (32-bit)**.
3. Click **Run** and **Run** again. The Python setup wizard appears.
4. Click **Finish**, **Yes**, and **Finish** again.

### SCons 2.3.0 for Windows

NOTE: SCons 1.3.0 may also be used.

1. Open a browser and navigate to http://www.scons.org.
2. From the SCons web page, under 'Scons 2.3.0.final.0 is available', click the **download page** link.
3. Select scons-2.3.0.final.0.win32.exe, and click **Run** and **Run** again. The setup wizard appears.
4. Proceed through the wizard steps to complete the SCons installation.

### OpenSSL v1.0.1e for Windows

OpenSSL is required if you are building the AllJoyn framework 
for Windows XP or if your codebase is older than November 2011. 
For other versions of Windows, see [Visual Studio 2008 Legacy Build - Microsoft Windows SDK 7.x][vs-2008-legacy-build-ms-windows-sdk-7x].

NOTE: To avoid error messages, install Visual C++ 2008 Redistributables 
before installing OpenSSL.

1. Open a browser and navigate to http://www.slproweb.com/products/Win32OpenSSL.html.
2. From the Win32 OpenSSL web page, click **Visual C++ 2008 Redistributables**.
3. Click **Download** and **Run**. The setup wizard appears.
4. Proceed through the wizard steps to complete the C++ installation.

   NOTE: It is best to download and use the latest version.

5.  Return to the OpenSSL web page, and click **WinOpenSSL v1.0.1e**.
6. Click **Run** and **Run** again. The setup wizard appears.
7. Proceed through the wizard steps to complete the OpenSSL installation.

### Msysgit version 1.8.1.2 for Windows

1. Open a browser and navigate to http://code.google.com/p/msysgit/downloads/list.
2. From the msysgit web page, click the most recent version of git Installer for Windows.
3. Download the file, click Run and Run again. The setup wizard appears.
4. Proceed through the wizard steps to complete the git installation.

### Uncrustify version 0.57 for Windows

Uncrustify is a formatting tool for source code.

1. Open a browser and navigate to 
http://sourceforge.net/projects/uncrustify/files/uncrustify/uncrustify-0.57/.
2. From the Uncrustify Code Beautifier web page, click **uncrustify-0.57-win32.zip**.
3. Download `uncrustify-0.57-win32.zip` and unzip.
4. Move the contents to `C:\uncrustify-0.57-win32`.

### Doxygen for Windows

Doxygen generates documentation from source code. This tool is 
optional, but is required for creating documentation.

1. Open a browser and navigate to
http://www.stack.nl/~dimitri/doxygen/download.html#latestsrc.
2. From the Doxygen web page, under **Doxygen source and binary releases** 
and **Windows XP/Vista/7**, select **http**, click **Run**, 
then **Yes**. The setup wizard appears.
3. Proceed through the wizard steps to complete the Doxygen installation.

### Graphviz 2.30.1 for Windows

Graph visualization is a way of representing structural 
information as diagrams of abstract graphs and networks. 
This tool is optional, but is required for creating documentation.

1. Open a browser and navigate to http://www.graphviz.org/Download_windows.php
2. From the download to Windows, click **graphviz-2.30.1.msi** and then **Run**.
3. Click **Run** again. The setup wizard appears.
4. Proceed through the wizard steps to complete the Graphviz installation.

### MiKTeX

MiKTeX is used to create LaTeX binaries and Windows style sheets.

IMPORTANT: Install MiKTeX ONLY if you need to produce a PDF version of an API document.

1. Open a browser and navigate to http://www.miktex.org/2.8/setup.
2. From the MiKTeX web page, under **Installing a basic MiKTeX system**, click **Download**.
3. Click **Run**. The Copying Conditions appear.
4. Click **I accept the MiKTeX copying conditions** and click **Next**.
5. Proceed through the install steps to complete the MiKTeX installation.

### Java Development Kit (JDK)

The JDK is required to build Java bindings. Building the Java 
bindings is optional, but if you want to build them, you need the JDK.

#### JDK SE6

1. Open a browser and navigate to
http://www.oracle.com/technetwork/java/javase/downloads/jdk6downloads-1902814.html.
2. Download JDK 6u43 for your version of Windows.

#### JDK SE5

1. Open a browser and navigate to
http://www.oracle.com/technetwork/java/javase/downloads/index-jdk5-jsp-142662.html.
2. Find **JDK5.0 update 22** and click **Download**.
3. Download the JDK installer for your version of Windows.

#### junit

Required to build Java bindings.

1. Open a browser and navigate to
https://github.com/junit-team/junit/wiki/Download-and-Install.
2. Download the Plain-old JAR (`junit.jar`) v4.11.
3. Place the jar file in a known location (e.g., `C:\junit\junit-4.11.jar`).

### googletest

Google Test is Google's framework for writing C++ tests. 
Google Test is an xUnit testing architecture used to test 
the native AllJoyn framework C++ APIs. Google Test is optional, 
but is required for building the C++ unit tests.

1. Open a browser and navigate to http://code.google.com/p/googletest/downloads/list.
2. From the googletest download page download `gtest-1.6.0.zip`.
3. Unzip the contents of `gtest-1.6.0.zip` to a known location 
(e.g., `C:\gtest\gtest-1.6.0`).

### Apache Ant

Apache Ant is a Java library and command line tool for 
building software. This tool is optional, but is required 
for running junit tests.

1. Open a browser and navigate to http://ant.apache.org/bindownload.cgi.
2. From the Apache Ant web page, download `apache-ant-1.9.0-bin.zip`.
3. Unzip the contents of `apache-ant-1.9.0-bin.zip` to a 
known location (e.g., `C:\apache-ant-1.9.0`).

### Adding environment variables

1. Click **Start**.
2. Right-click **Computer**.
3. Select **Properties**.
4. Select **Advanced system settings** from the left pane (Windows 7).
5. Select the **Advanced** tab.
6. Click **Environment Variables**.
7. Under the User variables, search for 'PATH'.

   NOTE: There is a 'Path' variable under System variables, 
   which you could add to; however, it is considered good 
   practice to add new variables to User variables.

   1. If there is no 'PATH' under User variables, click **New**. 
      1. Enter PATH as the variable name.
      2.  Append the following to the %PATH% variable, separated 
      by a semicolon (adjust the path of each item, as necessary, 
      to account for the install location):
      
      ```
      C:\Python27;C:\Python27\Scripts;C:\Program Files\doxygen\bin; 
      C:\Program Files\Graphviz2.30.1\bin;C:\OpenSSL-Win32\bin; 
      C:\Program Files\Git\cmd;C:\uncrustify-0.57-win32;
      ```

   2. If there is a 'PATH' under User variables, select it, and click **Edit**.

      Append the following to the %PATH% variable, separated by a 
      semicolon (adjust the path of each item, as necessary, 
      to account for the install location):

      ```
      C:\Python27;C:\Python27\Scripts;C:\Program Files\doxygen\bin; 
      C:\Program Files\Graphviz2.30.1\bin;C:\OpenSSL-Win32\bin; 
      C:\Program Files\Git\cmd;C:\uncrustify-0.57-win32;
      ```

8. If you are generating the API documentation using Doxygen:
   1. Add a 'New...' User variable DOXYGEN_HOME. 
   2. Set `DOXYGEN_HOME=C:\PROGRA~1\doxygen`.
   3. Add a 'New...' User variable GRAPHVIZ_HOME.
   4. Set `GRAPHVIZ_HOME=C:\PROGRA~1\Graphviz 2.30.1`.
9. If you are building the AllJoyn Java bindings:
   1. Add a 'New...' User variable JAVA_HOME.
   2. Set `JAVA_HOME=C:\PROGRA~1\Java\jdk1.6.0_43`. 
   3. Add a 'New...' User Variable CLASSPATH.
   4. Set `CLASSPATH=C:\junit\junit-4.11.jar`.
10. If you are using Apache Ant, use your personal install 
directories:
   1. Add a 'New' User variable ANT_HOME.
   2. Set `ANT_HOME=C:\apache-ant-1.9.0`.
   3. Add the following to the %PATH% variable:

      ```
      %ANT_HOME%\bin
      ```

### Verify installation

Open the command window, and check that you can run the 
following commands:

```
C:\>python --version
Python 2.7.1

C:\>scons --version
SCons by Steven Knight et al.: engine: v2.0.1.r5134, 2010/08/16 23:02:40, by 
bdeegan on cooldog Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
2009, 2010
The SCons Foundation

C:\>git --version
git version 1.7.4.msysgit.0

C:\>doxygen --version
1.7.4

C:\>dot -V
dot - graphviz version 2.26.3 (20100126.1600)

C:\>openssl version
OpenSSL 1.0.0d 8 Feb 2011
```

NOTE: OpenSSL not needed for all installations see 
[openSSL v1.0.1e for Windows][openssl-version-windows] and 
[Msysgit version 1.8.1.2 for Windows][msysgit-version-windows] for more information

```
C:\>uncrustify -v
uncrustify 0.57
```

### Obtaining AllJoyn source code from the Git repository

Obtain a copy of each repository using the `git clone` command.

1. Create a workspace for the AllJoyn project.

   ```
   C:\>mkdir allseen
   C:\>cd allseen

   C:\>mkdir core
   C:\>cd core

   C:\>mkdir alljoyn
   C:\>cd alljoyn
   ```

2. Make a clone of the Git repository associated with the AllJoyn project.

   ```
   c:\allseen\core\alljoyn> git clone 
   https://git.allseenalliance.org/gerrit/core/alljoyn.git.git
   ```

### CRLF issues when using msysgit

If you have just checked out the repository, msysgit sees issues 
that deal with the end-of-line symbol. This is an issue from going 
back and forth between Linux and Windows, where the expected 
line-feed in Windows is CRLF, and in Linux it is simply CR. 
msysgit reports that a freshly checked out file has been 
modified and does not let you pull from the repository, 
check the files, or even merge changes. The current solution 
is to tell git to ignore the CRLF issues using the following command:

```
git config core.autocrlf false
``` 

## Build the AllJoyn Framework

Use the following instructions to build the AllJoyn project.

1. From the command line, go to the AllJoyn allseen folder. 
The path used here is just an example.

   ```
   cd c:\allseen\core\alljoyn
   ```

2. Run the appropriate command from the list below to build 
the AllJoyn framework for Windows. Use 'scons -h' for some 
basic settings. In the examples below, any of the scons 
variables default values can be set as environment variables.

#### Building for Windows 7 (use this for Windows Vista)

For 32-bit x86 target:

```
C:\>cd allseen\core\alljoyn
C:\allseen\core\alljoyn>scons OS=win7 CPU=x86 MSVC_VERSION=10.0 BINDINGS=cpp
```

For 64-bit x86-64 target:

```
C:\>cd allseen\core\alljoyn
C:\allseen\core\alljoyn>scons OS=win7 CPU=x86_64 MSVC_VERSION=10.0 BINDINGS=cpp
```

NOTE: If you are building a version older than 2.6, then 
CPU=x86_64 will be required to build a 64-bit version of 
the AllJoyn framework.

#### Building for Windows XP

For 32-bit x86 target:

```
C:\>cd allseen\core\alljoyn
C:\allseen\core\alljoyn>scons OS=winxp CPU=x86 MSVC_VERSION=10.0 BINDINGS=cpp
OPENSSL_BASE=<openssl_base_directory>
```

A 64-bit version of the AllJoyn framework cannot be built on Windows XP.

#### Building the AllJoyn framework if the codebase is older than November 2011

For 32-bit x86 target:

```
C:\>cd allseen\core\alljoyn
C:\allseen\core\alljoyn>scons OS=windows CPU=x86 MSVC_VERSION=10.0 BINDINGS=cpp
OPENSSL_BASE=<openssl_base_directory>
```

For 64-bit x86-64 target:

```
C:\>cd allseen\core\alljoyn
C:\allseen\core\alljoyn>scons OS=windows CPU=x86_64 MSVC_VERSION=10.0
BINDINGS=cpp OPENSSL_BASE=<openssl_base_directory>
``` 

The transition to using the Windows CNG libraries for AllJoyn 
security was done in September 2011. If you are trying to 
compile the code from around that time period you may need 
to specify the OS as either windows, winxp or win7. 
Type scons -h to see which option to use.

The MSVC_VERSION option is the version of Microsoft Visual C++ 
that is installed on your system:

* For Microsoft Visual C++ 2008, it will be 9.0 (default value)
* For Microsoft Visual C++ 2010, it will be 10.0.

NOTE: If you are using Windows 7, you may need to run SCons as administrator.

### Build variants

Building in "release mode" removes all symbol information 
and enables code optimization. To build in release mode, 
add the VARIANT build option to your scons command line. 
The values are:

* debug - (default option) Build the debug variant with all 
symbol information and improved logging features for the 
AllJoyn framework.
* release - Build the release variant of the code. This will 
be optimized for code size. It will not include symbol 
information and will only log critical errors associated 
with the AllJoyn framework.

Example:

```
scons OS=win7 CPU=IA64 VARIANT=release MSVC_VERSION=10.0 BINDINGS=cpp
```

### alljoyn_java

When building the Java code for the AllJoyn framework, use 
the same command as building the AllJoyn core for Windows. 
The only difference is it is done from the root `allseen\core\alljoyn` 
folder or the `alljoyn_java` folder, not the `alljoyn_core` folder. 
To build the Java code, SCons needs to know where the Java 
tools and junit are located.

Set an environment variable to tell scons the location of the build tools:

```
set JAVA_HOME="C:\Program Files\Java\jdk1.6.0_43"
```

Here is the path used on a development setup:

```
set CLASSPATH="C:\junit\junit-4.11.jar"
```

NOTE: These environment variables are already set if you 
followed the instructions in [Adding environment variables][adding-environment-variables].

As noted, to build Java code, use the same commands as were 
used to make AllJoyn core for Windows; e.g., a Java for Windows 
release variant. For example:

```
scons OS=win7 CPU=x86_64 VARIANT=release MSVC_VERSION=10.0 BINDINGS=core,java
``` 

### White space options

The AllJoyn build environment uses uncrustify and a python 
script that is automatically run each time the AllJoyn 
framework is built.

If source code is found that does not match the AllJoyn 
coding guidelines, the build will fail when it runs the 
whitespace script. This is the default behavior when building 
the AllJoyn framework. This behavior can be changed by 
changing the WS option.

The values of the WS option are:

* check - (default option) this option will check the code 
to see if it adheres to the AllJoyn white space policy.
* detail - display what changes are needed to make the 
code adhere to the AllJoyn white space policy.
* fix - modify the code to use the AllJoyn white space 
policy. This will automatically apply the changes that 
are shown when using the detail option.
* off - don't check the code for adherence to the 
AllJoyn whitespace policy. Example:
  ```
  scons OS=win7 CPU=x86_64 MSVC_VERSION=10.0 WS=off BINDINGS=cpp,java
  ```

### Generating API documentation

By default the Java API documentation will always build 
when building the Java bindings; this is not the default 
behavior for the C++ API documentation. Since the documentation 
for the C++ API requires Doxygen and Graphviz to be installed 
on your system, it is not built by default. Use the DOCS option 
to generate the C++ API documentation.

The values are:

* none - (default option) Do not generate the API documentation.
* html - (recommended option if documentation is desired ) 
Produce an HTML version of the API documentation. This is what 
is published to www.allseenalliance.org. The output can be 
found in `<allseen\core\alljoyn>\alljoyn_core\docs\html\index.html`.
* pdf - Produce a PDF form of the document. If you are unable 
to build the HTML form of the documentation the PDF form will 
not build. The resulting document can be found in 
`<allseen\core\alljoyn>\alljoyn_core\docs\html\refman.pdf`.
* dev - Produce HTML documentation for the entire AllJoyn 
codebase, not just the public APIs. When Doxygen runs using 
this command, it produces a lot of warnings and will generate 
documentation for methods and functions that should only be 
used inside AllJoyn code and not in any other projects. 
This option is for people developing AllJoyn code, not for 
people using the AllJoyn framework to develop other applications. 
The output will override the output from the HTML option.
 
Example:

```
scons OS=win7 CPU=x86_64 MSVC_VERSION=10.0 DOCS=html BINDINGS=cpp,java
```

### Specifying the Microsoft Visual C++ version

To build in Windows, you are required to have at least one 
version of Microsoft Visual C++ installed on your system. 
At this time, only Microsoft compilers can be used to build 
AllJoyn applications. Use the MSVC_VERSION to specify what 
version of Microsoft Visual C++ you are using.

The values are:

* 9.0 - (Default) Use Microsoft Visual C++ 2008
* 10.0 - Use Microsoft Visual C++ 2010
* 11.0 - Use Microsoft Visual C++ 2012
* 11.0Exp - Use Microsoft Visual C++ Express Edition

NOTE: Support for Visual Studio 2008 has been deprecated. 
For the time being the scons script still defaults to 
Visual Studio 2008. Be sure to use the right value for 
your version of Visual Studio.

### Build source using the bundled router

The ability to build AllJoyn samples, test code, and unit 
tests using a bundled router was added to the AllJoyn 2.6 
release. Building code with the bundled router option (BR=on) 
is the default value. For most operating systems, including 
Windows, using a bundled router is the only supported configuration.

Valid values for the BR build option are:

* on - (default option) Build all samples and test code using 
the built-in bundled router
* off - Build all samples and test code without using the 
built-in bundled router

Example:

```
scons OS=win7 CPU=x86_64 MSVC_VERSION=10.0 BR=on BINDINGS=cpp,java
```

NOTE: Support for a stand-alone router was removed for Windows 
with the AllJoyn v2.6 release. Using BR=off on Windows will 
result in unusable code. See [AllJoyn Router][alljoyn-router] 
for more information.

### Build C++ unit tests

The AllJoyn framework now includes a basic set of unit tests 
that are built using the Google Test code. To build the unit 
test, you must specify the location of the Google Test 
source code that was obtained in googletest. Use the `GTEST_DIR` 
option to specify the location of Google Test source code.
 
Example:

```
scons OS=win7 CPU=x86_64 MSVC_VERSION=10.0 GTEST_DIR=c:\gtest\gtest-1.6.0
BINDINGS=cpp
``` 

## AllJoyn Router

With the AllJoyn v2.6 release and later, running a standalone 
router is no longer required. All of the functionality of 
the router is now built into each individual application, which means:

* Users of your program no longer need to install a background 
service to run a program that runs the AllJoyn framework.
* Programs get better performance because they no longer 
need to serialize data and send it to a separate service.
* Calling `BusAttachment.Connect()` takes a little longer 
since it now starts up the built-in router.
* The size of the program using the AllJoyn framework is slightly larger.
* If port 9955 is unavailable, the program randomly picks 
another available port to use for device-to-device communication.

### Verify that the AllJoyn project is built properly

1. From the command line, navigate to:

   ```
   <allseen\core\alljoyn>\build{OS}{CPU}{VARIANT}\dist\cpp\bin\samples
   ```

2. Run `basic_service.exe` on one command line.
3. Run `basic_client.exe` on another command line.

   When the client runs, the following will display: 
   (Output may vary slightly from what is shown)

   ```
   AllJoyn Library version: v3.2.0
   AllJoyn Library build info: Alljoyn Library v3.2.0 (Built Fri Jan 18 16:50:19 UTC
   2013)
   Interface Created. BusAttachment started. 
   Initialized winsock 
   Using BundledRouter
   AllJoyn Daemon GUID = e467f6278e751dda9ebe877c612e66a0 (adsdErTQ) 
   BusAttchement connected to tcp:addr=127.0.0.1,port=9956
   BusListener Registered.
   FoundAdvertisedName(name=org.alljoyn.Bus.sample, prefix=org.alljoyn.Bus.sample) 
   NameOwnerChanged: name=org.alljoyn.Bus.sample, oldOwner=<none>, 
   newOwner=:5xRgxpvD.2
   JoinSession SUCCESS (Session id=500568462)
   org.alljoyn.Bus.sample.cat ( path=/sample) returned "Hello World!"
   ```

## Running Unit Tests

NOTE: The following instructions are only valid for AllJoyn 
version 2.6 and newer.

### Running C++ unit tests

If the `GTEST_DIR` option was specified when building the code, 
the C++ unit test will automatically be built and placed in 
the following location: `build\{OS}\{CPU}\{VARIANT}\test\cpp\bin`. 
There will be two executable files there: `cmtest` and `ajtest`.

For all paths, replace `{OS}`, `{CPU}`, and `{VARIANT}` with the 
actual value used when the code was built (i.e., use the 
same `OS`, `CPU`, and `VARIANT` option specified when running SCons).

### cmtest

The cmtest executable, tests the code from the common project 
and does not require the AllJoyn router to be running. 
Run cmtest as follows: 

```
build\{OS}\{CPU}\{VARIANT}\test\cpp\bin\cmtest.exe
```

### ajtest

The ajtest executable tests the code found in alljoyn_core. 
For the tests to run successfully, an AllJoyn router must 
also be running. Currently `ajtest` is limited, it cannot 
test bus-to-bus (i.e., device-to-device) communication. 

Run ajtest as follows:

```
build\{OS}\{CPU}\{VARIANT}\test\cpp\bin\ajtest.exe
```

### Running the Java junit tests

The junit tests are always built the same time as the Java bindings. 
The junit tests are specifically designed to test the Java bindings.

1. Copy and rename from `alljoyn_java\ build.xml.top` to the 
top `build.xml` folder.

   ```
   copy alljoyn_java\build.xml.top build.xml
   ```

2. From the top build folder use ant to start the test.

   ```
   ant test -DOS={OS} -DCPU={CPU} -DVARIANT={VARIANT}
   ```

3. html version of the results can be found in this location:

   `build\{OS}\{CPU}\{VARIANT}\test\java\reports\junit\`

For all paths and commands, replace {OS}, {CPU}, and {VARIANT} 
with the actual value used when the code was built 
(i.e., use the same OS, CPU, and VARIANT option specified 
when running SCons).

## Legacy Build Options
 
The following build options can still be accessed, but are 
no longer officially supported. Support for these options 
may be completely removed without notice in future versions 
of the AllJoyn framework.

### Visual Studio 2008 Legacy Build - Microsoft Windows SDK 7.x

The AllJoyn framework uses either the latest version of 
Windows Cryptography API: Next Generation (CNG) or OpenSSL 
for the AllJoyn security framework. Use of the CNG is recommended 
when it is available. You must meet the following requirements 
to use the CNG for the AllJoyn security framework:

* Running Windows Vista or newer (for Windows XP, see 
[openSSL v1.0.1e for Windows][openSSL-version-windows])
* Using AllJoyn codebase checked out since November 2011
* Using Microsoft Windows SDK 7.x or newer

Currently, Microsoft Visual Studio 2010 uses Windows SDK 7.0a 
by default. If you are using Microsoft Visual Studio 2010 
and you meet the other requirements to use the CNG for the 
AllJoyn security framework, you can skip to the next section. 

Otherwise, use the following instructions to download the 
latest version of the Windows SDK from Microsoft.

1. Open a browser and navigate to http://msdn.microsoft.com/en-us/windows/bb980924.
2. Select **install now**.
3. Proceed through the wizard to complete the Windows SDK installation.

After installing the Windows SDK, set up Microsoft Visual Studio 
to use the just-installed SDK, as follows.

1. Click **Start > All Programs > Microsoft Windows SDK [version] > Visual Studio Registration > Windows SDK Configuration Tool** 
to run the Windows SDK configuration tool.
2. Select the appropriate 7.x version from the **Installed Windows SDK Versions**
drop-down list.
3. Click **Make Current**.

### Microsoft Visual Studio 2008 SP1 or Visual C++ 2008 Feature Pack Release

NOTE: Microsoft Visual Studio 2008 Service Pack 1 (SP1) or the 
Visual C++ 2008 Feature Pack Release is only required if you 
are using Microsoft Visual Studio 2008 to build the AllJoyn framework.
 
The AllJoyn framework uses the hash table libraries specified 
in the C++ Technical Report 1(TR1) (ISO/IEC TR 19768, C++ Library Extensions). 
The hash table libraries were added to the C++ standard after 
Visual C++ 2008 was created. For this reason, the Visual Studio 
2008 SP1 or Visual C++ 2008 Feature Pack release must be 
installed so the TR1 libraries are available while building 
the AllJoyn framework.

#### To install Microsoft Visual Studio 2008 Service Pack 1

1. Open a browser and navigate to http://www.microsoft.com/en-us/download/details.aspx?id=10986.
2. Select **Download**.
3. Select Run.
4. Proceed though the wizard to complete the Microsoft 
Visual Studio 2008 Service Pack 1 installation.
5. After installing SP1, you may have to re-set the SDK Version 
used by Visual Studio to 7.x 
(see [Visual Studio 2008 Legacy Build - Microsoft Windows SDK 7.x][vs-2008-legacy-build-ms-windows-sdk-7x]). 

#### To install Visual C++ 2008 Feature Pack Release

1. Open a browser and navigate to http://www.microsoft.com/en-us/download/details.aspx?id=6922.
2. Select **Download**.
3. Select **Run**.
4. Proceed though the wizard to complete the Visual C++ 2008 
Feature Pack Release installation.



[legacy-build-options]: #legacy-build-options
[vs-2008-legacy-build-ms-windows-sdk-7x]: #visual-studio-2008-legacy-build-microsoft-windows-sdk-7-x
[openssl-version-windows]: #openssl-v101e-for-windows
[msysgit-version-windows]: #msysgit-version-1-8-1-2-for-windows
[adding-environment-variables]: #adding-environment-variables
[alljoyn-router]: #alljoyn-router