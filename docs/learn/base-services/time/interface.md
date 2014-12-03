# Time Interface Definition

## Release History

| Release version | Date | What changed |
|---|---|---|
| 14.12 | 12/17/2014 | The Time service framework's collection of interfaces were added: |
| | | * org.allseen.Time.Clock version 1 |
| | | * org.allseen.Time.TimeAuthority version 1 |
| | | * org.allseen.Time.AlarmFactory version 1 |
| | | * org.allseen.Time.Alarm version 1 |
| | | * org.allseen.Time.TimerFactory version 1 |
| | | * org.allseen.Time.Timer version 1 |

## Definition Overview

The Time service framework provides a common interface for 
use with AllJoyn&trade;-enabled devices that provide or rely 
upon some clock features. The interfaces that support the 
Time service framework allow the current time of day and date 
to be queried and set, as well as management of alarms and timers.

The Time service framework is intended for human-readable clocks, 
and home use of alarms and timers. The current time is provided 
on demand and does not take into account the network latency between devices. 

The Time service framework does not actually keep track of time, 
alarms, or timers. The Time service framework relies on the OEM 
to let the service know when an alarm or timer has been reached 
and what the time is.

NOTE:	All methods and signals are considered mandatory to 
support the AllSeen Alliance Compliance and Certification program. 

### Error handling

The method calls in the Time interfaces use the AllJoyn error message handling.

## Time Interfaces

The Time service includes the following interfaces:

* `org.allseen.Time.Clock`
* `org.allseen.Time.TimeAuthority`
* `org.allseen.Time.AlarmFactory`
* `org.allseen.Time.Alarm`
* `org.allseen.Time.TimerFactory`
* `org.allseen.Time.Timer`

### Clock interface

The Clock interface is the most basic interface that a time-keeping device implements.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.allseen.Time.Clock` | 1 | yes | `/Clock( running number)` |

#### Properties

| Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |
| DateTime | `((qyy)(yyyq)n)` | Ranges are: | Read-write | Date and Time information: |
| | | * Year: Positive only | | * q: year |
| | | * Month: 1-12 | | * y: month |
| | | * Day: 1-31 | | * y: day | 
| | | *	Hour: 0-23 | | * y: hour |
| | | *	Minute 0-59 | | * y: minute |
| | | *	Seconds 0-59 | | * y: seconds |
| | | * Milliseconds 0-999 | | * q: milliseconds |
| | | | | * n: UTC offset in minutes |
| | | | | Any attempt to set an invalid value, e.g., setting the month to 13, will result in an ERROR message being returned with an error code of org.alljoyn.error.InvalidValue. |
| | | | | UTC offset is in minutes because some locations have a half time zone. |
| | | | | Clocks that do not support the date should: |
| | | | | * Ignore the date fields on a set operation | 
| | | | | * Return all zeros for the date as a response to a get operation |
| | | | | * If a clock does not support milliseconds, that value should be ignored or rounded to the nearest precision the device does support. For instance, if milliseconds is set to 8 and the device supports 100ths of seconds, it can either ignore the millisecond parameter or set it to 1/100th of a second. |
| IsSet | `b` | * true | Read-only | Indicates whether or not this clock has ever been set. |
| | | * false | | This read-only flag is meant to denote that at some time since powering up, the clock has been set. |
| | | | | This flag does not vouch for the accuracy of the time. |

#### Methods

None.

#### Signals

None.

#### Introspection XML

```
<interface name="org.allseen.Time.Clock">
  <property name="Version" type="q" access="read"/>
  <property name="DateTime" type="((qyy)(yyyq)n)" 
					access="readwrite"/>
  <property name="IsSet" type="b" access="read"/>
  <annotation name="org.alljoyn.Bus.Secure" value="true" />
