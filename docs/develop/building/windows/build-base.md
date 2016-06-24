# Build Base Services From Source - Windows 

## Setup build tools and libs

Refer to instructions for [building Core from source][core].

## Obtain the AllJoyn Base Services source

* Download the [AllJoyn&trade; Base Services source zip][download] and extract
its contents into the `base` directory shown in the tree below. Note, extra
directories may exist.
```bat
AJ_ROOT\
  core\
    alljoyn\
  services\
    base\
```
* Alternatively, use Git:
```bat
C:\> cd %AJ_ROOT%
C:\> mkdir services
C:\> cd services
C:\> git clone https://git.allseenalliance.org/gerrit/services/base.git
```

## Building the Base Services 

Navigate to the directory of the service you would like to build:

```bat
C:\> cd $AJ_ROOT\services\base
C:\>
C:\> REM Perform one of the following:
C:\> cd controlpanel
C:\> cd onboarding
C:\> cd notification
C:\> cd sample_apps &REM Contains ServerSample application
```

Then call `scons` with the following arguments:
```bat
C:\> cmd /c scons ALLJOYN_DISTDIR={PATH} OS={OS} CPU={CPU} BINDINGS=cpp MSVC_VERSION={VERSION} ^ 
VARIANT={VARIANT} CRYPTO={CRYPTO} DOCS={DOCS} WS={WS}
```

* ALLJOYN_DISTDIR - A path to the `dist` directory created from [building
AllJoyn Core from source][core].
* OS - This tells Scons the operating system you would like to target. For
Windows 7, pass `OS=win7`. For Windows 10, pass `OS=win10`.
* CPU - This specifies the target CPU. For 32-bit, pass `CPU=x86`. For 64-bit,
pass `CPU=x86_64`.
* BINDINGS - Currently, for native Windows applications, only the C++ language
bindings are available.
* MSVC_VERSION - This tells Scons which version of the Visual C++ compiler you
are using. For Visual C++ 2012, pass `MSVC_VERSION=11.0`. For Visual C++ 2013,
pass `MSVC_VERSION=12.0`. For Visual C++ 2015, pass `MSVC_VERSION=14.0`. If
using an Express Edition, append `Exp`, e.g. `MSVC_VERSION=14.0Exp`.
* VARIANT - Select the build variant to build. For debug, pass `VARIANT=debug`.
For release, pass `VARIANT=release`.
* CRYPTO - To build AllJoyn crypto, use `CRYPTO=builtin`. To use crypto
implementations in OpenSSL, pass `CRYPTO=openssl`. To use Windows'
implementation, pass `CRYPTO=cng`.
* DOCS - To build API documentation, set the value of `DOCS` to the format in
which you would like the documentation. Pass either `DOCS=html` or `DOCS=pdf`.
The documentation will be placed in `<base_service>/cpp/docs/html`.
* WS - If you are contributing changes to AllJoyn, you should run your builds
with the whitespace checker enabled with `WS=check`. If the whitespace policy
checker reports a whitespace policy violation, it lists which files have the
violation. To see the lines of code that are violating the AllJoyn whitespace
policy, run `WS=detail`. Uncrustify can automatically fix your files to adhere
to the whitespace policy with `WS=fix`.

**NOTE:** For a full list of SCons command line options to build
the AllJoyn Base Services, enter `scons --help`.

The libraries and sample apps that have been built can be found in the
following directories:
```bat
C:\> REM Sample apps
C:\> %AJ_ROOT%\services\base\<service>\build\{OS}\{CPU}\{VARIANT}\dist\<service>\bin 
C:\> REM Library
C:\> %AJ_ROOT%\services\base\<service>\build\{OS}\{CPU}\{VARIANT}\dist\<service>\lib
```

[core]: /develop/building/windows/build-source
[download]: https://allseenalliance.org/framework/download
