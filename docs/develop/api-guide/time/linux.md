# Time API Guide - Linux

### Reference code

The reference code consists of an application that implements a server and client.

#### Source code

| Pacakage | Description |
|---|---|
| AllJoyn | The Standard Client AllJoyn&trade; code. |
| AboutService | About feature code. |
| TimeService | Time service framework code. |
| Services Common | Code that is common to the AllJoyn service frameworks. |
| Sample Apps | Code that is common to the AllJoyn service framework sample applications. |

#### Reference C++ application code

| Application | Description |
|---|---|
| TimeServiceClient | A basic application that serves as a time service client. |
| TimeServiceServer | An example server application. |

### Obtain the Time service framework

See the [Building Linux][building-linux] section for instructions 
on compiling the Time service framework.


### Build a Time service server

The following steps provide the high-level process to build a
Time service server.

1. Create the base for the AllJoyn application. 
2. Implement the ProperyStore and use this with the AboutService 
in server mode. See the [About API Guide - Linux][about-api-guide-linux] 
section for instructions.
3. Implement the remote and local callbacks.
4. Implement the time objects logic you want to use - Clock, 
Time authority, Alarm, Timer, Alarm Factory, Timer Factory, 
Custom Alarm, and Custom Timer.
5. Create the time objects and announce.

### Build a Time service client

The following steps provide the high-level process to build a 
Time service client.

1. Create the base for the AllJoyn application.
2. Implement the security authentication mechanism.
3. Create a class that implements each of the time objects.
4. When an announcement with a time interface is received, 
the client may choose to initialize a Time service client object to use it.
5. Use the time objects as required by the application business logic.

### Setting up the AllJoyn framework and About feature

The steps required for this service framework are universal 
to all applications that use the AllJoyn framework and for 
any application using one or more AllJoyn service frameworks.  
Prior to use of the Time service framework as a Server or a 
Client, the About feature must be implemented and the AllJoyn 
framework set up.  

Complete the procedures in the following sections to guide 
you in this process:
* [Building Linux][building-linux] 
* [About API Guide - Linux][about-api-guide-linux]

## Implementing a Time Service Server

### Initialize the AllJoyn framework

See the [Building Linux][building-linux] section for instructions 
to set up the AllJoyn framework.

#### Create bus attachment and add authentication

```
bus->Start();
bus->Connect();
bus->EnablePeerSecurity("ALLJOYN_PIN_KEYX ALLJOYN_SRP_KEYX ALLJOYN_ECDHE_PSK", 
authListener);
```

### Start the AboutService in server mode

The Time Service Server depends on the About feature.

For more information about the About feature, see 
the [About API Guide - Linux][about-api-guide-linux] section.

#### Create a PropertyStore and fill it with the needed values

```
propertyStore = new AboutPropertyStoreImpl();;
propertyStore->setDeviceId(deviceId);
propertyStore->setDeviceName(deviceName);
propertyStore->setAppId(appIdHex);
propertyStore->setAppName(appName);
std::vector<qcc::String> languages(3);
languages[0] = "en";
languages[1] = "sp";
languages[2] = "fr";
propertyStore->setSupportedLangs(languages);
propertyStore->setDefaultLang(defaultLanguage);
```

#### Instantiate the BusListener and initialize the About feature

```
busListener = new CommonBusListener();
AboutServiceApi::Init(*bus, *propertyStore);
AboutServiceApi* aboutService = AboutServiceApi::getInstance();
busListener->setSessionPort(port);
bus->RegisterBusListener(*busListener);
TransportMask transportMask = TRANSPORT_ANY;
SessionPort sp = port;
SessionOpts opts(SessionOpts::TRAFFIC_MESSAGES, false, 
SessionOpts::PROXIMITY_ANY, transportMask);
bus->BindSessionPort(sp, opts, *busListener);
aboutService->Register(port);
bus->RegisterBusObject(*aboutService);
```

### Initialize the Time service framework

```
TimeServiceServer* timeServer = TimeServiceServer::getInstance();
```

### Start the Time server

Start the Time service framework and pass it the bus attachment.

```
server->init(bus);
```

### Create time objects

#### Creating a Clock

Inherit from TimeServiceServerClock and implement the business 
logic for the time object interface (e.g., getDateTime, setDateTime).

```
Class TestClock :: public TimeServiceServerClock {...}
```

To create a clock execute:

```
TestClock* clock = new TestClock();
QStatus status   = server->createClock(clock);
```

#### Creating an Alarm or a Timer

Much like with the Clock, inherit from TimeServiceServerAlarm or 
TimeServiceServerTimer and add them using the server->create function.

#### Creating a customized Alarm or Timer

Cutsomized alarms and timers are versions of the time objects 
that inherit from the base bus object and add interfaces to 
its object path since the Alljoyn framework can only have 
one bus object on each object path. 

Inherit from TimeServiceTimerBusObj or TimeServiceAlarmBusObj 
and implement the createCustomInterfaceHook function to register your interfaces.

You still need to create a class implementing `TimeServiceServerTimer` or `Alarm`.

To register your new custom object, use: 

```
server->registerCustomTimer(TimerBusObj, timer, notAnnounced)
```