</interface>
```

### TimeAuthority interface

Time-keeping devices that consider themselves authoritative sources 
of correct time implement and announce this interface, in addition 
to the Clock interface. The Time service does not define which 
time-keeping devices are defined as a TimeAuthority, nor does it 
attempt to model different levels of reliability. Instead, the 
application implementation should make this decision. 

Some valid reasons for defining a time-keeping device as a 
TimeAuthority may be because it receives regular time updates 
from NTP, or that it was designated authoritative at the 
app level by the home owner.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.allseen.Time.TimeAuthority` | 1 | yes | `/AuthorityClock( running number)` |

#### Properties

| Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |
| AuthorityType | `y` | * 0 - Other | Read-only | Enum of the different options of where this time authority syncs its time with. |
| | | * 1 - NTP | | |
| | | * 2 - Cellular | | |
| | | * 3 - GPS | | |
| | | * 4 - UserDesignated | | |

#### Methods

None.

#### Signals

##### `TimeSync`

TimeSync signal is a Sessionless signal.

**Message arguments**

None.

**Description**

TimeSync may be sent under one of the following scenarios:
* To inform interested parties that the time has changed, 
e.g., in the case of daylight saving time (UTC offset adjustment) 
* Intermittently in order to trigger periodic synchronization. 

Receivers of this signal may create a session and retrieve the 
time using the Clock interface's DateTime property. 

The date and time structure is not passed in the sessionless 
signal because sessionless signals can have significant delivery 
delays, making it inappropriate for time synchronization.

#### Introspection XML

```
<interface name="org.allseen.Time.TimeAuthority">
   <property name="Version" type="q" access="read"/>
   <property name="AuthorityType" type="y" access="read"/>
   <signal name="TimeSync"/>
</interface>
```

### AlarmFactory interface

The AlarmFactory interface provides functionality for creating 
and deleting alarms. Each created alarm is a BusObject "underneath" 
the path of the BusObject implementing AlarmFactory. 

For instance, if "/MyAlarms" implements AlarmFactory and Create 
is called it would result in the creation of a new BusObject, 
"/MyAlarms/a1" ("a1" is just an example, it can be called anything.) 
The created alarm BusObjects implement the Alarm interface described 
in [Alarm interface][alarm-interface]. 

Time-keeping devices that implement the AlarmFactory interface 
announce the object implementing the AlarmFactory, but not the 
alarms themselves.

The listing of alarms is achieved by performing introspection 
on the AlarmFactory BusObject.

Since what happens when the alarm is fired is out of scope of 
the Time service, it is advisable for implementations to provide 
an Introspection Description for the AlarmFactory BusObject 
that explains, in human-readable text, what happens when an 
alarm fires (for example, "Bedroom Alarm"). See the 
[Guide to AllJoyn Events and Actions][guide-to-events-actions] 
section for more information.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.allseen.Time.AlarmFactory` | 1 | yes | `/AlarmFactory( running number)` |

#### Properties

|Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |

#### Methods

##### `o NewAlarm`

**Message arguments**

None.

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | newObjPath | `o` | /created/object/path | Returns the object path of the newly created Alarm. |

**Error reply**

| Error | Description |
|---|---|
| org.alljoyn.error.OutOfRange | Returned when the number of alarms allowed is exceeded. |

**Description**

Creates a BusObject underneath this AlarmFactory. The new 
BusObject implements "org.allseen.Time.Alarm".


##### `o DeleteAlarm`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | objPath | `o` | N/A | Object path of the Alarm to remove. |

**Reply arguments**

None.

**Description**

Deletes an alarm according to its objPath.

#### Signals

None.

#### Introspection XML

```
<interface name="org.allseen.Time.AlarmFactory">
   <property name="Version" type="q" access="read"/>
   <method name="NewAlarm">
     <arg name="newObjPath" type="o" direction="out"/>
   </method>
   <method name="DeleteAlarm">
     <arg name="objPath" type="o" direction="in"/>
   </method>
   <annotation name="org.alljoyn.Bus.Secure" value="true" />
</interface>
```

### Alarm interface

Time-keeping devices that implement an AlarmFactory object 
create objects that implement Alarm for each call to 
AlarmFactory.NewAlarm, as detailed in [AlarmFactory interface][alarmfactory-interface]. 

Devices that do not support dynamic creation/deletion of alarms 
may statically implement a number of Alarm objects and announce them.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.allseen.Time.Alarm` | 1 | no | `/Alarm( running number)` |

