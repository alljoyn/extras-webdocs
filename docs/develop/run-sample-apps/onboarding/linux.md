# Linux - Running Onboarding Sample Apps

## Running OnboardingClient and OnboardingService Apps

### Prerequisites

[Build the linux applications][build-linux] and prepare their running environment. 

Each terminal environment must be prepared with the following steps:

```sh
# Navigate to the AllJoyn root directory to begin
export AJ_ROOT=`pwd`

# <TARGET CPU> can be either x86_64, x86, or whatever value you set for "CPU=" when running SCons.
export TARGET_CPU=$(uname -m)

# <CONFIGURATION> can be either debug or release
export CONFIGURATION=debug

export AJ_DIST="$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/$CONFIGURATION/dist"

export LD_LIBRARY_PATH=$AJ_DIST/cpp/lib:$AJ_DIST/about/lib:$AJ_DIST/onboarding/lib:$AJ_DIST/config/lib:$AJ_DIST/services_common/lib:$LD_LIBRARY_PATH
```

### Run the Onboarding Service Sample

In one terminal window, run the *Onboarding Service* application:

```sh
$AJ_DIST/onboarding/bin/onboarding-daemon
```

**NOTE:** The *Onboarding Service* sample app is just a stub implementation of onboarding, no Wi-Fi switching actually occurs.

### Run the Onboarding Client Sample

In the other terminal window, run the *Onboarding Client* application:

```sh
$AJ_DIST/onboarding/bin/OnboardingClient
```

**NOTE:** The *Onboarding Client* sample app uses hard-coded configuration values for SSID, passcode, and authtype.


[build-linux]: /develop/building/linux
