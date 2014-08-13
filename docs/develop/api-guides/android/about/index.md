#About Feature API Guide

-----

## Build an application that uses About Server

Perform the following steps at a high level to build an application that will broadcast
AboutData.

1. Create the base for the AllJoyn&trade; application.
2. Implement PropertyStore to produce an AboutStore. (See *Create a PropertyStore implementation*.)
3. Instantiate an AboutStore.
4. Create and register the AboutService, providing it with the AboutStore.
5. Announce the AboutService.

-----

- [Android About Server][android_about_server] About Server API Guide for Android

-----

## Build an application that uses About Client

Perform the following steps at a high level to build an application that will receive AboutData.

1. Create the base for the AllJoyn application.
2. Create and register the AboutService.
3. Create and register the AnnounceListener.
4. Create and use the AboutClient.

-----

- [Android About Client][android_about_client] About Client API Guide for Android

[android_about_server]: /develop/api-guides/android/about/android_about_server
[android_about_client]: /develop/api-guides/android/about/android_about_client
