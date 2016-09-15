# Build From Source - Linux

**NOTE:** The installation commands below refer specifically to Ubuntu 14.04 Linux. Some commands may be different for other distributions of Linux.

## Build tools and libraries

Open a terminal window and run the following commands:

```sh
$ sudo apt-get update
$ sudo apt-get install build-essential libgtk2.0-dev libssl-dev xsltproc libxml2-dev libcap-dev
```

To create a 32-bit build of the AllJoyn™ framework on a 64-bit operating system, install these required development libraries:

```sh
$ sudo apt-get install gcc-multilib g++-multilib libc6-i386 libc6-dev-i386 libssl-dev:i386 libxml2-dev:i386
```

**NOTE:** libssl-dev does not have multilib support. If the 32-bit version of libssl-dev is installed, then the 64-bit version is replaced with the 32-bit version. You can delete the 32-bit version of the libraries and reinstall the 64-bit version if you wish to go back to 64-bit. libssl-dev is not required if building AllJoyn with the CRYPTO=builtin option.

## Python v2.6/2.7

Python is a common part of most Linux distributions. You can determine whether Python is already installed on your system by opening a terminal window and running the following command:

```sh
$ which python
```

If a path is returned, Python is already installed.  Otherwise, run the following command:

```sh
$ sudo apt-get install python
```

## SCons

SCons is a software construction tool used to build the AllJoyn framework. SCons is a default package on most Linux distributions.

**NOTE:** AllJoyn's builds are verified with SCons v2.3.

Open a terminal window and run the following command to install scons:

```sh
$ sudo apt-get install scons
```

## Git

Git is a source code repository access tool. The AllJoyn source code is stored in a set of git projects.

Open a terminal window and run the following command to install git:

```sh
$ sudo apt-get install git-core
```

## Uncrustify

Uncrustify is a source code formatting tool used to maintain a consistent coding style in the AllJoyn code base. It is not required to build AllJoyn, but if you intend to contribute code changes to the AllJoyn project you should configure and use the tool.

**NOTE:** Uncrustify v0.61 is required for AllJoyn v15.04 and later.  Since the existing AllJoyn code was formatted with a specific version of uncrustify, using any other version of uncrustify can cause unexpected build errors when not building with the WS=off option.

**NOTE:** If using Alljoyn v14.12 or earlier, use Uncrustify v0.57 in these steps.

Download the source and then build and install Uncrustify:

```sh
$ cd $HOME
$ git clone http://github.com/bengardner/uncrustify.git
$ cd uncrustify
$ git checkout uncrustify-0.61
$ sudo apt-get install autoconf
$ autoreconf
$ ./configure
$ sudo make install
```

**NOTE:** In some cases, Uncrustify v0.57 has failed to build.  Try making the following change to get Uncrustify to build:

Open a terminal window, copy and paste the following:

```sh
git apply - << EOF
diff --git a/src/uncrustify.cpp b/src/uncrustify.cpp
index 2635189..7aba76d 100644
--- a/src/uncrustify.cpp
+++ b/src/uncrustify.cpp
@@ -32,6 +32,7 @@
 #ifdef HAVE_STRINGS_H
 #include <strings.h>  /* strcasecmp() */
 #endif
+#include <unistd.h>

 /* Global data */
 struct cp_data cpd;
EOF
```

Press enter, then run make install again.

```sh
$ sudo make install
```

## Doxygen

The Doxygen tool builds HTML documentation from source code. It is not required for building AllJoyn binaries.

Open a terminal window and run the following command:

```sh
$ sudo apt-get install doxygen
```

## Graphviz

The Graphviz Dot tool diagrams class hierarchies and is used by doxygen.

```sh
$ sudo apt-get install graphviz
```

## TeX Live

TeX Live provides LaTeX binaries and style sheets for Linux. This optional tool may be used to produce AllJoyn's API documentation as a PDF document from the source. It is possible to compile the AllJoyn framework without producing the documentation.

