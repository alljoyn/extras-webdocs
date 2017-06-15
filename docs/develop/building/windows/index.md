# Building on Windows

## Getting Started

* For instructions on how to obtain and build the AllJoyn&trade; Core source
for Windows, go [here][core].
* For instructions on how to obtain and build the AllJoyn&trade; Base Services
source for iOS, go [here][base]. Please not that building Core is a
prerequisite for Base Services.

## Adding to a new/existing project
### Visual Studio 2012, 2013, or 2015
1. Open **Project**>**Properties**.

2. Click on **C/C++**.

3. Edit *Additional Include Directories* and add `$(ALLJOYN_SDK_HOME)\inc`.

   **NOTE:** `ALLJOYN_SDK_HOME` is the `dist` directory created by [building
   Core][core]. It is found under `build\{OS}\{CPU}\{VARIANT}\`.

4. Select **Preprocessor** under C/C++.

5. Edit **Preprocessor Definitions** and add `QCC_OS_GROUP_WINDOWS` and `UNICODE`.

6. Click on **Linker**.

7. Edit **Additional Library Directories** and add `$(ALLJOYN_SDK_HOME)\lib`.

8. Click on **Input** found under the "Linker" section.

9. Enter the following libraries:
`alljoyn.lib;ajrouter.lib;ws2_32.lib;Secur32.lib;crypt32.lib;Bcrypt.lib;Ncrypt.lib;iphlpapi.lib`.

10. Click **OK**.  You are now ready to start using the AllJoyn APIs.


### Makefile

Perform the following steps at a high level. Changes may be needed due to how
the existing Makefile is structured.

1. Open your Makefile.
2. Create a new variable named `ALLJOYN_DIST` to point to the AllJoyn SDK.

    `ALLJOYN_DIST := <path_to_dist>`

3. Create a new variable named `ALLJOYN_LIB` to point to the AllJoyn library.

    `ALLJOYN_LIBS := -l$(ALLJOYN_DIST)/cpp/lib/alljoyn.lib -l$(ALLJOYN_DIST)/cpp/lib/ajrouter.lib -l$(ALLJOYN_DIST)/cpp/lib/BundledRouter.obj`
    `ALLJOYN_REQUIRED_LIBS := -lws2_32.lib -lSecur32.lib -lcrypt32.lib -lBcrypt.lib, -lNcrypt.lib -liphlpapi.lib`

4. Modify `CXXFLAGS` if present, or add to compile command:
`-DQCC_OS_GROUP_WINDOWS`

5. Modify the include section to add: `-I$(ALLJOYN_DIST)/cpp/inc`

6. Add `$(ALLJOYN_LIB) $(ALLJOYN_REQUIRED_LIBS)` to the Linker command:

[core]: /develop/building/windows/build-source
[base]: /develop/building/windows/build-base
