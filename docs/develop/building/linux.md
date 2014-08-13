# Building Linux

## Setup

1. Download the [AllJoyn Source zip][download].
2. Extract source.

## Building Samples

```
cd alljoyn-14.06.00-src/core/alljoyn
scons BINDINGS=cpp WS=off BT=off ICE=off SERVICES="about,notification,controlpanel,config,onboarding,sample_apps"
```

## Building the AllJoyn&trade; framework for an existing app

1. Setup

``` 
  export AJ_ROOT=~/alljoyn

  # <TARGET CPU> can be either x86_64, x86, or whatever value you set for CPU= when running SCons.
  export AJ_DIST="$AJ_ROOT/core/alljoyn/build/linux/<TARGET CPU>/debug/dist"
```

2. Add header include directories.

```
  export CXXFLAGS="$CXXFLAGS \
      -I$AJ_DIST/cpp/inc \
      -I$AJ_DIST/about/inc \
      -I$AJ_DIST/services_common/inc \
      -I$AJ_DIST/notification/inc \
      -I$AJ_DIST/controlpanel/inc \
      -I$AJ_DIST/services_common/inc \
      -I$AJ_DIST/samples_common/inc"
```

3. Configure linker to include required libs.

```
  export LDFLAGS="$LDFLAGS \
      -L$AJ_DIST/cpp/lib \
      -L$AJ_DIST/about/lib \
      -L$AJ_DIST/services_common/lib \
      -L$AJ_DIST/notification/lib \
      -L$AJ_DIST/controlpanel/lib"
```

[download]: /download
