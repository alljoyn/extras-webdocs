# Building Linux

## Getting Started

* For instructions on how to obtain and build the AllJoyn&trade; Core source
for Linux, go [here][core].
* For instructions on how to obtain and build the AllJoyn&trade; Base Services
source for Linux, go [here][base]. Please note that building Core is a
prerequisite for Base Services. 

## Add the AllJoyn&trade; framework to an existing app

* Setup

```sh
  export AJ_ROOT=~/alljoyn

  # <TARGET CPU> can be either x86_64, x86, or whatever value you set for CPU= when running SCons.
  export AJ_DIST="$AJ_ROOT/core/alljoyn/build/linux/<TARGET CPU>/debug/dist"
  export NS_DIST="$AJ_ROOT/services/base/notification/build/linux/<TARGET CPU>/debug/dist"
  export CPS_DIST="$AJ_ROOT/services/base/controlpanel/build/linux/<TARGET CPU>/debug/dist"
  export OS_DIST="$AJ_ROOT/services/base/onboarding/build/linux/<TARGET CPU>/debug/dist"
  export SC_DIST="$AJ_ROOT/services/base/services_common/build/linux/<TARGET CPU>/debug/dist"
```

* Add header include directories

```sh
export CXXFLAGS="$CXXFLAGS \
    -I$AJ_DIST/cpp/inc \
    -I$NS_DIST/notification/inc \
    -I$CPS_DIST/controlpanel/inc \
    -I$OS_DIST/onboarding/inc \
    -I$SC_DIST/services_common/inc"
```

* Configure linker to include required libs

```sh
export LDFLAGS="$LDFLAGS \
    -L$AJ_DIST/cpp/lib \
    -L$NS_DIST/notification/lib \
    -L$CPS_DIST/controlpanel/lib \
    -L$OS_DIST/onboarding/lib \
    -L$SC_DIST/services_common/lib"
```

[download]: https://allseenalliance.org/framework/download
[core]: /develop/building/linux/build-source
[base]: /develop/building/linux/build-base