#### Properties

| Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |
| Schedule | `((yyyq)y)` | * byte - hour (0-23) | Read-only | The value 01111111 means that the alarm is a "daily" alarm, like on an old-fashioned alarm clock, you set it |
| | | * byte - minute (0-59) | | The value 00000000 means the alarm should fire the next time the alarm's time is reached and then disabled or deleted. |
| | | * byte - seconds (0-59) | | If an alarm clock does not support one of these values, for instance, if it does not support repeat at all or not on specific days, it returns an ERROR message with the error code "org.alljoyn.error.InvalidValue". |
| | | * uint16 - millisecond | | The ERROR message body must contain a string explaining exactly what is not supported. |
| | | * byte - bitmap of weekdays | | If an alarm clock does not support milliseconds, that value should be ignored or rounded down to the nearest precision the device does support. For instance, if milliseconds is set to 8 and the device supports 100ths of seconds it can either ignore the millisecond parameter or set it to 1/100th of a second. |
| | |   * 1 (00000001) is Sunday | |
| | |   * 2 (00000010) is Monday | | 
| | |   * 4 (00000100) is Tuesday | |
| | |   * 128 (10000000 is not used) | |
| Title | `s` | N/A | Read-write | Optional textual description of what this alarm is. |
| Enabled | `b` | * true | Read-write | Indicates whether or not this alarm is enabled. |
| | | *false | | |

#### Methods

None.

#### Signals

##### `AlarmReached`

AlarmReached signal is a Sessionless signal.

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | description | `s` | N/A | What the alarm was set for. |

**Description**

Fired when alarm has reached.

#### Introspection XML

<interface name="org.allseen.Time.Alarm">
   <property name="Version" type="q" access="read"/>
   <property name="Schedule" type="((yyyq)y)" access="readwrite"/> 
   <property name="Title" type="s" access="readwrite"/>
   <property name="Enabled" type="b" access="readwrite"/>
   <signal name="AlarmReached">
     <description>alarm reached signal</description>
   </signal>
</interface>

### TimerFactory interface

The TimerFactory interface provides functionality for creating 
and deleting timers. Each created alarm is a BusObject "underneath" 
the path of the BusObject implementing TimerFactory. 

For instance, if "/MyTimers" implements TimerFactory and Create 
is called it would result in the creation of a new BusObject, 
"/MyTimers/t1" ("t1" is just an example, it can be called anything.) 
The created timer BusObjects implement the Timer interface 
described in the [next section][timer-interface]. 

Time-keeping devices that implement TimerFactory announce the 
object implementing the TimerFactory but not the Timers themselves.

Listing timers is achieved by performing introspection on the 
TimerFactory BusObject.

Since what happens when the Timer is fired is out of scope 
of the Time service, it is advisable for implementations to 
provide an Introspection Description for the TimerFactory 
BusObject that explains, in human-readable text, what happens 
when a timer fires (for example, "Chess Timer 1").

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|---|---|
| `org.allseen.Time.TimerFactory` | 1 | yes | `/TimerFactory( running number)` |

#### Properties

| Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |

#### Methods

##### `o NewTimer`

**Message arguments**

None.

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | newObjPath | `o` | /created/object/path | Object path of the Timer to add. |

**Description**

Creates a BusObject underneath this TimerFactory. The new BusObject 
implements `org.allseen.Time.Timer`.

Returns the the object path of the newly created Timer.

##### `DeleteTimer('o')`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | objPath | `o` | N/A | Object path of the Timer to remove. |

**Reply arguments**

None.

**Description**

Deletes a timer according to its objPath.

#### Introspection XML

<interface name="org.allseen.Time.TimerFactory">
   <property name="Version" type="q" access="read"/>
   <method name="NewTimer">
     <arg name="newObjPath" type="o" direction="out"/>
   </method>
   <method name="DeleteTimer">
     <arg name="objPath" type="o" direction="in"/>
   </method>
   <annotation name="org.alljoyn.Bus.Secure" value="true" />
