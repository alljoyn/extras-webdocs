# The Data-driven API for AllJoyn

## About the Data-Driven API

The Data-driven API (DDAPI) for AllJoyn is an alternative API for the AllJoyn framework. It is built
on top of the standard AllJoyn API and  is specifically tailored to use cases for the Internet of Things.
Instead of the standard framework's service-oriented paradigm, it uses the publish/subcribe paradigm.
It is also data-centric.

Some conceptual knowledge of the AllJoyn core framework is required to use the DDAPI for application
development.

## The Publish/Subscribe Pattern

### About the Public/Subscribe Pattern

Publish/Subscribe is a messaging pattern where providers and consumers of data are decoupled
in space and time. The data space is divided into a number of topics.
Data providers push messages out to the topics whenever they have data to share. Data consumers
subscribe to the topics they are interested in and consume the information available on the
topics at their own leisure.

### Advantages

This pattern offers the following advantages:

* Scalability: in general, pub/sub offers more scalability. In a typical Internet of
  Things (IoT) scenario, the number of devices can become quite large. This leads to a vast
  number of interconnections between the devices.   In the pub/sub view, each device
  listens or puts data on a data bus, and a direct connection with the other devices
  is not required. This is valid for classic pub/sub systems (e.g. DDS)
  In the case of the DDAPI, the complexity of connections is still there in the core layer,
  but is hidden from the developer. This way the developer can focus on the application
  logic without having to bother or be limited by the complexity of connection set-up.

* Loosely coupled: providers are loosely coupled to consumers, and need not even know of their
  existence. With the object interface being the focus, providers and observers are allowed
  to remain ignorant of system topology.   Each can continue to operate normally without the
  need to be aware of any of the other devices.

  This is a very important feature since in an IoT scenario, the actual state of a device, and
  therefore the application running on it is continually changing and hard to predict: devices
  can go into sleep mode, go offline, leave the proximal network and so on.

## Data-Centricity

In a pub/sub environment, there are two approaches:

* Service-oriented: where topics are based on actions.
* Data-centric: where topics are based on facts.

The DDAPI is, as its name suggests, data-driven. Facts are a lot more future-proof than actions. 
The nature of a fact evolves very little over time: a length two hundred years ago is still a length
now. The essence of what a length is has not changed.

Consider the ever growing and evolving world of the Internet of Things. These "things" and the services they
offer are continuously evolving as well. They become smarter and more complex. Instead of being
controlled by an outside entity, they become able to measure or sample their environment and
act upon the data they sample.

A modern smart thermostat, for example is light years removed from its original ancestor,
the thermo-couple. Yet, throughout its evolution, one thing remained the same: it measure the
temperature in some way and acts upon it. The essence of the the  data, the temperature, is still
exactly the same. Only values change.

Modern thermostats offer more accurate readings and process additional information (e.g. the time
for programmable thermostats), but the type of data it acts upon, is still exactly the same as when the
first thermo-couple turned temperature into action.

In the DDAPI, facts are exchanged over topics located on a data bus.

The DDAPI also uses structured data. The structure and meaning of the data are explicitly exposed to the
system and not modeled in a higher layer. This allows for better re-use of the published data (if you can
subscribe to the topic, you implicitly know how to interpret the data.

Instead of sending out data that is relevant only to a particular use-case, the information
providers in a data-driven world publish facts about the world, and any information consumer can interpret
those facts and derive from them the information it needs, or take the actions it needs.


## The Differences Between Standard AllJoyn and the DDAPI

The DDAPI distinguishes itself from the standard AllJoyn API in the
following ways:

* The DDAPI uses a pub/sub pattern instead of the service-oriented, RPC-based approach
  of standard AllJoyn. However, it fully supports this service-oriented paradigm, and seamlessly
  allows hybrid scenarios where DDAPI-based applications communicate with standard AllJoyn
  applications.

* The DDAPI, as its name suggests, puts data at its centre. Throughout the lifetime of
  connected objects, the data handled by that object is much more constant than the services
  it offers.

* The DDAPI uses a  unified approach to discovery and session setup. It enforces a single
  mechanism for discovery and session setup. This increases interoperability   between devices
  and applications made by different vendors. The main driver behind the unified discovery and
  session setup is the desire to avoid interoperablity conflicts. Imagine a situation where you need two
  different light control applications  for your smart light bulbs just because vendor A decided
  to use a different session port or discovery string than vendor B.

* Compared to standard AllJoyn, the DDAPI is radically simplified. The unified discovery and
  session setup system requires virtually no API. There is only one way to do things, and the
  DDAPI library does most of the hard work for you. On top of this, the DDAPI leverages the AllJoyn Code
  Generator to turn interface specifications (in XML format) into code that deals with type registration 
  and message marshaling and unmarshaling.

  This means that the DDAPI lets the application developer focus on the business logic instead
  of the communication logic.

## How the DDAPI Works

### Universal Data Bus

In the DDAPI, the Alljoyn bus acts as a universal data bus. The bus is divided into a number of Topics
and data is posted to those Topics by Providers and read from the bus by Consumers.

### Strongly Typed Data

In the DDAPI, data is strongly typed. The data space is divided into topics. Each of these topics has
a well-defined data type.

There is nothing to prevent different topics from having the same data type. In practice, however, the
topics will have an identical, but differently named data-type.

This increases interoperability:
* If a similar product (e.g. a thermostat) of different vendors implement the same topic in
the same, standardized way, an application can read the topics provided by those products,
no matter what vendor.

* Similarly, if different app developers use the same topic in the same, standardized way,
the products will be able to communicate with the app, no matter what developer.

### The Observer

The DDAPI introduces a special entity, the Observer. A consumer will not interact directly with
the bus. Instead, it implements an Observer. The Observer takes care of all the heavy lifting,
such as establishing contact with applications, determining whether they offer any topics of interest,
reading those topics, informing the Consumer if new data is available on the topic and so on.
This takes all that responsibility away from the application, and hence from the programmer.

### The Introspection XML and the Code Generator

Topics are described using the AllJoyn Introspection XML language. The Code Generator translates
those XML files into boilerplate code which can be included in an application.

### Example: a Thermostat

Let's get back to our thermostat example. Imagine an application that want to read that thermostat. That application
is interested (acting as a Consumer) in a Temperature topic provided by the thermostat (acting as a Provider).

The thermostat provides instances of the Temperature topic on the bus. Each Consumer has a Temperature Observer that
observes the bus and takes note of whatever happens on the Temperature topic. The Consumer can be notified when a
new instance is available, read the values etcetera.

In addition to the temperature, the thermostat could be able to measure the humidity. It will publisg the information
on a separate Humidity topic. Consumers interested in Humidity will subscribe to that topic, and need not care about
the fact that the device providing the information in this case is really a thermostat whose main function is to
measure and regulate temperature. This simplifies the way a Consumer interacts with the thermostat.

On an application or conceptual level, the Consumers and the Providers never directly interact. Nor do they need to be
aware of each other's presence. Under the hood, the DDAPI makes sure the necessary interaction occurs using the AllJoyn
core framework.

A Consumer uses an Observer to get the data it is interested in. It acts upon the presence data on the topic,
and is not concerned with whether or not the thermostat that provided it is at all present.

Similarly, the thermostat provides its data on the bus, without concerning itself whether any Consumer is present
to consume that data.

## Current Status

An implementation of the DDAPI exists for C++. Other language bindings are under development.

