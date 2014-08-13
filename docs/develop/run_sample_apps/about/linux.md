# Linux - Running About Sample Apps

## Running Linux AboutClient and AboutService Apps

### Prerequisites

1. Open two terminal windows.
2. In each, navigate to the AllJoyn root dir, then:

```
export AJ_ROOT=`pwd`

# <TARGET CPU> can be either x86_64, x86, or whatever value you set for "CPU=" when running SCons.
export TARGET_CPU=x86

export LD_LIBRARY_PATH=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/cpp/lib:$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/about/lib:$LD_LIBRARY_PATH
```

### Run the AboutService Sample App

In one of the terminal windows, run `AboutService`:

```
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/about/bin/AboutService
```

### Run the AboutClient Sample App

In the other terminal window, run `AboutClient`:

```
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/about/bin/AboutClient
```