**NOTE:** This install takes a few minutes.  If you are not building the PDF documentation, skip to the next section to save time.

Open a terminal window and run the following command:

```sh
$ sudo apt-get install texlive
```

## Gecko SDK

The Gecko SDK (aka XULRunner SDK) is required if you are building the AllJoyn JavaScript plug-in.

**NOTE:** This install takes a few minutes.  If you are not building the JavaScript plug-in, skip to the next section to save time.

**NOTE:** The plug-in was developed against version 1.9.2 of the SDK, although it may be possible to use an earlier version.

1. Open a browser and navigate to https://developer.mozilla.org/en/Gecko_SDK
2. From the Downloading section, download Gecko 1.9.2 (Linux i686).

Open a terminal window and run the following commands:

```sh
$ cd $HOME/Downloads
$ tar -xjvf xulrunner-3.6.28.en-US.linux-i686.sdk.tar.bz2
$ mv xulrunner-sdk/ $HOME
```

**NOTE:** Download the 32bit version even when running 64bit OS as there is only a 32bit version available.

**NOTE:** This will give you the path ($HOME/xulrunner-sdk) for the GECKO_BASE variable defined later.

## Install Java

The AllJoyn framework requires Oracle Java.  The quickest way to install the correct version is using the following PPA.

**NOTE:** If you are not building Java, skip to the next section to save time.

**NOTE:** At the time of writing, this PPA contains only an installer to download Oracle Java.  However, it is not maintained by Ubuntu.  Use at your own risk.

Open a terminal window and run the following commands:

```sh
$ sudo apt-add-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
```

Accept the license.

```sh
$ java -version
```

Your output should look similar to this:
* java version “1.8.0_91”
* Java(TM) SE Runtime Environment (build 1.8.0_91-b14)
* Java HotSpot(TM) 64-Bit Server VM (build 25.91-b14, mixed mode)

## Junit

Junit is a testing framework for Java and 4.9 or newer is required when building the Alljoyn Java bindings.

1. Navigate to https://github.com/junit-team/junit/wiki/Download-and-Install
2. Click on junit.jar link.
3. Click on the ‘jar’ link next version 4.12.
4. Save the file to Downloads.
5. Open a terminal window and run the following commands.

```sh
$ cd $HOME/Downloads
$ sudo cp junit-4.12.jar /usr/share/java/
```

If you want to run junit tests, install the Apache Ant build tool.

**NOTE:** This is only required to run junit tests, not required to build the AllJoyn framework.

```sh
$ sudo apt-get install ant
```

## Google Test

Google Test is Google's framework for writing C++ tests. Google Test is an xUnit testing architecture used by the AllJoyn framework to test its C++ APIs. Google Test is only required for building the C++ unit tests.

Open a terminal window and run the following commands:

```sh
$ cd $HOME
$ git clone https://github.com/google/googletest.git
$ cd googletest
$ git checkout release-1.7.0
```

**NOTE:** Do not use apt-get install libgtest-dev. Download the source code from github.com.

## Environment Variables

**NOTE:** These will be added individually in this document, but to save time you can add these to your shell config file ($HOME/.bashrc).

```sh
$ export AJ_ROOT=$HOME/alljoyn_src
$ export CPU=x86_64
$ export OS=linux
$ export JAVA_HOME=/usr/lib/jvm/java-8-oracle
$ export CLASSPATH=/usr/share/java/junit-4.12.jar
$ export GECKO_BASE=$HOME/xulrunner-sdk
$ source $HOME/.bashrc
```

**NOTE:** For CPU, select your architecture.  Use x86 for 32bit, x86_64 for 64bit, arm for ARM, etc.
**NOTE:** The path specified for the JAVA HOME environment variable is the path to the jdk directory.
**NOTE:** The path specified for the CLASSPATH environment variable is the full path name to the junit jar file that was downloaded earlier.
**NOTE:** GECKO_BASE is only needed if building with Javascript (js) bindings.

## Obtain the AllJoyn source

