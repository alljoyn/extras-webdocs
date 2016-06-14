# Building Android

## Getting Started

* For instructions on how to obtain and build the AllJoyn&trade; Core source for Android, go [here][core].
* For instructions on how to obtain and build the AllJoyn&trade; Base Services source for Android, go [here][base]. Please note that building Core is a prerequisite for Base Services.

## Building the AllJoyn&trade; framework for an existing app:

 1. In your project, create a `libs/armeabi` dir if it doesn't already exist.
 2. Copy `$AJ_ROOT/core/alljoyn/build/android/arm/{VARIANT}/dist/java/lib/liballjoyn_java.so` to the `libs/armeabi` dir.
 3. Copy `$AJ_ROOT/core/alljoyn/build/android/arm/{VARIANT}/dist/java/jar/alljoyn.jar` to the `libs` dir.
 4. If using a Service Framework, copy the jars from the `$AJ_ROOT/services/base/<SERVICE FRAMEWORK>/java/<SERVICE>/{build/deploy,bin}/*.jar` to the `libs` dir.

[download]: https://allseenalliance.org/framework/download
[core]: /develop/building/android/build-source
[base]: /develop/building/android/build-base
