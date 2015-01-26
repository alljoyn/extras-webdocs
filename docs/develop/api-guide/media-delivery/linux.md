# Media Delivery Framework Content Service API Guide - Linux

### Reference code

The reference code consists of an application that implements a 
Content server and client.

#### Source code

| Pacakage | Description |
|---|---|
| AllJoyn | The Standard Client AllJoyn&trade; code. |
| AboutService | About feature code. |
| ContentService | Media Delivery Framework Content service code. |
| Services Common | Code that is common to the AllJoyn service frameworks. |
| Sample Apps | Code that is common to the AllJoyn service framework sample applications. |

#### Reference C++ application code

| Application | Description |
|---|---|
| ContentService | An example server application. |
| ContentServiceClient | An example client application. |

### Obtain the Media Delivery Framework Content service

See the [Building Linux][building-linux] section for instructions 
on compiling the Time service framework.

### Build a Media Delivery Framework Content service server

The following steps provide the high-level process to build a
Media Delivery Framework Content server.

1. Create the base for the AllJoyn application. 
2. Implement the ProperyStore and use this with the AboutService 
in server mode. See the [About API Guide - Linux][about-api-guide-linux] 
section for instructions.
3. Implement the security authentication mechanism if required (not part of the sample code).
4. Implement the content objects logic.
5. Create the content objects.
6. Announce.


### Build a Media Delivery Framework Content service client

The following steps provide the high-level process to build a 
Media Delivery Framework Content client.

1. Create the base for the AllJoyn application.
2. Implement the security authentication mechanism (not part 
of the sample code).
3. Create a class that implements each of the content objects.
4. When an announcement with a Media Delivery Framework Content 
interface is received, the client may choose to initialize a 
Content service client object to use it.
5. Use the content objects as required by the application business logic.

### Setting up the AllJoyn framework and About feature

The steps required for this service framework are universal 
to all applications that use the AllJoyn framework and for 
any application using one or more AllJoyn service frameworks.  
Prior to use of the Media Delivery Framework Content service 
as a Server or a Client, the About feature must be implemented 
and the AllJoyn framework set up.  

Complete the procedures in the following sections to guide 
you in this process:
* [Building Linux][building-linux] 
* [About API Guide - Linux][about-api-guide-linux]

## Implementing a Media Delivery Framework Content Server

### Initialize the AllJoyn framework

See the [Building Linux][building-linux] section for instructions 
to set up the AllJoyn framework.

#### Create the bus attachment and add authentication

```
m_BusAttachment = new BusAttachment();
m_BusAttachment->Start();
m_BusAttachment->Connect();
```

To enable the security (not part of the sample):

```
bus->EnablePeerSecurity("ALLJOYN_PIN_KEYX ALLJOYN_SRP_KEYX ALLJOYN_ECDHE_PSK", 
authListener);
```

### Start the AboutService in server mode

The Content Service Server depends on the About feature.

For more information about the About feature, see 
the [About API Guide - Linux][about-api-guide-linux] section.

#### Implement the PropertyStore

```
propertyStore = new AboutPropertyStoreImpl();;
propertyStore->setDeviceId(deviceId);
propertyStore->setDeviceName(deviceName);
propertyStore->setAppId(appIdHex);
propertyStore->setAppName(appName);
std::vector<qcc::String> languages(3);
languages[0] = "en";
languages[1] = "sp";
languages[2] = "fr";
propertyStore->setSupportedLangs(languages);
propertyStore->setDefaultLang(defaultLanguage);
```

#### Instantiate the BusListener and initialize the About feature

```
busListener = new CommonBusListener();
AboutServiceApi::Init(*m_BusAttachment, *propertyStore);
AboutServiceApi* aboutService = AboutServiceApi::getInstance();
busListener->setSessionPort(port);
m_BusAttachment ->RegisterBusListener(*busListener);
TransportMask transportMask = TRANSPORT_ANY;
SessionPort sp = port;
SessionOpts opts(SessionOpts::TRAFFIC_MESSAGES, false, 
SessionOpts::PROXIMITY_ANY, transportMask);
m_BusAttachment ->BindSessionPort(sp, opts, *busListener);
aboutService->Register(port);
m_BusAttachment->RegisterBusObject(*aboutService);
```

### Implement the Content objects

