# Building Thin From Source - Linux

**NOTE:** The installation commands below refer specifically to Ubuntu 14.04 Linux. Some commands may be different for other distributions of Linux.

## Build tools and libraries

Open a terminal window and run the following commands:

```sh
$ sudo apt-get install build-essential libssl-dev xsltproc libxml2-dev
```

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

* Define AJ_ROOT

```sh
mkdir $HOME/alljoyn_src
export AJ_ROOT=$HOME/alljoyn_src
```

* Get AllJoyn&trade; source
    * Download the [source zip][download] and extract Core source into
    `$AJ_ROOT/core/ajtcl/` and Base Services source into
    `$AJ_ROOT/services/base_tcl/`
    * Alternatively, use git:
    ```sh
    $ cd $AJ_ROOT
    $ mkdir core/
    $ cd core
    $ git clone https://git.allseenalliance.org/gerrit/core/ajtcl.git
    $
    $ cd $AJ_ROOT
    $ mkdir services/
    $ cd services
    $ git clone https://git.allseenalliance.org/gerrit/services/base_tcl.git
    ```

```sh
$ sudo make install
```

## Doxygen

The Doxygen tool builds HTML documentation from source code. It is not required for building AllJoyn binaries.

Open a terminal window and run the following command:

```sh
$ sudo apt-get install doxygen
```
## Environmental Variables
The build environment variables are explained in [Environment Variables](https://allseenalliance.org/framework/documentation/develop/building/linux/build-source#environmental-variables) of the core build source instructions.

## Obtain the AllJoyn source

**NOTE:** Use if you did not add this to .bashrc earlier.

```sh
$ export AJ_ROOT=$HOME/alljoyn_src
```
Open a terminal window and run the following commands.

```sh
$ mkdir -p $AJ_ROOT/core
$ cd $AJ_ROOT/core
$ git clone https://git.allseenalliance.org/gerrit/core/ajtcl.git
```

To obtain the Thin Base Serivices run:

```sh
$ mkdir -p $AJ_ROOT/services
$ cd $AJ_ROOT/services
$ git clone https://git.allseenalliance.org/gerrit/services/base_tcl.git
```


## Building Thin Core

Use the following commands to build the AllJoyn framework for Linux.

Open a terminal window and run the following command:

```sh
$ cd $AJ_ROOT/core/ajtcl
$ scons WS=off
```

Binaries for samples are located at `$AJ_ROOT/core/ajtcl/dist/bin/`

## Building Thin Base Services:

```sh
$ cd $AJ_ROOT/services/base_tcl/
$ scons WS=off
```

Binaries for service samples are located at
`$AJ_ROOT/services/base_tcl/dist/bin/`

## SCons Build Flags

These are various flags to be run with SCons.  These are optional.  Unless you're looking for a specific flag, you can skip to the Running the AllJoyn Applications section.

### Help

To see a full list of SCons build flags for thin core, use the following:

```sh
scons -h
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

## Add the AllJoyn framework to an application

See the [Build an Application using the Thin Library][build-app-thin-library]
section for instructions.

[download]: https://allseenalliance.org/framework/download
[build-app-thin-library]:  /develop/tutorial/thin-app
