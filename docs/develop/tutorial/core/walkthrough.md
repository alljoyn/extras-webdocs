# Walkthrough
This is the code walkthrough of the first_app sample application 
found in the [Hackfest project][hackfest].

In designing this sample application, we tried to seprate the 
application into 3 sections of functinality to better aid in understanding.
* **Main application code - main**
  * Handles the command line input
  * Creates and places calls into the code that manages interactions with the AllJoyn APIs
* **AllJoyn&trade; API code - MyAllJoynCode**
  * Shows how to initialize the AllJoyn framework
  * Use the About Feature for service-level advertisement/discovery
  * Binds a session and tracks hosted sessionId
  * Tracks users on a sessionId
  * Interacts with MyFirstBusObject to communicate with other AllJoyn entities
* **BusObject Implmentation - MyFirstBusObject**
  * Creates and implements an AllJoyn Interface
  * Shows how to send a BusMethod and get a reply
  * Shows how to send a Signal and Sessionless Signal
  * Shows how to receive Signals

NOTE: The code snippets are not complete by themselves and requires 
the entire software to run. The snippets should be used as a reference 
on how to use the AllJoyn APIs to help build an Application.


Every AllJoyn application creates a BusAttachment, starts it, 
and connects to an [AllJoyn Router][alljoyn-router]. The BusAttachment 
is the Object that allows you to use the AllJoyn APIs.
```
        mBusAttachment = new BusAttachment("MyFirstApplication", true);
        /* Start the msg bus */
        if (ER_OK == status) {
            status = mBusAttachment->Start();
        } else {
            printf("BusAttachment::Start failed\n");
        }
        /* Connect to the daemon */
        if (ER_OK == status) {
            status = mBusAttachment->Connect();
            if (ER_OK != status) {
                printf("BusAttachment Connect failed.\n");
            }
        }
``` 

Now that the BusAttachment is set up, our next action is to decide 
what we want to do with the app. In this tutorial sample application, 
we are going to be both a client and service side - a true peer on 
the network.  In order to allow connections, we need to `BindSession`.
```
        ...
        /* Bind a session port so that we can accept incomming join requests */
        SessionOpts opts(SessionOpts::TRAFFIC_MESSAGES, true, SessionOpts::PROXIMITY_ANY, TRANSPORT_ANY);
        SessionPort sp = SESSION_PORT_ANY; 
        status = mBusAttachment->BindSessionPort(sp, opts, *this);
        if (ER_OK != status) {
            printf("Failed to bind session port\n");
        }
        ...
```
We use `SESSION_PORT_ANY` because it doesn't matter what the port is 
in this sample.  We want the AllJoyn framework to assign us one to use 
and that will then get passed into our About data.  To "inform" other 
applications that we exist, we need to set up to use the About feature.
```
        ...
        /* Create About data so that we can advertise */
        mAboutData = new AboutPropertyStoreImpl();
        // a platform-specific unique device id - ex. could be the Mac address
        // use a random value for this application, this should persist in a comercial application
        mAboutData->setDeviceId(getDeviceId());
        mAboutData->setDeviceName("MyDeviceName");
        // the globally unique identifier for the application - recommend to use an online GUID generator to create
        // use a random value for this application, this should persist in a comercial application
        mAboutData->setAppId(getAppId());
        std::vector<qcc::String> languages(1);
        languages[0] = "en";
        mAboutData->setSupportedLangs(languages);
        mAboutData->setDefaultLang("en");
        mAboutData->setAppName(appName);
        mAboutData->setModelNumber("Tutorial5000");
        mAboutData->setDateOfManufacture("8/15/2014");
        mAboutData->setSoftwareVersion("1.0 build 1");
        mAboutData->setAjSoftwareVersion(ajn::GetVersion());
        mAboutData->setHardwareVersion("N/A");
        mAboutData->setDescription("This is the my first AllJoyn Application!", "en");
        mAboutData->setManufacturer("Company", "Me");
        mAboutData->setSupportUrl("http://www.allseenalliance.org");

        /* Initialize the About feature Service side */
        AboutServiceApi::Init(*mBusAttachment, *mAboutData);

        /* Register the port with About feature that was set when BindSession called */
        status = AboutServiceApi::getInstance()->Register(sp);
        /* Register the About feature with AllJoyn */
        status = mBusAttachment->RegisterBusObject(*AboutServiceApi::getInstance());
        ...
```