#### Creating a Time Authority Object

Use the same method as described in [Creating a Clock][creating-a-clock] 
to inherit and implement `TimeServiceServerAuthorityClock`.

To create the object, use:

```
TestAuthorityClock* clock = new TestAuthorityClock();
QStatus status = server->createTimeAuthorityClock(clock, authType);
```

#### Creating an Alarm Factory or a Timer Factory

Factories are used to enable clients to create dynamic 
alarms and/or timers. These alarms or timers cannot be customized.

Perform the following tasks to create factories:

1. Implement `TimeServiceServerAlarmFactory` or `TimeServiceServerTimerFactory`.
2. Call `server->createAlarmFactory`.

#### Supporting events and actions descriptions

To use alarms and timers with the `org.allseen.Introspectable` 
interface in the Events and Actions feature, call the overloaded 
function of create or register that contains a description and a translator. 

For example, call:

```
QStatus createAlarm(TimeServiceServerAlarm* alarm, const qcc::String& 
description, const qcc::String& language, Translator* translator) const;
```

instead of:

```
QStatus createAlarm(TimeServiceServerAlarm* alarm) const;
```

### Announce

In order for the created objects to be seen by their clients, 
call Announce.

```
AboutServiceApi* aboutService = AboutServiceApi::getInstance();
aboutService->Announce();
```

The server is now running and accepting requests. The requests 
to the different time objects are translated by the service layer 
to calls to your implementation of the objects (in the classes 
you inherited from TimeServiceServer\*).

### Shut down

When the server goes down, you must deallocate all of the memory.

```
server->shutdown(); 
```
 
## Implementing a Time Service Client

### Initialize the AllJoyn framework

See the [Building Linux][building-linux] section for instructions 
to set up the AllJoyn framework.

#### Create bus attachment and add authentication

```
bus->Start();
bus->Connect();
bus->EnablePeerSecurity("ALLJOYN_PIN_KEYX ALLJOYN_SRP_KEYX ALLJOYN_ECDHE_PSK", 
authListener);
```

### Start Listening to Announcements

#### Register an Announcement Listener

```
announceHandler = new TimeClientAnnouncementHandler(onAnnouncement);
AnnouncementRegistrar::RegisterAnnounceHandler(*bus, *announceHandler, 
"org.allseen.Time*", 1);
```

In the announcement handler (which inherit from AnnounceHandler), 
implement the announce method.

When the announce method is called, start a Time service client:

```
TimeServiceClient* timeClient = new TimeServiceClient();
timeClient->init(bus, busName, deviceId, appId, objectDescs);
```

### Start a session with a Server

Implement a class inheriting from TimeServiceSessionListener.

```
timeClient->joinSessionAsync(sessionListener);
```

### Querying and using time objects

The TimeServiceClient parses the announcement and stores the 
different time objects internally; clock, time authority, alarm, 
and timer objects from the announcement can all be retrieved 
using TimeServiceClient functionality. 

For example, to retrieve the first clock in the client:

```
TimeServiceClientClock* clock = timeClient->getAnnouncedClockList()[0];
```

### Listening to signals

Some of the time objects emit signals. In order to get these 
signals, create a class inheriting and implement the required handlers:

```
class TimeClientSignalHandler : public TimeAuthorityHandler, public 
AlarmHandler, public TimerHandler {...}
```

You can implement some or all of the handlers, depending on which 
time objects you need to support.

To register to signals of a specific kind, use:

```
signalHandler = new TimeClientSignalHandler();
timer->registerTimerHandler(signalHandler);
```

### Using factories to create new alarms and timers

Another kind of time object is the factory. The client can use 
a factory to request adding an alarm or a timer on the server side.

Getting an announced factory uses the same mechanism as in 
[Querying and using time objects][querying-using-time-objects].

```
std::vector<TimeServiceClientAlarmFactory*> factoryList;
factoryList = timeClient->getAnnouncedAlarmFactoryList();
TimeServiceClientAlarmFactory* factory = factoryList[0];
```

Create a new alarm using:

```
qcc::String newAlarmObjPath;
alarmFactory->newAlarm(&newAlarmObjPath);
```

NOTE: Factory-created objects will not be part of the announcement 
(even if the server announce again). Retrieve them by calling `retrieveAlarmList`
or `retrieveTimerList` from the appropriate factory object.

### Object description

To support events and actions, object descriptions have been added 
to the necessary objects. To retrieve an object description, 
call the retrieveObjectDescription function of the time object in question.

For example:

```
const std::vector<qcc::String>& langs = timer->retrieveDescriptionLanguages();
qcc::String lang = langs.size() > 0 ? langs[0] : qcc::String::Empty;
const qcc::String description = timer->retrieveObjectDescription(lang);
```

### Ending a session with the server

```
timeClient->leaveSession();
```

### Deleting the client

Deleting the client will release all of the client's allocated 
data. If there are time objects associated with this client, 
release them before calling delete. 

```
delete timeClient;
```


[building-linux]: /developers/develop/building/linux
[about-api-guide-linux]: /developers/develop/api-guide/about/linux
[creating-a-clock]: #creating-a-clock
[querying-using-time-objects]: #querying-and-using-time-objects

