# Introduction

## About Auto-Pinger

From AllJoyn&trade; 14.06 onwards,the Ping API allows applications
to determine whether a remote peer is still up or not. This puts 
a burden on the applications however, as they have to take the 
initiative to do the pinging. Moreover, applications are often 
interested in an up-to-date state of all remote peers rather 
than a snapshot view.

To solve this problem, the Auto-Pinger (introduced in R14.12) periodically pings
a supplied list of peers on the application's behalf and notifies the
application when they become available or leave.

The Auto-Pinger API is currently only available in the C++ language binding of
AllJoyn Core.

## Goal

The Auto-Pinger supplies the application up-to-date information 
on which peers are present and which aren't.

# Usage

## Usage Details

In many cases, applications will want to handle the presence management of
similar peers (say, all peers with which the application has an ongoing session)
in a similar way. The AutoPinger class tries to facilitate this with the concept
of a Ping Group.

When an AutoPinger instance is created, the application first has to define the
applicable Ping Groups. Later on, when peers are discovered, the application
can add them to one or more Ping Groups (either by unique bus name or by
well-known name). The AutoPinger will then periodically perform a `Ping()` call
to all peers in all Ping Groups.

A Ping Group has the following characteristics:

  * it is identified with a name (a string).
  * it has an associated `PingListener`. This listener object is used to inform
    the application about changes in the presence of peers, via the
    `DestinationLost` and `DestinationFound` callbacks.
  * it has a configurable ping interval. The ping interval is the period with
    which all members of the Ping Group will be periodically pinged.

The Ping Group concept offers some advantages:

  * it allows several independent modules in the same application to reuse the
    same AutoPinger object: by choosing different group names and installing
    different listeners, the various modules don't interfere with each other's
    presence logic.
  * it is convenient to treat many peers in the same way: the application can
    increase or decrease the ping frequency of a complete group with a single
    API call. For example, when the application's UI is showing a list of active
    peers, one could reduce the ping interval for the corresponding Ping Group
    to show better responsiveness towards the user. When the application no
    longer displays the screen, the ping interval can be increased again.


The Auto-Pinger's functionality can be temporarily suspended 
(e.g., when an application on a mobile phone goes to the background) 
by calling the `Pause()` method. Upon `Resume()`, the Auto-Pinger continues.

## Code Snippet

The code snippet below should make usage more clear:

```
class PresenceManager : private ajn::services::AnnounceHandler,
    					private ajn::PingListener {
 
	private:
		BusAttachment &ba;
		AutoPinger autoPinger;
		std::set<qcc::String> peers;
		static const int PINGER_INTERVAL = 5; /* Five seconds */
		
    /* implementing function defined in ajn::PingListener */
    void DestinationLost(const qcc::String& group, const qcc::String& destination) {
        std::cout << "on lost " << destination  << std::endl;
    }

    /* implementing function defined in ajn::PingListener */
    void DestinationFound(const qcc::String& group, const qcc::String& destination) {
        std::cout << "on found " << destination  << std::endl; 
    }     
 
	/* implementing function defined in private ajn::PingListener */
	void Announce(unsigned short version,
                               ajn::SessionPort port,
                               const char* busName,
                               const ObjectDescriptions& objectDescs,
                               const AboutData& aboutData){

		//Check if we already saw this peer before
		if (peers.count(busName) == 0){
			/* Add destination to ping group */
			autoPinger.AddDestination("allpeers", busName);
			peers.insert(busName);
		}
 
	public:
		//Assume bus is started and connected
		PresenceManager(BusAttachment &_bus) : bus(_bus), autoPinger(bus) {
			/* Create a ping group */
			autoPinger.addPingGroup("allpeers", *this, PINGER_INTERVAL);
		} 
};
```

# Best practices

## Choosing the Right Ping Interval

Choosing the right ping interval is always a trade-off between 
having the most up-to-date information and not wasting network 
and energy resources. When the application is user facing, there 
are typically higher requirements to the up-to-dateness of the
remote peer state compared to when the application is in the 
background. Also, when a remote peer has not been seen for a 
significant amount of time, it's safe to assume the remote peer 
has gone and you can ping it at a lower interval or even stop 
pinging it altogether. When the remote peer starts again, 
it will send a new announcement.

## Modular Applications

### Share the AutoPinger Instance

When your application consists of multiple (independently developed) modules,
you may want to design your modules in such a way that they can share a single
AutoPinger instance. Every AutoPinger instance creates a timer thread to manage
the periodic invocation of the `Ping()` method, so less AutoPingers means less
threads in your application. In addition, when multiple modules want to keep
track of the same peer, the single AutoPinger can optimize the number of Ping
calls it performs towards that peer, thus reducing overall network traffic.

### Avoid Naming Conflicts

If multiple modules in your application share a single AutoPinger instance, make
sure they don't interfere with each other's Ping Groups. The simplest approach
here is to let every module have its own prefix for its Ping Group names. Hence,
the Foo module's `active` group would be called `FOO.active`, and be different
from the Bar module's `active` group, which would be called `BAR.active`.

## Threading Considerations

The PingListener callbacks will be invoked on AllJoyn's dispatcher threads.
These are the same threads that are used for the invocation of all other
application callbacks (asynchronous method replies, SessionListener callback
invocations, etc.). If you want to perform any blocking operation (for example,
a synchronous method call) from within a PingListener callback, you must first
call `BusAttachment::EnableConcurrentCallbacks()`.
