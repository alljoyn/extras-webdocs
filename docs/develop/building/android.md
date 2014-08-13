# Building Android

## Setup:

 1. Download the following Android ZIP files from the Android section of the Source page, https://www.allseenalliance.org/source-code:
     * Core SDK (release)
     * Onboarding SDK
     * Configuration SDK
     * Notification SDK
     * Control Panel SDK
     
 2. Extract all ZIP files to one directory.


## Building Samples:

 1. Import projects from:
     * alljoyn-android/core/alljoyn-14.02.00-rel/java/samples
     * alljoyn-android/services

 2. Add Support Library:

     To add "android-support-v4.jar", right-click on the project, select "Android Tools" > "Add Support Library"


## Building the AllJoyn framework for an existing app:

 1. In your project, create a "libs/armeabi" dir if it doesn't already exist.
 2. Copy "alljoyn-android/core/alljoyn-14.02.00-rel/java/lib/liballjoyn_java.so" to the "libs/armeabi" dir.
 3. Copy "alljoyn-android/core/alljoyn-14.02.00-rel/java/jar/alljoyn.jar" to the "libs" dir.
 4. If using a Service Framework, copy the jars from the "alljoyn-android/services/<SERVICE FRAMEWORK>/java/libs/*.jar" to the "libs" dir.
