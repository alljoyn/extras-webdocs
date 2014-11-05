# Events and Actions

The Events and Actions feature is a generic mechanism that
simple interoperability between AllJoyn apps and devices. It 
enables apps and devices to send events that can be easily 
discovered and received by other apps and devices. Similarly, 
apps and devices can offer actions for other apps and devices
to discover and invoke. For example, a proximity sensor can emit
an event when someone walks by and a lamp can accept an action
to turn on the light. By being able to discover these events
and actions, one can create an app to turn on the light when
the sensor trips. This simple mechanism, with its discoverability,
enables apps to create dynamic ad hoc interactions.

Events and Actions build on top of the AllJoyn&trade; Core.
An event is merely a signal within an AllJoyn interface with
an associated human readable `description` that explains what
the event is. Similarly, a method is just an action with a
`description` in an AllJoyn interface. Standard AllJoyn Core
APIs are used to send and receive events and to invoke and
process actions.

Events and Actions build on top of the AllJoyn Core and 
together form sentence fragments. An event is merely a signal 
within an AllJoyn interface with an associated human readable 
`description` that explains what the event is, where the description
forms the first part of a sentence fragment. Similarly, a method is 
just an action with a `description` in an AllJoyn interface, 
where the description forms the end of a sentence fragment. 
Standard AllJoyn Core APIs are used to send and receive events
and to invoke and process actions.

Here is an example of what an interface with a `description` 
looks like:

```xml
   <interface name="com.example.LightBulb">
      <method name="ToggleSwitch">
         <description>Toggle light switch</description>
      </method>
      <signal name="LightOn" sessionless="true">
         <description>The light has been turned on</description>
      </signal>
   </interface>
```

Since all AllJoyn interfaces are introspectable, so are events
and actions. The `description` tag, which supports multiple
languages, is provided to give the user some information about
what the event and action is.

When an event is connected to an action a sentence is formed. 
Using the above example a connection of the two creates "The light 
has been turned on, Toggle the light switch".

Like with all AllJoyn interfaces, events and actions can require
security, thus limiting those who can receive events and call 
actions.

## Learn more

See the [Events and Actions API Guide][events-actions] to more 
learn how to add Events and Actions into your application.

[events-actions]: /develop/api-guide/events-and-actions