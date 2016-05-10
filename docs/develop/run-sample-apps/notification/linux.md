# Linux - Running Notification Sample Apps

## Running ConsumerService and ProducerBasic Sample Apps

### Prerequisites

Open two terminal windows. In each, navigate to the AllJoyn&trade; root dir, then:

```sh
export AJ_ROOT=`pwd`

# <TARGET CPU> can be either x86_64, x86, or whatever value you set for "CPU=" when running SCons.
export TARGET_CPU=x86

AJ_CPP_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/cpp/lib
AJ_NOTIFICATION_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/lib
AJ_SERVICES_COMMON_LIB=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/services_common/lib

export LD_LIBRARY_PATH=$AJ_CPP_LIB:$AJ_NOTIFICATION_LIB:$AJ_SERVICES_COMMON_LIB:$LD_LIBRARY_PATH
```

### Run the ConsumerService Sample App

In one of the terminal windows, run `ConsumerService`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/bin/ConsumerService
```

### Run the ProducerBasic Sample App

In the other terminal window, run `ProducerBasic`:

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/bin/ProducerBasic
```