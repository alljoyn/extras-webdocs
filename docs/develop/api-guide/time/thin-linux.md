# Time API Guide - Thin Linux

### Obtain the Time service framework 

The source code for this service framework can be found on the [AllSeen 
Alliance gerrit page](https://git.allseenalliance.org/cgit/) 
as a git project. In addition, the [ajtcl](https://git.allseenalliance.org/cgit/core/ajtcl.git/) 
project is needed to compile this service framework.

If the target platform already supports the AllJoyn&trade; 
Thin Library framework, refer to the target platform documentation 
for detailed setup and download instructions.

If the target platform does not support the AllJoyn Thin 
Library framework, porting work is required to support this 
target. See the [AllJoyn Thin Core section][intro-thin-library] 
for more information about the AllJoyn Thin Library framework.

### Reference code

The reference code consists of a module that implements a Time service server 
and a module that implements code to create a Time service client.

### Time server modules

| Module | Description |
|---|---|
| TimeServiceCommon | Common code for the Time service framework that is shared by the Time Server and Time Client. |
| TimeServiceServer | A module in the Time service framework that is used by a developer/OEM to build an application that exposes the ability to manage time related objects that are used by Time clients. |
| TimeServerSample | Sample code for creating and managing several time related objects that exercises the TimeServiceServer API. This module supports the following objects: |
| | * Clock |
| | * Time Authority |
| | * Alarm |
| | * Timer |
| TimeServiceClient | A module in the Time service framework that is used by a developer/OEM to build an application that has the ability to connect and use Time servers. |
| TimeClientSampleUtil | Sample code for input handling, for non-embedded platforms. |
| TimeClientSample | An interactive front end for the Time service client API that shows how to set and get a clock, an alarm and a timer as well as listen to the different Time service server signals. |

### Build a Time service server

The following steps provide the high-level process to build a
Time service server.

1. Create the base for the AllJoyn application. See the [Build an Application Using the Thin Library section][build-app-thin-library] 
for instructions. 
2. Implement the remote and local callbacks.
3. Integrate with the AuthListener's PasswordCallback to provide a secure connection.

### Build a Time service client

The following steps provide the high-level process to build a 
Time service client.

1. Create the base for the AllJoyn application. See the [Build an Application Using the Thin Library section][build-app-thin-library] 
for instructions.
2. Define peer data context structure.
3. Implement announcement listener.
4. Implement the remote callbacks.
5. Integrate with the AuthListener's PasswordCallback to provide a secure connection.

### Build a Time service server

The following steps provide the high-level process to build a
Time service server.

1. Create the base for the AllJoyn application. See the [Build an Application Using the Thin Library section][build-app-thin-library] 
for instructions. 
2. Implement the remote and local callbacks.
3. Integrate with the AuthListener's PasswordCallback to provide a secure connection.

### Build a Time service client

The following steps provide the high-level process to build a 
Time service client.

1. Create the base for the AllJoyn application. See the [Build an Application Using the Thin Library section][build-app-thin-library] 
for instructions.
2. Define peer data context structure.
3. Implement announcement listener.
4. Implement the remote callbacks.
5. Integrate with the AuthListener's PasswordCallback to provide a secure connection.

## Implementing a Time Service Server

### Create the base for the AllJoyn application

See the [Build an Application Using the Thin Library section][build-app-thin-library] for instructions.

### Implement the remote and local callbacks

After the Time service server is initialized and started, 
its state is empty. The out-of-the-box server includes the following time objects:

* Clock interface - Communicates with an application-level clock.
* Time authority - Object that can emit a time sync signal 
when a time sync is needed.
* 1 Alarm interface - Interface to an application-level alarm.
* 1 Timer interface - Allows for a timer to be set, paused, 
started, etc. on the application level.

All of the above objects are handled through callbacks where signals 
are initiated by the application and sent through the Time service 
to the clients. The application operates the clock, manages the alarms 
and timers and is responsible for all business logic. The Time service 
enables the application to send and receive time-related information.

The different callbacks are implemented before and supplied to the 
AJTS_Server_Start function, consult documentation and function 
signatures in the code:

```
AJ_Status AJTS_Server_Start(AJTS_GetDateTime getDateTime, 
   AJTS_SetDateTime setDateTime, AJTS_IsSet isSet,
   AJTS_GetAuthorityType getAuthorityType,
   AJTS_GetAlaramSchedule getAlaramSchedule, ..., AJTS_TimerReset timerReset)
```

* get\* functions are called when a client inquires about 
information stored in the server. 
* set\* functions are called when a client wants to set 
information in the server. 

Other functions are methods which are requests from clients 
to act on server objects (e.g., start, stop timer).

### Adding alarms and timers

In order to add alarms and timers to the Time service, we need 
to change the library code.

#### Declare the time objects

Modify the following lines in TimeServiceCommon.h to account 
for the additional objects. Only alarms and timers can be added. 
Clock and time authority objects should remain at 1.

```
#define AJTS_NUM_OF_ALARMS 1 /**< number of alarms, one is 
regular clock and the other time authority */
#define AJTS_NUM_OF_TIMERS 1 /**< number of timers, one is 
regular clock and the other time authority */
```

#### Declare time objects in the Alarms and Timers arrays

Include each of the time object entries in the AJTS_Alarms and 
AJTS_Timers arrays with a corresponding AJTS_OBJ_PATH_ALARM# 
char array for their object paths. 

1. Adding another alarm requires changing TimeServiceServer.h:

   ```
   /** alarm obj path */
   extern char AJTS_OBJ_PATH_ALARM1[AJTS_MAX_OBJ_PATH_LENGTH + 1];
 
   /** alarms object definitions */
   #define AJTS_Alarms { AJTS_OBJ_PATH_ALARM1, AJTS_AlarmInterfaces, 
   AJ_OBJ_FLAG_HIDDEN | AJ_OBJ_FLAG_DISABLED }
   ```

   to the following:

   ```
   /** alarm obj path */
   extern char AJTS_OBJ_PATH_ALARM1[AJTS_MAX_OBJ_PATH_LENGTH + 1];
   extern char AJTS_OBJ_PATH_ALARM2[AJTS_MAX_OBJ_PATH_LENGTH + 1];
 
   /** alarms object definitions */
   #define AJTS_Alarms { AJTS_OBJ_PATH_ALARM1, AJTS_AlarmInterfaces, 
   AJ_OBJ_FLAG_HIDDEN | AJ_OBJ_FLAG_DISABLED }, \
   { AJTS_OBJ_PATH_ALARM2, AJTS_AlarmInterfaces, AJ_OBJ_FLAG_HIDDEN | 
   AJ_OBJ_FLAG_DISABLED }
   ```

2. Add AJTS_OBJ_PATH_ALARM# to TimeServiceServer.c.
3. Add the interface definition to the TimeServiceServer.c. 

   Go to the line saying `// Alarm interface` and copy all of 
   the lines using AJ_ENCODE_ macros while changing the index to 1.

   ```
   #define TIME_ALARM2_GET_PROP
   AJ_ENCODE_MESSAGE_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   0, AJ_PROP_GET)
   #define TIME_ALARM2_SET_PROP
   AJ_ENCODE_MESSAGE_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   0, AJ_PROP_SET)

   #define TIME_ALARM2_VERSION_PROP
   AJ_ENCODE_PROPERTY_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   1, 0)
   #define TIME_ALARM2_SCHEDULE_PROP
   AJ_ENCODE_PROPERTY_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   1, 1)
   #define TIME_ALARM2_TITLE_PROP
   AJ_ENCODE_PROPERTY_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   1, 2)
   #define TIME_ALARM2_ENABLED_PROP
   AJ_ENCODE_PROPERTY_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   1, 3)

   #define TIME_ALARM2_ALARMREACHED_SIGNAL
   AJ_ENCODE_MESSAGE_ID(AJTS_OBJECT_LIST_INDEX, AJTS_ALARM_OBJECT_INDEX + 1, 
   1, 4) 
   ```

4. Search TimeServiceServer.c for occurrences of the objects of the type added. 

   For example, if an alarm object was added, search for TIME_ALARM1 
   and add TIME_ALARM2 with the needed functionality. Usually, it will 
   be the same logic as TIME_ALARM1 with the required functionality 
   adjustment to point to TIME_ALARM2.

## Implementing a Time Service Client

### Create the base for the AllJoyn application

See the [Build an Application Using the Thin Library section][build-app-thin-library] for instructions.

### Define peer data context structure

The Time service client connects and converse with servers 
using the Time service client API and the RequestContext structure:

```
typedef struct _Request_Context {
   char objPath[33];  /**< path to alljoyn object */
   uint32_t replySerial;  /**< serial number of alljoyn request. 
   populated by service */
   uint32_t propId;  /**< property Id of request. populated by service */
}RequestContext;
```

The API uses the RequestContext structure to connect to the 
required target and keep the information for that request 
and then supply the context back to the client application 
when the request returns.

NOTE: Only one request to a server is allowed at any given time. 
Sending more than one request without getting a response first 
will alter the RequestContext data and cause information loss.

### Implement the remote and local callbacks

When initializing a Time service client, we need to supply 
the AJTS_Client_Start with implemented versions of the different 
handlers. The following handlers are supported by the Time service:

* Getters: Each getter function is tailored to the information 
returned by the server. 
* Setters:  Only one setter function exists and is of type 
AJ_Status `(*AJTS_SetPropReplyHandler)(AJ_Message*replyMsg);`. 
  Each response from a setter goes to this function and it 
  is the responsibility of the client application to discern 
  which setter it was called for. 
* Signals: Signal handlers are called when a server emits a 
signal of a particular type.

  ```
  AJ_Status AJTS_Client_Start(AJTS_Client_OnSignal onTimeSync, 
  AJTS_Client_OnSignal onAlarmReached, AJTS_Client_OnSignal onTimerEvent, 
  AJTS_Client_OnTimerRunStateChanged onTimerRunStateChanged, 
  AJTS_SetPropReplyHandler setPropReplyHandler,
     AJTS_GetDateTimeHandler getDateTimeHandler,
     AJTS_IsSetHandler isSetHandler,
     AJTS_GetAuthorityTypeHandler getAuthorityTypeHandler,
     AJTS_GetAlaramScheduleHandler getAlaramScheduleHandler,
     AJTS_GetAlaramTitleHandler getAlaramTitleHandler,
     AJTS_GetAlaramEnabledHandler getAlaramEnabledHandler,
     AJTS_TimerResetHandler timerResetHandler,
     AJTS_GetTimerIntervalHandler getTimerIntervalHandler,
     AJTS_GetTimerTimeLeftHandler getTimerTimeLeftHandler,
     AJTS_GetTimerIsRunningHandler getTimerIsRunningHandler,
     AJTS_GetTimerRepeatHandler getTimerRepeatHandler,
     AJTS_GetTimerTitleHandler getTimerTitleHandler)
  ```


[build-app-thin-library]: /developers/develop/tutorial/thin-app
