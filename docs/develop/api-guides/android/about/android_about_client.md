#Android - About Client Usage Guide

-----
##Reference code

The reference code consists of server and client implementations of the About feature.

### Classes used to receive AboutData

| CLASS  | DESCRIPTION |
|---|---|
| AboutClient | Helper class for discovering About Server that provides access to the Announcements and to the AboutService. It listens for Announcements sent using the org.alljoyn.About interface. |
| AboutIconClient | Helper class that provides access to the AboutIconService. |

-----

## Build an application that uses About Client

Perform the following steps at a high level to build an application that will receive AboutData.

1. Create the base for the AllJoyn application.
2. Create and register the AboutService.
3. Create and register the AnnounceListener.
4. Create and use the AboutClient.

-----

## Setting Up the AllJoyn&trade; Framework

See [Setting Up the AllJoyn Framework][android_setting_up_the_alljoyn_framework].

-----

## Implementing an Application that uses About Client

To implement an application to receive AboutData, use the AboutClient class. By using the AboutClient class, your application is notified when About Server instances send announcements.

Verify the BusAttachment has been created, started and connected before implementing an About Client. See [Setting Up the AllJoyn Framework][android_setting_up_the_alljoyn_framework] for the code snippets. These codes snippets reference a variable mBus (the BusAttachment variable name).

###1. Create the AboutService object

For an application to receive AboutData, it requires an instance of the AboutService class. AboutServiceImpl is an implementation wrapper around AllJoyn native calls that handle the interactions with the About Server.

```
AboutService aboutService = AboutServiceImpl.getInstance();
```

###2. Start Client mode
```
aboutService.startAboutClient(mBus);
```

###3. Set up ability to receive the Announce signal.

In order to receive the Announce signal from an application using AboutService, a few tasks must be performed.

####3.1 Implement AnnounceHandler class

Create a class that implements the AboutHandler. This class will be triggered when an announcement arrives.

*Note	onDeviceLost has been deprecated. Use BusAttachment.ping to detect whether an application sending an Announce signal is present and responding.*

```
public class MyAnnouncementHandler implements AnnouncementHandler
{
    @Override
    public void onAnnouncement(String peerName, short port, BusObjectDescription[] interfaces, Map<String, Variant> aboutMap) {
    
        Map<String, Object> newMap = new HashMap<String, Object>();
        try {
            newMap = TransportUtil.fromVariantMap(aboutMap);
            String deviceId = (String) (newMap.get(AboutKeys.ABOUT_APP_ID).toString());
            String deviceFriendlyName = (String) newMap.get(AboutKeys.ABOUT_DEVICE_NAME);
                m_logger.debug(TAG, "onAnnouncement received: with parameters:
                busName:"+deviceName+"\t, port:"+port+"\t, deviceid"+deviceId+ "\t, deviceName:"+deviceFriendlyName);
            //create a client instance to connect to this peer. See possible implementation of this call in subsection 5.1.
            engageWithPeer(port, peerName, interfaces, newMap);
        } catch (BusException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDeviceLost(String serviceName) {}
}
```

####3.2 Register the class you created

After starting the AboutService in *Start Client mode*, add the following to register the class you created in *Implement AnnounceHandler class*.

When registering an announcement listener, specify which interfaces the application is interested in. The code below shows a listener registered to receive Announce signals that include an object implementing the INTERFACE_NAME interface.

```
MyAnnouncementHandler announceHandler = new MyAnnouncementHandler();
aboutService.addAnnouncementHandler(announceHandler, new String[] { INTERFACE_NAME
});
```

###4. Using ping to determine presence

The BusAttachment ping member function can be used to determine if a device is responsive. Contents of an Announce signal can be stale so it may be useful to ping the device to see if it is still present and responsive before attempting to form a connection.

*Note	The BusAttachment.ping method makes a bus call. If ping is called inside an AllJoyn callback, BusAttachment.enableConcurrentCallbacks must be called first.*

```
// When pinging a remote bus name wait a max of 5 seconds private final int PING_WAIT_TIME = 5000; mBus.enableConcurrentCallbacks();
Status status = mBus.ping(peerName, PING_WAIT_TIME);
if (Status.OK == status) {

}

```

###5. Request non-announced data

If there is a need to request information that is not contained in the announcement, perform the following steps.

####5.1 Create AboutClient

Generate an instance of AboutClient to engage with a peer About Server whose Announcement was received in the onAnnouncement() implementation of your MyAnnouncementHandler instance.

Using the AboutClient instance you can exercise the About feature API as described in the
*AllJoyn About Feature Interface Specification*.

The following is an example implementation of the call shown in *Implement AnnounceHandler class*.

```
private void engageWithPeer(Short port, String peerName, BusObjectDescription[]
interfaces, Map<String, Object> announceMap) { 
    MyAvailabilityListener availabilityListener = new MyAvailabilityListener();
    AboutClient aboutClient = aboutService.createAboutClient(peerName, availabilityListener, port);
    aboutClient.connect();
    // Use the generated AboutClient instance according to your needs.
    // E.g. retrieve AboutData
    Map <String, Object> aboutData =
    aboutClient.getAbout((String)announceMap.get("DefaultLanaguge"));
    // E.g. retrieve ObjectDescription
    BusObjectDescription [] od = aboutClient.getBusObjectDescription();
}
```

####5.2 Request AboutData

AboutData is retrieved via the AboutClient. The structure that is returned can be iterated through to determine the contents. The content definition is found in the *AllJoyn About Feature Interface Specification*.

```
aboutClient.getAbout((String)announceMap.get("DefaultLanaguge"));
```

####5.3 Create AboutIconClient (optional)

Generate an instance of AboutIconClient to receive the DeviceIcon out of a peer About Server whose Announcement was received in the onAnnouncement() implementation of your MyAnnouncementHandler instance.

The following is an example implementation of the call shown in *Implement AnnounceHandler class*.

```
private void engageWithPeer(Short port, String peerName, BusObjectDescription[]
interfaces, Map<String, Object> announceMap) {
    MyAvailabilityListener availabilityListener = new MyAvailabilityListener();
    boolean hasIcon = false;
    for (BusObjectDescription bod : objectDescriptionArray) {
        if (bod.path.equals("/About/DeviceIcon") {
            hasIcon = true;
            break;
        }
    }
    if (hasIcon) {
        AboutIconClient aboutIconClient = aboutService.createAboutIconClient(peerName, availabilityListener, port);
        aboutIconClient.connect();
        // Use the generated AboutIconClient instance according to your needs.
        // E.g. retrieve icon content
        byte [] iconContent = aboutIconClient.GetContent();
    }
}
```

####5.4 Request the icon content (optional)

The icon data is requested through the AboutClientIcon. The structure that is returned can be iterated through to determine the contents. The content definition is found in the *AllJoyn About Feature Interface Specification*.

```
aboutIconClient.GetContent();
```

###6. Releasing resources

Once you are done using the About feature and the AllJoyn framework, unregister listeners, disconnect and stop the clients, services, and the BusAttachment used in the application.

```
if(aboutClient != null) {
    aboutClient.disconnect();
}
if(aboutService != null) {
    aboutService.unregisterAnnounceListener(announceListener); 
    aboutService.stopClient();
}
if(mBus != null) {
    mBus.disconnect();
    mBus.release();
    mBus = null;
}
```

[android_setting_up_the_alljoyn_framework]: /develop/api-guides/android/about/android_setting_up_the_alljoyn_framework