**NOTE:** Use if you did not add this to .bashrc earlier.

```sh
$ export AJ_ROOT=$HOME/alljoyn_src
```
Open a terminal window and run the following commands.

```sh
$ mkdir -p $AJ_ROOT/core
$ cd $AJ_ROOT/core
$ git clone https://git.allseenalliance.org/gerrit/core/alljoyn.git
```

## Building the AllJoyn Framework

Use the following commands to build the AllJoyn framework for Linux.

**NOTE:** Use if you did not add these to .bashrc earlier.

```sh
$ export JAVA_HOME=/usr/lib/jvm/java-8-oracle
$ export CLASSPATH=/usr/share/java/junit4.12.jar
$ export GECKO_BASE=$HOME/xulrunner-sdk
```

Open a terminal window and run the following command:

```sh
$ cd $AJ_ROOT/core/alljoyn
$ scons BINDINGS=<comma separated list(cpp,java,c,js)> # example: scons BINDINGS=cpp,java
```

## Build the API documentation

By default, the AllJoyn API documentation is not built during the build stage (except for Java Docs).  This is optional.  To build the API documentation use the following commands:

```sh
$ scons DOCS=html
$ scons DOCS=pdf
```

The documentation will be placed in the following locations:

* /$AJ_ROOT/core/alljoyn/build/linux/x86_64/dist/cpp/docs/html/index.html
* /$AJ_ROOT/core/alljoyn/build/linux/x86_64/dist/cpp/docs/pdf/alljoyn_api_manual.pdf 

## SCons Build Flags

These are various flags to be run with SCons.  These are optional.  Unless you're looking for a specific flag, you can skip to the Running the AllJoyn Applications section.

### Help

To see a list of SCons build flags, use the following:

```sh
$ scons -h
```

### Whitespace policy checker

By default, the whitespace policy checker does not run. If you are contributing changes to AllJoyn, you should run your builds with the whitespace checker enabled:

```sh
$ scons WS=check
```

If the whitespace policy checker reports a whitespace policy violation, it lists which files have the violation. To see the lines of code that are violating the AllJoyn whitespace policy, run:

```sh
$ scons WS=detail
```

Uncrustify can automatically fix your files to adhere to the whitespace policy with this:

```sh
$ scons WS=fix
```

### Build variant

By default, the AllJoyn framework builds as debug variant. To build as release, use this:

```sh
$ scons VARIANT=release
```

### Bindings options

The default SCons script tries to build all of the language bindings by default. If you are only interested in a particular language binding, the BINDINGS option can be used to select the language(s) of interest.

The BINDINGS option takes a comma-separated list of languages to build. Current valid languages are cpp, c, java, and js. The language is always specified in all lower case with no extra spaces between languages. Any dependencies will automatically be built. For example, java requires that cpp is built. If an empty string is used only the core files will be built.

For example:

* alljoyn_core and common only: scons BINDINGS=
* C: scons BINDINGS=c
* C++: scons BINDINGS=cpp
* Java: scons BINDINGS=java
* Javascript: scons BINDINGS=js
* Multiple: scons BINDINGS=cpp,java

### Crypto options

AllJoyn v15.04 and above adds a CRYPTO option to the scons command line. To build AllJoyn without dependencies on OpenSSL libcrypto, use CRYPTO=builtin:

```sh
$ scons CRYPTO=builtin
```

To use crypto implementations in OpenSSL:

```sh
$ scons CRYPTO=openssl
```

### PolicyDB option

AllJoyn v14.06 and above provides functionality that can be compiled into AllJoyn routers that acts as firewall/filter for delivering messages. The POLICYDB option controls whether this functionality is included or not. It can be set to either on or off.

**NOTE:** The default policy rules are for the AllJoyn router to behave as though PolicyDB is excluded. Therefore, the default is to not include PolicyDB.

```sh
$ scons POLICYDB=on
```

## Build C++ unit tests