</interface>

### Timer interface

Time-keeping devices that implement a TimerFactory object 
create objects that implement a Timer for each call to 
TimerFactory.NewTimer, as detailed in [TimerFactory interface][timerfactory-interface]. 

Devices that do not support dynamic creation/deletion of alarms 
may statically implement a number of Alarm objects and announce them.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|---|---|
| `org.allseen.Time.Timer` | 1 | no | `/Timer( running number)` |

#### Properties

|Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| Version | `q` | Positive integers | Read-only | Interface version number |
| Interval | `(uyyq)` | * uint32 - hours | Read-only | Total time to countdown. Depending on the value type (uint32, byte, byte, or uint16), this can be in hours, minutes, seconds, or milliseconds. |
| | | * byte - minute (0-59) | | |
| | | * byte - seconds 0 - 59 | | |
| | | * uint16 - milliseconds | | |
| TimeLeft | `(uyyq)` | * uint32 - hours | Read-only | Amount of time left (hh:mm:ss + milliseconds). |
| | | * byte - minute (0-59) | | |
| | | * byte - seconds 0 - 59 | | |
| | | * uint16 - milliseconds | | |
| IsRunning | `b` | * true | Read-only | Indicates whether the timer is currently running. |
| | | *false | | |
| Repeat | `q (uint16)` | * 0 - 2^16-2 - number of repeats | Read-write | How many times this timer should repeat itself. |
| | | * 2^16-1 - repeat indefinitely | | If an implementation does not support a value, an ERROR message should be returned with the code "org.alljoyn.error.InvalidValue". | 
| Title	| `s` | N/A | Read-write | Optional textual description of what this timer is. |

#### Methods

##### `Start`

**Message arguments**

None.

**Reply arguments**

None.

**Description**

Starts the timer. This method is no-reply so that it is more 
straightforward to synchronize the start of multiple timers. 

##### `Pause`

**Message arguments**

None.

**Reply arguments**

None.

**Description**

Pauses the timer. This method is no-reply so that it is more 
straightforward to synchronize the pause of multiple timers. 

##### `Reset`

**Message arguments**

None.

**Reply arguments**

None.

**Description**

Resets the timer so that TimeLeft is equal to Interval.

#### Signals

##### `TimerEvent`

TimerEvent signal is a Sessionless signal.

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | description | `s` | N/A | What the timer was set for. |


**Description**

Signal sent when the timer fires. 

##### `RunStateChanged`

RunStateChanged signal is not a Sessionless signal.

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | runState | `b` | *true | True if the timer is running, false if it is not. |
| | | | *false | |

**Description**

Signal sent after `Start` or `Pause` is called. 

#### Introspection XML

```
<interface name="org.allseen.Time.Timer">
   <property name="Version" type="q" access="read"/>
   <property name="Interval" type="(uyyq)" access="readwrite"/>
   <property name="TimeLeft" type="(uyyq)" access="read"/>
   <method name="Start">
     <annotation name="org.freedesktop.DBus.Method.NoReply" 
				value="true"/>
   </method>
   <method name="Pause">
     <annotation name="org.freedesktop.DBus.Method.NoReply" 
				value="true"/>
   </method>
   <method name="Reset"/>
   <property name="IsRunning" type="b" access="read"/>
   <property name="Repeat" type="q" access="readwrite"/>
   <property name="Title" type="s" access="readwrite"/>
   <signal name="TimerEvent">
      <description>Timer reached signal</description>
   </signal>
   <signal name="RunStateChanged">
     <arg name="runState" type="b"/>
   </signal>
</interface>
```

[alarm-interface]: #alarm-interface
[guide-to-events-actions]:  /developers/develop/api-guide/events-and-actions
[alarmfactory-interface]: #alarmfactory-interface
[timer-interface]: #timer-interface
[timerfactory-interface]: #timerfactory-interface