```
m_MdfContentSource = new SampleContentSource();
m_ContentServerBusObject = new ContentServerBusObject(s_CONTENT_OBJECT_PATH,
         m_MdfContentSource);
m_ContentServerBusObject->CreateInterface(*m_BusAttachment);
```

### Create Content objects

#### Create a Content Source

The Content source is responsible for providing the content 
information. Inherit from MdfContentSource and implement the 
business logic for the MdfContentSource interface.

```
String directoryStructure = "{a,v,i,{a,{a,v}}}";
m_ContentManager = new ContentManager(directoryStructure);
```

#### Create a Content Service Interface

```
busAttachment.CreateInterfacesFromXml(s_CONTENT_SOURCE_IF_XML.c_str());
```

#### Register the server handlers

```
const InterfaceDescription* contentSourceInterface =
         busAttachment.GetInterface(s_CONTENT_INTERFACE.c_str());

AddInterface(*contentSourceInterface);

const MethodEntry methodEntries[] =
   {
      { contentSourceInterface->GetMember(s_METHOD_BROWSE.c_str()),
         static_cast<MessageReceiver::MethodHandler>
         (&ContentServerBusObject::Browse), },
      { contentSourceInterface->GetMember(s_METHOD_GETITEM.c_str()),

static_cast<MessageReceiver::MethodHandler>(&ContentServerBusObject::GetItem), },
      { contentSourceInterface->GetMember(s_METHOD_GETSORTABLEFIELDS.c_str()),
         
   };

AddMethodHandlers(methodEntries, sizeof(methodEntries) / 
         sizeof(methodEntries[0]));
```

### Announce

In order for the created objects to be seen by their clients, 
call `Announce`:

```
AboutServiceApi* aboutService = AboutServiceApi::getInstance();
aboutService->Announce();
```

The server is now running and accepting requests. The requests 
to the content objects are translated by the service layer to 
calls to your implementation of the objects.

### Shut down

When the server goes down, you must deallocate all of the memory.

```
server->shutdown();
```

## Implementing a Media Delivery Framework Content Service Client

### Initialize the AllJoyn framework

See the [Building Linux][building-linux] section for instructions 
to set up the AllJoyn framework.

#### Create the bus attachment and add authentication

Start the bus connection.

```
m_BusAttachment ->Start();
m_BusAttachment ->Connect();
```

To enable the security (not part of the sample):

```
bus->EnablePeerSecurity("ALLJOYN_PIN_KEYX ALLJOYN_SRP_KEYX ALLJOYN_ECDHE_PSK", 
authListener);
```

### Start listening to Announcements

The client needs to listen for server announcements. If an 
announcement from a device with the correct interface is 
received, the client can start a session with that client.

#### Register an Announcement listener

```
m_ContentSessionListenerClient = new ContentSessionListenerClient();
m_ContentBusListenerClient = new ContentBusListenerClient(m_BusAttachment,
         m_ContentSessionListenerClient, m_ClientSessionPort,
         m_ClientSessionId);
m_BusAttachment->RegisterBusListener(*m_ContentBusListenerClient);

const char* interfaces[1] = { s_ABOUT_INTERFACE.c_str() };

AnnouncementRegistrar::RegisterAnnounceHandler(*m_BusAttachment, *this,
            interfaces, 1);

### Implement the Announce handler

This is called when a Content server announces its presence. 
The service is added to a list of known Content services.

```
ContentSourceClient* contentSourceClient = new ContentSourceClient(
            m_BusAttachment, busName, 0, sessionPort);

m_ContentSourceClientList.push_back(contentSourceClient);
```

### Join the session

After receiving the announcement, the client can choose to 
join a session with the Content server.

```
m_BusAttachment->JoinSession(m_BusName.c_str(), m_SessionPort, 
GetSessionListener(), m_SessionId, *m_SessionOpts);
```

### Send messages to the client

Use an instance of the `ContentProxyBusObject` class to send 
a message to the server and receive the reply. The proxy 
object creates the AllJoyn request and interprets the reply.

```   
SortableFieldsList* sortableFields = new SortableFieldsList;
Message reply(*m_BusAttachment);
m_ProxyBusObject->MethodCall( s_CONTENT_INTERFACE.c_str(),
         s_METHOD_GETSORTABLEFIELDS.c_str(), NULL, 0, reply, 5000);
```

### End the session with the server

```
contentClient->leaveSession();
delete contentClient;
```

[building-linux]: /developers/develop/building/linux
[about-api-guide-linux]: /developers/develop/api-guide/about/linux

