# Building Thin – Linux

## Setup

*Note that the installation commands below refer specifically to Debian/Ubuntu Linux. Equivalent commands are available for other distributions of Linux.* 
* Build tools and libs
```sh 
sudo apt-get install build-essential libgtk2.0-dev libssl-dev xsltproc ia32-libs libxml2-dev 
```
* Install Python v2.6/2.7 (Python v3.0 is not compatible and will cause errors)
```sh
sudo apt-get install python
```
* Installl SCons v2.0
```sh
sudo apt-get install scons
```
* OpenSSL
```sh
sudo apt-get install libssl-dev
```

1. Download the AllJoyn Thin Library Core and AllJoyn Thin Library Services packages from the AllSeen Alliance Website.
 * core/ajtcl
 * services/base_tcl

2. Extract the download packages and set up the directory structure.
```sh
mkdir  alljoyn-dev
export AJ_ROOT=`pwd`/alljoyn-dev
unzip ajtcl-core-14.06.00.zip $AJ_ROOT/core/ajtcl
unzip ajtcl-services-base-14.06.00.zip $AJ_ROOT/services
```

## Build the samples

#### Build the core samples:
```sh
cd $AJ_ROOT/core/ajtcl
scons WS=off
```
Binaries for samples are located at `$AJ_ROOT/core/ajtcl/samples/`

#### Build the services samples:
```sh
cd $AJ_ROOT/services/sample_apps
scons WS=off AJ_TCL_ROOT=../../core/ajtcl
```
Binaries for service samples are located at `$AJ_ROOT/services/sample_apps/build`

#### Build the complete service sample (AC Server):
```sh
cd $AJ_ROOT/services/sample_apps/ACServerSample
scons WS=off AJ_TCL_ROOT=../../../core/ajtcl
```
The binary for the AC Server sample is located at `$AJ_ROOT/services/sample_apps/ACServerSample/build`

## Add the AllJoyn framework to an application

Link to the “Writing your own Thin App section”