Our application is starting to come together, we have the foundation 
to allow other applications to find and connect to us.

Next, we create our `BusObjects` and then add them to the About data so 
that applications can filter for just the interfaces we support.
```
        ...
        /* Create and Register the developers BusObjects */
        /**
         * Here is where we add the objects we wish to expose.
         * A developer would modify this section to add different BusObjects.
         */
        mMyFirstBusObject = new MyFirstBusObject(*mBusAttachment);

        /* Now register the object with AllJoyn and About */
        QStatus status;
        status = mBusAttachment->RegisterBusObject(*mMyFirstBusObject);
        if (ER_OK != status) {
            printf("Could not register the BusObject with the BusAttachment\n");
        }

        std::vector<qcc::String> interfacesUsed;
        for( int i = 0; i < mMyFirstBusObject->getNumberOfInterfaces(); i++) {
            interfacesUsed.push_back(mMyFirstBusObject->getInterfaceName(i));
        }
        status = AboutServiceApi::getInstance()->AddObjectDescription(mMyFirstBusObject->getObjectPath(), interfacesUsed);
        if (ER_OK != status) {
            printf("Error returned by AddObjectDescription (%s).\n", QCC_StatusText(status));
        }
```
The `BusObject` `MyFirstBusObject` contains all of the information that 
will allow us to interact with other "first_app" applications. It exposes 
the API set that we implement.

Our `BusAttachment` is created, started, and connected.  The connection setup 
done, device details set, and the Object has been registered. Now let's make 
the registration call so that we can find other "first_app" applications.  
Just making the API call is not enough, we need to explictly tell the AllJoyn 
framework that we are interested in receiving Sessionless signals.
```
        /* Now create a list of the interfaces used so that we can find just applications that use these interfaces */
        int len = interfacesUsed.size();
        const char* interfaces[len];
        for( int i = 0; i < len; i++) {
           interfaces[i] = interfacesUsed[i].c_str();
        }

        /*
         * Register this class to receive AllJoyn About feature annoucements from the services we care about.
         * This performs service level discovery
         */
        AnnouncementRegistrar::RegisterAnnounceHandler(*mBusAttachment, *this, interfaces, len);
        /* Add the match so we receive sessionless signals */
        status = mBusAttachment->AddMatch("sessionless='t'");
        if (ER_OK != status) {
            printf("Failed to addMatch for sessionless signals: %s\n", QCC_StatusText(status));
        }
```
The list of interfaces is supplied so that we have filtering and find 
just the applications that have the interface support that we can interact with.

Lastly, we need to tell the world about our existance. To do this, we make 
a call to the About feature to have it Announce.
```
        /* With the objects registered and everything setup we Annouce to tell the world that we exist  */
        status = AboutServiceApi::getInstance()->Announce();
        if (ER_OK != status) {
            printf("Failed to addMatch for sessionless signals: %s\n", QCC_StatusText(status));
        }
```

The AllJoyn APIs have been used to set up all the interaction, but we 
still need to define how we are going to interact. This is where we will 
implement our AllJoyn interface and expose it on a `BusObject`.

