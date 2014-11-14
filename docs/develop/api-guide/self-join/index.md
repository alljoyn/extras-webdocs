# Introduction

## What is the Self-Join Feature?

In AllJoyn, interactions between peers (method calls, signal emission, getting or setting properties, ...) typically happen in the context of a session. In AllJoyn releases up to R14.06, it was impossible for applications to join a session they themselves hosted. For applications that consume information or services they themselves also provide, this created an asymmetry: they had to treat the bus objects they hosted themselves differently from those hosted by other peers. The self-join feature removes this asymmetry by allowing applications to join the sessions they themselves host. Consequently, a locally hosted bus object can be treated in exactly the same way as a remotely hosted bus object.

## Goal

By enabling leaf nodes leaves to self-join, applications can treat local and remote bus objects in a uniform way, thereby:

* Combining the role of consumer and provider in one application,
* Making integrated application design more straight-forward.

 

# Use cases

## Data provider abstraction

Applications that make use of more data-centric interface definitions can be both the provider and consumer of objects of the same data type. Imagine a photo sharing application that models shared photos as bus objects. The application allows both sharing picures and voew pictures shared by other applications. Without the ability to self-join, that application needs to treat the photos it shares different from the photos shared by others. This requires dedicated code for sharing and code for viewing. Thanks to self-join, this is no longer needed: the photo viewer module in the application can treat the photo sharing module in the same application similar to any other photo sharing module in remote peers, set up a session, and discover and access the shared photos over that session.

## Chat

In AllJoyn versions up to R14.06, a leaf node would receive other participants' chat messages but not its own. While this is seemingly not a problem as the application would know its own chat message, it makes the application design unnecessarily complicated as local and remote chat messages take a completely different code path.

 

 

# Design

## About the Design

The concept of self-join is local to the leaf node (which is by definition always the host node), and the routing node it is connected to. This ensures backwards compatibility with older routing nodes. Other peers are not aware of the self-join.

In a multipoint session, other members will not be notified when the host self-joins (or self-leaves). Only when the leaf node has left completely (both as host and joiner), the other peers will be notified. In other words, no additional_ AttachSession()_ is sent when a self-join happens. Similarly, when a self-joined leaf leaves (or is removed), no_ DetachSession()_ is sent. Only when the leaf is completely gone from the session, a _DetachSession()_ is sent to the others.

Locally, however, the leaf _will_ notify the application when the host self-joins (or self-leaves). When emitting a signal on a session, it is also delivered to the emitting leaf if that leaf was self-joined.

 

 

#  API changes

## About the API Changes

Prior to the introduction of self-join, the distinction between host and joiner was never made explicit, e.g. per session a leaf node could only have one session listener. This was never really a problem because in a particular session a leaf node was either host or joiner. The introduction of self-join has changed this: a leaf node can serve now both roles.

Besides the traditional_ BusAttachment::LeaveSession()_ and _BusAttachment::SetSessionListener(_), there are now more specific variants to reflect this dual role:

* _ BusAttachment::LeaveHostedSession()_,
* _BusAttachment::LeaveJoinedSession(),_ 
* _BusAttachment::SetHostedSessionListener()_ and
* _BusAttachment::SetJoinedSessionListener()_ 

Backwards compatibility has been preserved: if an application takes up only one role in the session, the unspecified _LeaveSession()_ and_ SetSessionListener()_ calls will perform as they always have. Only when an application is actively involved in a self-join scenario, and the old calls are ambiguous,you are really required to make use of the _LeaveHostedSession(), SetHostedSessionListener()_ variants. We do urge you to make use of the more specific variants in new applications however, as they more clearly reflect the role your application is playing in the ongoing session.

## Existing API calls

Below are some more details on the use of existing API calls: 
```
BusAttachment::LeaveSession()
```
For applications other than the session host, nothing has changed. For a self-joined application, this API call is ambiguous, and will return an error.

> **Deprecated:** if possible, use the more specific_ LeaveHostedSession()_ and _LeaveJoinedSession()_ variants.

```
BusAttachment::SetSessionListener()
```
For applications other than the session host, nothing has changed. For a self-joined application, this API call is ambiguous, and will return an error.

> **Deprecated:** if possible, use the more specific _SetHostedSessionListener()_ and_ SetJoinedSessionListener(_) variants.

## New API calls


Below are some more details on the use of new API calls:

### Leave Hosted Session

#### Call
  

```
BusAttachment::LeaveHostedSession()
```
#### Description
Leave session as the host. This function will fail if the application is not the session host.

### Leave Joined Session

#### Call

```
BusAttachment::LeaveJoinedSession()
```
#### Description

Leave session as a joiner. This function will fail if the application is not joined to this session.

### Set Hosted Session Listener

#### Call

```
BusAttachment::SetHostedSessionListener()
```

#### Description

Set listener for session callbacks related to the application's role as session host (e.g. SessionJoined). This function will fail if the application is not the session host.

### Set Joined Session Listener

#### Call

```
BusAttachment::SetJoinedSessionListener()
``` 

#### Description

Set listener for session callbacks related to the application's role as session joiner. This function will fail if the application is not joined to this session.
