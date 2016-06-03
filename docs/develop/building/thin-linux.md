# Building Thin - Linux

## Setup

**NOTE:** The installation commands below refer specifically to
Debian/Ubuntu Linux. Equivalent commands are available for other distributions
of Linux.

* Build tools and libs

```sh
sudo apt-get install build-essential libgtk2.0-dev libssl-dev xsltproc ia32-libs libxml2-dev
```

* Install Python v2.6/2.7 (Python v3.0 is not compatible and will cause errors)

```sh
sudo apt-get install python
```

* Installl SCons v2.0.

```sh
sudo apt-get install scons
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

## Building

#### Building Core:

```sh
$ cd $AJ_ROOT/core/ajtcl/
$ scons WS=off
```

Binaries for samples are located at `$AJ_ROOT/core/ajtcl/dist/bin/`

#### Building Base Services:

```sh
$ cd $AJ_ROOT/services/base_tcl/
$ scons WS=off
```

Binaries for service samples are located at
`$AJ_ROOT/services/base_tcl/dist/bin/`

## Add the AllJoyn framework to an application

See the [Build an Application using the Thin Library][build-app-thin-library]
section for instructions.

[download]: https://allseenalliance.org/framework/download
[build-app-thin-library]:  /develop/tutorial/thin-app