In designing this tutorial sample, we wanted to show a little variety of 
how applications can interact.  We decided on a simple interface as follows:
```
    <node name="/my/first/busobject/communicate">
        <interface name="org.example.my.first.alljoyn.interface.communicate">
            <method name="Tell">
                <arg name="thought" type="s" direction="in"/>
                <arg name="reply" type="s" direction="out"/>
            </method>
            <signal name="Share">
                <arg name="thought" type="s"/>
            </signal>
            <signal name="Broadcast">
                <arg name="thought" type="s"/>
            </signal>
        </interface>
    </node>
```
In the above interface, Share and Broadcast are identical! Why did we do that? 
This was to help express and show how signals can be sent on a single session 
or as a Sessionless signal.  The "Share" signal in this example could have been 
sent as a Sessionless signal to reduce the number of signals defined.  Similarly, 
the Broadcast could have been used instead of "Share". But for the sake of simplicty 
and understanding, "Share" takes place in a group and "Broadcast" is available to the world.

We now have our interface defined so we can implement it in the software.
```
    static const char * MY_FIRST_OBJECT_PATH = "/my/first/busobject/communicate";
    static const char * MY_FIRST_INTERFACE_NAMES[] = {"org.example.my.first.alljoyn.interface.communicate"};
    static const uint32_t MY_NUMBER_OF_INTERFACES = 1;
    ...
    ...
    QStatus status;
    InterfaceDescription* myFirstBusObjectIntf = NULL;
    if (!mBusAttachment.GetInterface(MY_FIRST_INTERFACE_NAMES[0])) {
        status = mBusAttachment.CreateInterface(MY_FIRST_INTERFACE_NAMES[0], myFirstBusObjectIntf);

        //Add BusMethods
        myFirstBusObjectIntf->AddMethod("Tell", "s", "s", "thought,reply", 0);
        myFirstBusObjectIntf->AddSignal("Share", "s", "thought", 0);// on a session
        myFirstBusObjectIntf->AddSignal("Broadcast", "s", "thought", 0);

        myFirstBusObjectIntf->Activate();
    }
```
The interface is now activated and ready to be used. We can now add it to our 
BusObject so that the AllJoyn framework knows that this object implements the above interface.
```
    /* Add the service interface to this object */
    const InterfaceDescription* myFirstBusObjectTestIntf = mBusAttachment.GetInterface(MY_FIRST_INTERFACE_NAMES[0]);
    assert(myFirstBusObjectTestIntf);
    AddInterface(*myFirstBusObjectTestIntf);
```
The next step is to set up the method handlers for the BusMethod and the Signals 
(if used in your application).
```
    /* Set the local methods to which BusMethod linkage */
    const MethodEntry methodEntries[] = {
        { myFirstBusObjectTestIntf->GetMember("Tell"), static_cast<MessageReceiver::MethodHandler>(&MyFirstBusObject::handleTell) },
    };
    status = AddMethodHandlers(methodEntries, sizeof(methodEntries)/sizeof(methodEntries[0])); 

    /* Register the signal handlers */
    shareMember = myFirstBusObjectTestIntf->GetMember("Share");
    broadcastMember = myFirstBusObjectTestIntf->GetMember("Broadcast");
    if (shareMember) {
        status =  mBusAttachment.RegisterSignalHandler(this,
            static_cast<MessageReceiver::SignalHandler>(&MyFirstBusObject::shareHandler),
            shareMember,
            NULL);
    }
    if (broadcastMember) {
        status =  mBusAttachment.RegisterSignalHandler(this,
            static_cast<MessageReceiver::SignalHandler>(&MyFirstBusObject::broadcastHandler),
            broadcastMember,
            NULL);
    }
```

The only thing missing now is in order to receive signals, much like 
we had to do to receive the About Annoucement, we need to explictly 
tell the AllJoyn framework what we are interested in.
```
    static const char * MY_FIRST_ADD_MATCH_RULE = "type='signal',interface='org.example.my.first.alljoyn.interface.communicate'";
    ...
    /* Make addMatch calls to complete the registration with the AllJoyn router */
    mBusAttachment.AddMatch(MY_FIRST_ADD_MATCH_RULE);
    ...
}
```

