# Building iOS

## Getting Started

* For instructions on how to obtain and build the AllJoyn&trade; Core source
for iOS, go [here][core].
* For instructions on how to obtain and build the AllJoyn&trade; Base Services
source for iOS, go [here][base]. Please note that building Core is a
prerequisite for Base Services. 

## Add the AllJoyn&trade; framework to an iOS application

1. Make sure you know the location of the AllJoyn SDK folder.
The AllJoyn SDK folder contains your build, services, and alljoyn_objc folders.
2. Open Xcode, open your project, and select the root of the tree in
Project Navigator. Then select the app's target under __Targets__.

#### Add the AllJoyn Core library and dependencies:

1. Select the __Building Settings__ tab for the app target. Click the __All__
option at the top of the list.
2. At the top of the Build Settings list, click __Architectures__ and then
select __Standard architectures (armv7, armv7s)__.
3. Set __Build Active Architecture only__ to __Yes__.
4. Scroll down to the Linking section, and set __Other Linker Flags__ to the
following:

  `-lalljoyn -lajrouter -lBundledRouter.o -lssl -lcrypto`
5. Scroll down to the list of settings until you see the __Search Paths__
group.
6. Double-click the __Header Search Paths__ field and enter the following:

  `$(ALLJOYN_ROOT)/core/alljoyn/build/darwin/arm/$(PLATFORM_NAME)/$(CONFIGURATION)/dist/cpp/inc`
  `$(ALLJOYN_ROOT)/core/alljoyn/alljoyn_objc/AllJoynFramework/AllJoynFramework/`

7.  Double-click the __Library Search Paths__ field and enter the following:

  `$(ALLJOYN_ROOT)/core/alljoyn/build/darwin/$(CURRENT_ARCH)/$(PLATFORM_NAME)/$(CONFIGURATION)/dist/cpp/lib`
  `$(OPENSSL_ROOT)/build/$(CONFIGURATION)-$(PLATFORM_NAME)`

8.  Look through the Build Settings table until you see the __Apple LLVM 5.0 -
Language - C++__ group and set the following:
  * __Enable C++ Exceptions__ to __No__.
  * __Enable C++ Runtime Types__ to __No__.
  *	__C++ Language Dialect__ to __Compiler Default__.

9.  Look through the Build Settings table until you see the __Apple LLVM 5.0 -
Custom Compiler Flags__ group and set the following:
  * Enter the following in the __Other C Flags__ field for Debug field:

      `-DQCC_OS_GROUP_POSIX -DQCC_OS_DARWIN`

  * Enter the following in the __Other C Flags__ field for Release field:

      `-DNS_BLOCK_ASSERTIONS=1 -DQCC_OS_GROUP_POSIX -DQCC_OS_DARWIN`

10.  Look through the Build Settings table until you see the __Apple LLVM 5.0 -
Language__ group and set the following:
  * __C Language Dialect__ to __Compiler Default__.
  * __Compile Sources As__ to __Objective-C++__.
11.  Select the __Build Phases__ tab.
12.  Expand the __Link Binary With Libraries__ group and click the + sign at
the lower left corner. A dialog will appear.
  1. Select the SystemConfiguration.framework file.
  2.  Click the + button again and add the following libraries to link against,
  if not already included:
    * libstdc++.6.0.9.dylib
    * libstdc++.6.dylib
    * libstdc++.dylib
    * libc++abi.dylib
    * libc++.1.dylib
    * libc++.dylib

#### Add the service frameworks
1. Select the __Build Phases__ tab for the app target. Click the __All__ option
at the top of the list.
2. Under __Link Binary with Libraries__, click on the '+' button, choose __Add
Other...__, and add the following:

  __General libs__ (needed by all apps using one or more service frameworks):
  * `$(AJ_ROOT)/core/alljoyn/build/darwin/arm/$(PLATFORM_NAME)/$(CONFIGURATION)/dist/about/lib/`
    * liballjoyn_about_cpp.a
    * liballjoyn_about_objc.a
    * libAllJoynFramework_iOS.a
  * `$(AJ_ROOT)/services/base/services_common/ios/samples/alljoyn_services_cpp/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_services_common_cpp.a
  * `$(AJ_ROOT)/services/base/services_common/ios/samples/alljoyn_services_objc/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_services_common_objc.a

  __Configuration libs__:
  * `$(AJ_ROOT)/core/alljoyn/build/darwin/$(CURRENT_ARCH)/$(PLATFORM_NAME)/$(CONFIGURATION)/dist/cpp/lib/`
    * liballjoyn_config.a    

  __Control Panel libs__:
  * `$(AJ_ROOT)/services/base/controlpanel/ios/samples/alljoyn_services_cpp/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_controlpanel_cpp.a
  * `$(AJ_ROOT)/services/base/controlpanel/ios/samples/alljoyn_services_objc/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_controlpanel_objc.a

  __Notification libs__:
  * `$(AJ_ROOT)/services/base/notification/ios/samples/alljoyn_services_cpp/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_notification_cpp.a
  * `$(AJ_ROOT)/services/base/notification/ios/samples/alljoyn_services_objc/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_notification_objc.a

  __Onboarding libs__:
  * `$(AJ_ROOT)/services/base/onboarding/ios/samples/alljoyn_services_cpp/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_onboarding_cpp.a
  * `$(AJ_ROOT)/services/base/onboarding/ios/samples/alljoyn_services_objc/build/$(PLATFORM)-$(CONFIGURATION)/`
    * liballjoyn_onboarding_objc.a

[download]: https://allseenalliance.org/framework/download
[core]: /develop/building/ios-osx/build-source
[base]: /develop/building/ios-osx/build-base
