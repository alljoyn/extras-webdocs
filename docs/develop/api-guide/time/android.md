# Time API Guide - Android

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

#### Reference Android application code

| Application | Description |
|---|---|
| TimeServiceClient | A basic application that serves as a time service client. |
| TimeServiceServer | A basic application that serves as a time service server. |

### Obtain the Time service framework

See the [Building Android][building-android] section for instructions 
on compiling the Time service framework.

### Build a Time service server

The following steps provide the high-level process to build a
Time service server.

1. Create the base for the AllJoyn application. 
2. Implement the ProperyStore and use this with the AboutService 
in server mode. See the [About API Guide - Android][about-api-guide-android] 
section for instructions.
3. Implement the security authentication mechanism.
4. Implement the time objects logic you want to use - Clock, 
Time authority, Alarm, Timer, Alarm Factory, Timer Factory, 
Custom Alarm, and Custom Timer.
5. Create the time objects and announce.

### Build a Time service client

The following steps provide the high-level process to build a 
Time service client.

1. Create the base for the AllJoyn application.
2. Implement the security authentication mechanism.
3. Add announcement handler to receive Announcement signals.
4. Create a class that implements each of the time objects.
5. When an announcement with a time interface is received, 
the client may choose to initialize a Time service client 
object to use it.
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
* [Building Android][building-android] 
* [About API Guide - Android][about-api-guide-android]

## Implementing a Time Service Server

### Initialize the AllJoyn framework

See the [Building Android][building-android] section for instructions 
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
the [About API Guide - Android][about-api-guide-android] section.

#### Create a PropertyStore and start About server

```
AboutServiceImpl.getInstance().startAboutServer((short) 1080, new 
   PropertyStoreImpl(context), busAttachment);
 
The Context that is passed in above to the PropertyStoreImpl
is the Android application context.

```

### Initialize the Time service framework

```
TimeServiceServer server = TimeServiceServer.getInstance()
try {
      server.init(busAttachment);
}
catch(TimeServiceException tse){...}

```

### Create time objects

#### Creating a Clock

Inherit from the `org.allseen.timeservice.server.Clock` interface
and implement the business logic for the time object interface 
(e.g., getDateTime, setDateTime).

```
class TestClock extends Clock {...}
```

To create a clock, use the following code snippet:

```
TestClock clock = new TestClock();
try {
      server.createClock(clock);
}
catch(TimeServiceException tse){...}
```

#### Creating an Alarm or a Timer

Inherit from the `org.allseen.timeservice.server.Alarm` or 
`org.allseen.timeservice.server.Timer` interface and add 
them using the following commands:

```
TestAlarm alarm = new TestAlarm();
try {
      server.createAlarm(alarm);
}
catch(TimeServiceException tse){...}


TestTimer timer = new TestTimer();
try {
      server.createTimer(timer);
}
catch(TimeServiceException tse){...}
```

#### Creating a customized Alarm or Timer

Customizing alarms and timers are used when it is necessary 
to have additional interfaces implemented by the alarm or 
the timer object. 

Create an AllJoyn interface that provides additional functionality 
to the already implemented one by the standard interfaces of 
the Alarm or Timer. See the [Building - Android][building-android] 
section to find out how to create AllJoyn interfaces.

Create a class that extends BaseAlarmBusObj (for Alarm) or 
BaseTimerBusObj (for Timer) and implement the newly created 
AllJoyn interface and the standard interface of the Alarm or Timer.

To register your new customized object, use the following code snippet: 

```
try {
      TestTimer timer = new TestTimer();
      server.registerCustomAlarm(timerBusObj, timer, notAnnouncedInterfaces);
}
catch(TimeServiceException tse){...}

```

The service automatically adds all the interfaces implemented by 
the BusObject (timerBusObject in the example) to be announced. 
In order to prevent an interface from being announced, populate 
the notAnnouncedInterfaces array.

#### Creating a Time Authority Object

Use the same method as described in [Creating a Clock][creating-a-clock] 
to inherit and implement `TimeServiceServerAuthorityClock`.

To create the object, use the following code snippet:

```
class TestAuthClock extends TimeAuthorityClock{...}
```

To create an authority clock, execute:

```
TestAuthClock clock = new TestAuthClock();
try {
      server.createTimeAuthorityClock(clock, authorityType)
}
catch(TimeServiceException tse){...}
```

Select a desired authority type from the AuthorityType enum.

#### Creating an Alarm Factory or a Timer Factory

Factories are used to enable clients to create alarms and/or 
timers objects dynamically.

Factory provides interface to delete the previously created objects.

Perform the following tasks to create factories:

