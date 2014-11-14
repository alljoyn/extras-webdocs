# Introduction

## About Auto-Pinger

AllJoyn 14.06 features a Ping API which allows applications to determine whether a remote peer is still up or not. This puts a burden on the applications however, as they have to take the initiative to do the pinging. Moreover, applications are often interested in an up-to-date state of all remote peers rather than a snapshot view.

To solve this problem, the Auto-Pinger periodically pings a supplied list of peers on the application's behalf and notify the application when they become available or leave.

## Goal

The Auto-Pinger supplies the application up-to-date information on which peers are present and which aren't.

 

# Usage

## Usage Details

Typically you only construct one AutoPinger object per application. Different remote peers can be put into different ping groups. Ping groups distinguish themselves from one another by having a different timer interval.

The Auto-Pinger's functionality can be temporarily suspended (e.g. when the mobile application goes to the background) by calling the Pause() method. Upon Resume() the Auto-Pinger continues.

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

Choosing the right ping interval is always a trade-off between having the most up-to-date information and not wasting network and energy resources. When the application is user facing, there are typically higher requirements to the up-to-dateness of the remote peer state compared to when the application is in the background. Also, when a remote peer has not been seen for a significant amount of time, it's safe to assume the remote peer has gone and you can ping it at a lower interval or even stop pinging it altogether. When the remote peer starts again, it will send a new announcement.

## Thread Considerations

No assumptions should be made on which thread the PingListener functions shall be called. However, you can safely assume they will not be called any more when the AutoPinger object has been destroyed.