The AllJoyn framework now includes a set of unit tests that are built using the Google Test C++ framework.  These are optional.  To build the unit test, the location of the Google Test source code must be specified as explained in the Google Test section above.

Use the GTEST_DIR option to specify the location of the Google Test source code.

```sh
$ scons GTEST_DIR=$HOME/googletest
```

## Running the AllJoyn Applications

It is possible to bundle the routing node in an AllJoyn application, which means the alljoyn-daemon does not have to be run separately

### Install AllJoyn Framework

```sh
$ sudo cp $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin/alljoyn-daemon /usr/bin
$ sudo find $AJ_ROOT/core/alljoyn/build -name "*\.so" -exec cp {} /usr/lib \;
```

### Create init.d script

To make starting and stopping AllJoyn easier, create an init.d script.

Open a terminal window, copy and paste the following, then press enter:

```sh
cat <<'EOF' > $HOME/alljoyn.init
#!/bin/sh
### BEGIN INIT INFO
# Provides: alljoyn-daemon
# Required-Start: $local_fs $network $named $time $syslog
# Required-Stop: $local_fs $network $named $time $syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Description: Provides the standalone AllJoyn bus.
### END INIT INFO

SCRIPT=alljoyn-daemon
RUNAS=root
NAME=alljoyn
PIDFILE=/var/run/$NAME.pid
LOGFILE=/var/log/$NAME.log

start() {
  if [ -f $PIDFILE ] && kill -0 $(cat $PIDFILE); then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service…' >&2
  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

uninstall() {
  echo -n "Are you really sure you want to uninstall this service? That cannot be undone. [yes|No] "
  local SURE
  read SURE
  if [ "$SURE" = "yes" ]; then
    stop
    rm -f "$PIDFILE"
    echo "Notice: log file was not removed: '$LOGFILE'" >&2
    update-rc.d -f <NAME> remove
    rm -fv "$0"
  fi
}

status() {
  printf "%-50s" "Checking $NAME..."
  if [ -f $PIDFILE ]; then
    PID=$(cat $PIDFILE)
    if [ -z "$(ps axf | grep ${PID} | grep -v grep)" ]; then
      printf "%s\n" "The process appears to be dead but pidfile still exists"
    else
      echo "Running, the PID is $PID"
    fi
  else
    printf "%s\n" "Service not running"
  fi
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  status)
    status
    ;;
  uninstall)
    uninstall
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|status|restart|uninstall}"
esac
EOF
```

After the script is created, use the following commands:

```sh
$ chmod a+x $HOME/alljoyn.init
$ sudo cp $HOME/alljoyn.init /etc/init.d/alljoyn
```

Test starting and stopping the newly create service.

```sh
$ sudo service alljoyn start
$ sudo service alljoyn stop
```

### Setup

After building AllJoyn, the directory structure will reflect the variables that are used. The next sections will assume that the variables are defined as follows.
* $AJ_ROOT/core/alljoyn/build/{OS}/{CPU}/{VARIANT}/
* {OS} = linux
* {CPU} = x86_64
* {VARIANT} = debug

These variables result in the following path:

* $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/

The SCons script builds a shared library and links against that shared library. Add the library to the link path.

```sh
$ export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/lib
```

This will prevent the error:

```sh
error while loading shared libraries: liballjoyn.so: cannot open shared object file: No such file or directory
```

**Note**: This will only apply to the current terminal session. It will have to be run for each new terminal.

## Running a Sample Application

Open a terminal window and run the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin
$ ./bbservice -n com.test
```

Open another terminal window and type the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin
$ ./bbclient -n com.test -d -s
```

Check for the following output on bbclient:

```sh
Sending "Ping String 1" to org.alljoyn.alljoyn_test.my_ping synchronously
com.test.my_ping ( path=/org/alljoyn/alljoyn_test ) returned "Ping String 1"
```

## AllJoyn router executable

It is also possible to run a stand-alone routing node.  As part of the build process, an executable for the alljoyn-daemon is built.