1. Implement `AlarmFactory` or `TimerFactory`.
2. Use the following code snippet to create alarmFactory:

   ```
   try {
         server.createAlarmFactory(alarmFactory);
   }
   catch(TimeServiceException tse){...}
   ```
  
#### Supporting the Events and Actions feature

The objects of Alarm and Timer support the Events and Actions 
feature by adding a description on the AlarmReached and TimerEvent 
sessionless signals.

In addition, it is possible to create Alarm and Timer objects 
with an object description. Use the following code snippet to 
create Alarm object with description.

```
TestAlarm alarm = new TestAlarm();
try {
      server.createAlarm(alarm, description, language, translator)}
}
catch(TimeServiceException tse){...}
```

* description - The object description
* language - The description language
* translator - Implementation of the AllJoyn Translator class 
to define the object description in different languages or 
NULL if the description is implemented in one language.

### Announce

Announce the created objects so they can be seen by their clients.

```
AboutServiceImpl.getInstance().announce();
```

The TimeService server is now running and accepting requests. 
The requests to the different time objects are delegated by 
the service layer to the application layer by using the objects 
provided via the server "create" methods.

### Shut down

To shut down the service and to release all its resources:

```
server.shutdown(); 
```
 
## Implementing a Time Service Client

### Initialize the AllJoyn framework

See the [Building Android][building-android] section for instructions 
to set up the AllJoyn framework.

#### Create bus attachment and add authentication

```
bus.connect();
bus.registerAuthListener("ALLJOYN_PIN_KEYX ALLJOYN_SRP_KEYX ALLJOYN_ECDHE_PSK", 
authListener);
```

### Start Listening to Announcements

#### Register an Announcement Listener

```
try {
      AboutService about = AboutServiceImpl.getInstance();
      about.startAboutClient(app.getBusAttachment());
      about.addAnnouncementHandler(announcementHandler, new 
         String[]{TimeServiceConst.IFNAME_PREFIX + "*"});
}
catch(Exception e){...}
```

When an announcement signal arrives, initialize the TimeServiceClient:

```
TimeServiceClient timeClient = new TimeServiceClient(busAttachment, busName,
   deviceId, appId, objDescs);
```

Arguments received with the Announcement signal:

```
busName, deviceId, appId, objDescs
```

### Start a session with a Server

Implement SessionListenerHandler and provide it in the joinSessionAsync method.

```
timeClient.joinSessionAsync(sessionListener);
```

### Querying and using time objects

The TimeServiceClient parses the object descriptions (objDescs) 
provided in its constructor and stores internally the different 
time objects such as: clock, alarm, timer and the factory objects.

To retrieve the list of announced time objects, use the following code snippet:

```
List<Clock> clocks = timeClient.getAnnouncedClockList();
List<Alarm> alarms = timeClient.getAnnouncedAlarmList();
```

### Listening to signals

AuthorityClock, Alarm and Timer objects send signals. 

In order to receive the signal, implement the signal handler 
interface and register it in the service. 

For example in order to receive Timer signals use the 
following code snippet:

```
class TimerListener implements TimerHandler {...}
timer.registerTimerHandler(timerHandler);
```

A timer object can be retrieved using the following code 
snippet, for instance, to retrieve the first timer in the list:

```
Timer timer = timeClient.getAnnouncedTimerList().get(0)
```

### Using factories to create new alarms and timers

Another kind of time object is the factory. A client can use 
the factory to create Alarms or Timers dynamically.

```
TimerFactory timerFactory = timeClient.getAnnouncedTimerFactoryList().get(0)
try {
      Timer timer = timerFactory.newTimer();
}
catch(TimeServiceException tse){...}
```

NOTE:  Factory-created objects are not sent in the announcement 
(even if the server announces again). Retrieve them by calling 
`retrieveAlarmList` or `retrieveTimerList` on the appropriate factory object.

### Object description

Time service objects like Alarm or Timer can be created with 
an object description. To retrieve the object description use the following steps:

1. Retrieve the list of supported description languages:

   ```
   String[] langs = timer.retrieveDescriptionLanguages();
   ```

   If the langs array is empty, it means that the object description was not defined on the object.             
2. Retrieve the object description:

   ```
   String desc = timer.retrieveObjectDescription(language);
   ```

The language argument should be selected from the langs array.

### Ending a session with the server

```
timeClient.leaveSession();
```

### Release client resources

When the TimeServiceClient object is stale, for instance, 
when another announcement signal has been received from 
the same device, the old TimeServiceClient object can be cleaned.

```
timeClient.release();
```


[building-android]: /developers/develop/building/android
[about-api-guide-android]: /developers/develop/api-guide/about/android
[creating-a-clock]: #creating-a-clock
