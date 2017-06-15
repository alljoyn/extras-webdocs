# Building Thin - Windows

## Prerequisites
* [Build AllJoyn&trade; Core][build-windows]. Building the Thin Core requires libraries provided by the AllJoyn&trade; Core.

## Setup
Obtain AllJoyn&trade; Thin Core Source
* [Download][download] the Thin Core Source and Base Services Thin Client Source
* Extract Thin Core Source into `$AJ_ROOT\core\ajtcl` and Thin Client Base Services Source into `$AJ_ROOT\services\base_tcl`.
    * **NOTE:** The path to the source code must be free of spaces in order for SCons to work properly.
* Alternatively, use git to obtain the Thin Core Source and Base Services:

    ```bat
    > cd $AJ_ROOT\core
    > git clone https://git.allseenalliance.org/gerrit/core/ajtcl.git

    > cd $AJ_ROOT\services
    > git clone https://git.allseenalliance.org/gerrit/services/base_tcl.git
    ```

## Build Thin Core samples
Open a Windows command prompt window and run the following:

* Windows 7:

    ```bat
    > cd $AJ_ROOT\core\ajtcl
    > scons OS=win7 CPU=x86_64 WS=off MSVC_VERSION=12.0

    > cd $AJ_ROOT\services\base_tcl
    > scons OS=win7 CPU=x86_64 WS=off MSVC_VERSION=12.0
    ```

* Windows 10:

    ```bat
    > cd $AJ_ROOT\core\ajtcl
    > scons OS=win10 CPU=x86_64 WS=off MSVC_VERSION=14.0

    > cd $AJ_ROOT\services\base_tcl
    > scons OS=win10 CPU=x86_64 WS=off MSVC_VERSION=14.0
    ```

Binaries for the samples are located at `$AJ_ROOT\core\ajtcl\dist\bin`

[download]: https://allseenalliance.org/framework/download
[build-app-thin-library]:  /develop/tutorial/thin-app
[build-windows]: /develop/building/windows/build-source