Lastly, we implment the functions we assigned to handle the incoming responses.
```
void MyFirstBusObject::handleTell(const InterfaceDescription::Member* member, Message& msg)
{
	const char* receivedThought = msg->GetArg(0)->v_string.str;
    printf("Someone(%s) told you (%s)\n", msg->GetSender(), receivedThought);

    MsgArg reply;
    reply.Set("s", "You're so funny!");
	QStatus status = MethodReply(msg, &reply, 1);
	if (status == ER_OK) {
        printf("You let them know they are funny!\n", receivedThought);
    } else {
        printf("An error occured and they do not know that they are funny.\n", receivedThought);
    }
}
void MyFirstBusObject::shareHandler(const InterfaceDescription::Member* member, const char* srcPath, Message& msg)
{
	const char* receivedThought = msg->GetArg(0)->v_string.str;
    const char* fromUser = msg->GetSender();
    printf("Received shared thought (%s) from %s on sessionId %d\n", receivedThought, fromUser, msg->GetSessionId());
}
void MyFirstBusObject::broadcastHandler(const InterfaceDescription::Member* member, const char* srcPath, Message& msg)
{
	const char* receivedThought = msg->GetArg(0)->v_string.str;
    const char* fromUser = msg->GetSender();
    printf("Received a broudcast thought (%s) from %s\n", receivedThought, fromUser);  
}
```
The above methods will be automatically triggered by the AllJoyn framework 
when an AllJoyn message comes in that is intended for us when the receipt 
factors are met. Specifically, we are in the same session that the `Signal` 
or BusMethod call came in on, or the "Broadcast" sessionless signal came in.

The last thing that this application needs is a the code to place the `BusMethod` 
call or to send the `Signals`.
To execute a BusMethod call on another application, we need to create a 
`ProxyBusObject` that represents that application's software. In order to 
do this, we need the UniqueName of the other application, the sessionId that 
we are joined into, and the Path that the object lives. In this example, 
we have a fixed path of "/my/first/busobject/communicate".
```
qcc::String MyFirstBusObject::doTell(qcc::String uniqueName, qcc::String thought, int sessionId)
{
    ProxyBusObject remoteObj = ProxyBusObject(*bus, uniqueName.c_str(), MY_FIRST_OBJECT_PATH, (SessionId)sessionId);    
    remoteObj.AddInterface(MY_FIRST_INTERFACE_NAMES[0]);
    Message reply(*bus);
    MsgArg arg("s", thought.c_str());
    QStatus status = remoteObj.MethodCall(MY_FIRST_INTERFACE_NAMES[0], "Tell", &arg, 1, reply);
    if (ER_OK == status) {
        return reply->GetArg(0)->v_string.str; 
    }
    return "ERROR";
}
```

Sending of a `Signal` is done through the `BusObject`'s `Signal` method. 
What makes a signal bound to a session is by passing in a valid `SessionId`. 
What makes it a Sessionless Signal is by setting the flag that describes it as such.
```
void MyFirstBusObject::doShare(qcc::String thought, int sessionId)
{
    MsgArg payload("s", thought.c_str());
    uint8_t flags = 0;
    Signal(NULL, sessionId, *shareMember, &payload, 1, 0, flags);
}
void MyFirstBusObject::doBroadcast(qcc::String thought)
{
    MsgArg payload("s", thought.c_str());
    uint8_t flags = ALLJOYN_FLAG_SESSIONLESS;
    Signal(NULL, 0, *broadcastMember, &payload, 1, 0, flags);
}
```
These functions are nearly identical, but semantically VERY different. 
The differences exist on who is eligible to receive the "thought".  
The doShare method sends the Signal to just those who are joined together 
in a session. The doBroadcast method sends it to anyone who is interested and listening.

With the creation of the code to interact we now have everything set up 
for the AllJoyn framework side of things. The remaining code in the tutorial 
deals with tracking members who join a session via the `SessionListener` and 
handling the command line input.

The entire source code can be found under the [Hackfest project][hackfest].

[alljoyn-router]: /learn/architecture#alljoyn-router
[hackfest]: https://git.allseenalliance.org/cgit/extras/hackfest.git
