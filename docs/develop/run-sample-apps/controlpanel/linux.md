# Linux - Running Control Panel Sample Apps

## Running ControlPanelSample, ControlPanelController Sample Apps

### Prerequisites

Open two terminal windows. In each, navigate to the AllJoyn&trade; root dir, then:

```sh
export AJ_ROOT=`pwd`

# Set $TARGET CPU to the "CPU=" value used when running scons, e.g. x86_64, x86.
export TARGET_CPU=x86

AJ_CPP_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/cpp/lib
AJ_NOTIFICATION_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/lib
AJ_CONTROLPANEL_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/lib
AJ_SERVICES_COMMON_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/services_common/lib

export LD_LIBRARY_PATH=$AJ_CPP_LIB:$AJ_CONTROLPANEL_LIB:$AJ_NOTIFICATION_LIB:$AJ_SERVICES_COMMON_LIB:$LD_LIBRARY_PATH
```
  
### Run the Control Panel Sample App

In one of the terminal windows, run `ControlPanelSample`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/bin/ControlPanelSample
```

### Run the Control Panel Controller Sample App

In the other terminal window, run `ControlPanelController`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/bin/ControlPanelController
```
