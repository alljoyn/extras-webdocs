# Android - Setting Up the AllJoyn&trade; Framework

## Setting Up the AllJoyn Framework

Every AllJoyn application requires a base set to be in place before implementing specific features that include creating a BusAttachment and connecting to the AllJoyn framework.

For more information about BusAttachment, refer to the *AllJoyn Framework Tutorial*
document. 

###1.  Set up AllJoyn variables
```
static { System.loadLibrary("alljoyn_java"); }  
private BusAttachment mBus;
```

###2.  Prepare the AllJoyn framework
```
DaemonInit.PrepareDaemon(this); // where $(Ath(Bis is an android.content.Context class
```

###3.  Create a BusAttachment instance
```
mBus = new BusAttachment("AboutApplication", BusAttachment.RemoteMessage.Receive);
```

###4.  Create password for the bundled router

*Note:	Thin libraries at AllSeen Alliance version 14.06 or higher do not require this step.*

To allow thin libraries to connect to the Android bundled router, the router requires a password.
```
Status status = PasswordManager.setCredentials(ALLJOYN_PIN_KEYX, DAEMON_PWD);
if (Status.OK != status) {
Log.e(TAG, "Failed to set password for daemon, Error: " + status);
}
```

###5.  Start and connect the BusAttachment

Once created, the BusAttachment must be connected to the AllJoyn framework.

```
Status status = mBus.connect();
if (Status.OK != status) {
    Log.e(TAG, "Failed connect to bus, Error: '" + status + "'");;
}
```

###6.  Advertise the daemon

The application should advertise the daemon so that the thin client can find it and connect to it.

```
int flag = BusAttachment.ALLJOYN_REQUESTNAME_FLAG_DO_NOT_QUEUE;
String daemonName = ?org.alljoyn.BusNode_? + mBus.getGlobalGUIDString(); Status status = mBus.requestName(daemonName, flag);
if (Status.OK == status) {
    status = mBus.advertiseName(?quiet@? +, SessionOpts.TRANSPORT_ANY);
    if (Status.OK != status) {
        mBus.releaseName(daemonName);
    }
}
```