Open a terminal window and run the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin
$ ./alljoyn-daemon --internal
```

**NOTE:** Press **Ctrl-c** at any time to stop the alljoyn-daemon process.

This starts the AllJoyn router with a built-in default configuration. For most users the command listed is sufficient to run the AllJoyn framework.

To display other options, type the following:

```sh
$ ./alljoyn-daemon -h
```

Some of the more common options include:

* Use the specified configuration file.
  * --config-file=FILE
* Print the socket address to STDOUT.
  * --print-address
* Disable the Bluetooth transport (override config file setting).
  * --no-bt
* Set the logging level to LEVEL.
  * --verbosity=LEVEL
* Print the version and copyright string, and exit.
  * --version

Example:
```sh
$ alljoyn-daemon [--config-file=FILE] [--print-address] [--verbosity=LEVEL] [--no-bt] [--version]
```

An example configuration file can be found in this directory:
* $AJ_ROOT/core/alljoyn/alljoyn_core/router/test/conf

### Verify that the router is running

Open a terminal window, type the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin/samples
$ ./basic_service
```

Open another terminal window and type the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin/samples
$ ./basic_client
```

When the client runs, the following will display:

```sh
AllJoyn Library version: v0.00.01.
AllJoyn Library build info: AllJoyn Library v0.00.01 (Built Tue Jul 05 19:35:15 UTC 2016
Interface 'org.alljoyn.Bus.sample' created.
BusAttachment started.
BusAttachment connected to 'null:'.
BusListener Registered.
org.alljoyn.Bus.FindAdvertisedName ('org.alljoyn.Bus.sample') succeeded.
Waited 0 seconds for JoinSession completion.
FoundAdvertisedName(name='org.alljoyn.Bus.sample', transport = 0x100, prefix='org.alljoyn.Bus.sample')
NameOwnerChanged: name='org.alljoyn.Bus.sample', oldOwner='<none>', newOwner=':WIIVs8NB.2'.
JoinSession SUCCESS (Session id=263863050).
'org.alljoyn.Bus.sample.cat' (path='/sample') returned 'Hello World!'.
Basic client exiting with status 0x0000 (ER_OK).
```

## Running Unit Tests

### Running C++ unit tests

If the GTEST_DIR option was specified when building the code, the C++ unit tests will automatically be built and placed in the following location:

* $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/test/cpp/bin

There will be two executable files there: ajtest and cmtest.

#### cmtest

The cmtest executable tests the code from the common project and does not require the AllJoyn router to be running.

Open a terminal window, type the following commands:

```sh
$ $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/test/cpp/bin/cmtest
```

#### ajtest

The ajtest executable tests the code found in alljoyn_core. For the tests to run successfully, an AllJoyn router must also be running. Currently, ajtest is limited; it cannot test bus-to-bus (i.e., device-to-device) communication. Run ajtest as follows:

Open a terminal window, type the following commands:

```sh
$ $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/dist/cpp/bin/alljoyn-daemon --internal
```

Open another terminal window and type the following commands:

```sh
$ $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/test/cpp/bin/ajtest
```

**NOTE:** If the code was built using the bundled router (i.e., SCons flag BR=on), then ajtest can be run without first starting the separate alljoyn-daemon.

### Running the Java junit tests

The junit tests are always built at the same time as the Java bindings. The junit tests are specifically designed to test the Java bindings.

Open a terminal window, type the following commands:

```sh
$ cd $AJ_ROOT/core/alljoyn/
$ ant test -DOS=linux -DCPU=x86_64 -DVARIANT=debug
```

Find the HTML version of the results in the following location:
* $AJ_ROOT/core/alljoyn/build/linux/x86_64/debug/test/java/reports/junit/

### Additional projects
The AllJoyn source code has other projects, such as alljoyn_js (javascript), and alljoyn_c (C bindings). These bindings are supported in all versions of Alljoyn.  The build instructions for these projects are outside the scope of this section. For more information, see https://allseenalliance.org.
