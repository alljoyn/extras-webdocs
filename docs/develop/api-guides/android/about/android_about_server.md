#Android - About Server API Guide

-----
##Reference code

The reference code consists of server and client implementations of the About feature.

### Classes used to send AboutData

| CLASS  | DESCRIPTION |
|---|---|
| AboutService | Class that implements the following interface:   org.alljoyn.About |
| AboutIconService | Class that implements the following interface:   org.alljoyn.Icon |
| PropertyStore | Interface that supplies the list of properties required for Announce signal payload and GetAboutData(). |

-----

## Build an application that uses About Server

Perform the following steps at a high level to build an application that will broadcast
AboutData.

1. Create the base for the AllJoyn&trade; application.
2. Implement PropertyStore to produce an AboutStore. (See *Create a PropertyStore implementation*)
3. Instantiate an AboutStore.
4. Create and register the AboutService, providing it with the AboutStore.
5. Announce the AboutService.

-----

## Setting Up the AllJoyn Framework

See [Setting Up the AllJoyn Framework][android_setting_up_the_alljoyn_framework].

-----

## Implementing an Application that uses About Server

Implementing an About Server requires creating and registering an instance of the
AboutService class.

*Note	Verify the BusAttachment has been created, started and connected before implementing the AboutService. See [Setting Up the AllJoyn Framework][android_setting_up_the_alljoyn_framework] for the code snippets. These code snippets references a variable mBus (the BusAttachment variable name).*

###1.  Declare listener class

Typically, an AcceptSessionJoiner callback in SessionPortListener has a check to allow or disallow access. Since the AboutService requires access to any application using AboutClient, return true when this callback is triggered. Use the SessionJoined handler to set the session timeout to 20 seconds.

```
class MyListener implements SessionPortListener {
    boolean acceptSessionJoiner( short sessionPort, String joiner, SessionOpts opts ) {
        return true;
    }

    void sessionJoined( short sessionPort, int id, String joiner ) {
        mBus.enableConcurrentCallbacks();
        uint32_t timeout = 20;
        Status status = mBus.SetLinkTimeout(id, timeout);
    }
}
```

###2.  Bind session port

*Note	This step is not mandatory if you are only sending an announcement. To allow incoming connections, the formation of a session is needed. The AllJoyn framework must be told that connections are allowed.*

```
final Mutable.ShortValue sPort = new Mutable.ShortValue((short) 0); 
SessionOpts sessionOpts = new SessionOpts();
sessionOpts.traffic = SessionOpts.TRAFFIC_MESSAGES;
sessionOpts.isMultipoint = true;
sessionOpts.proximity = SessionOpts.PROXIMITY_ANY;
sessionOpts.transports = SessionOpts.TRANSPORT_ANY;

Status status = m_bus.bindSessionPort(sPort, sessionOpts,
    new SessionPortListener() {
        @Override
        public boolean acceptSessionJoiner(short sessionPort, String joiner, SessionOpts sessionOpts) {
            if (sessionPort == sPort.value) {
                return true;
            } else {
                return false;
            }
        }
 

        public void sessionJoined(short sessionPort, int id, String joiner){

            Log.i(TAG,
 
            String.format("SessionPortListener.sessionJoined(%d, %d, %s)", sessionPort, id, joiner));
        }
    });
    
String logMessage = String.format("BusAttachment.bindSessionPort(%d, %s): %s", sPort.value, sessionOpts.toString(), status);
Log.d(TAG, logMessage);
```

###3.  Create a PropertyStore implementation

The PropertyStore interface is required by the AboutService to store the provisioned values for the About interface data fields (listed in Table 2). Refer to the *AllJoyn About Feature Interface Specification* document for more information.

*Note	It is recommended that OEMs create a shared provisioning file that includes the DefaultLanguage, DeviceName, and DeviceID fields. This file can be used by developers to manage these fields in the AllJoyn services that make use of them.*

####Table 2: About interface data fields

| Field name | Required | Announced | Signature |
|---|---|---|---|
| AppID | yes | yes | ay |
| DefaultLanguage | yes | yes | s |
| DeviceName | yes | yes | s |
| DeviceId | yes | yes | s |
| AppName | yes | yes | s |
| Manufacturer | yes | yes | s |
| ModelNumber | yes |yes | s |
| SupportedLanguages | yes | no | as |
| Description | yes | no | s |
| DateofManufacture | no | no | s |
| SoftwareVersion | yes | no | s |
| AJSoftwareVersion | yes | no | s |
| HardwareVersion | no | no | s |
| SupportUrl | no | no | s |


####3.1  Sample PropertyStore implementation

An example PropertyStore implementation (AboutStore) is provided below that specifies the following dictionary of metadata fields:

* Keys are the field names
* Values are a Map of String to Object entries, where the String is the language tag associated with the Object value

```
public class AboutStore implements PropertyStore
{
    private Set < String > m_AnnounceKeys = new HashSet < String >();
    private Map < String, Map < String, Object > > m_DataMap = new HashMap < String, Map < String, Object > >();
    public AboutStore(Map < String, Map < String, Object > > defaultMap)
        {
        // Initialize set of Announce keys m_AnnounceKeys.add("AppId"); m_AnnounceKeys.add("DefaultLanguage"); m_AnnounceKeys.add("DeviceName"); m_AnnounceKeys.add("DeviceId"); m_AnnounceKeys.add("AppName"); m_AnnounceKeys.add("Manufacturer"); m_AnnounceKeys.add("ModelNumber");
        
        m_DataMap.putAll(defaultMap);
        }
    @Override
    public void readAll(String languageTag, Filter filter, Map<String, Object> dataMap) throws PropertyStoreException {
        languageTag = checkLanguage(languageTag);
        for (Entry<String, Map<String, Object>> entry : m_DataMap.entrySet()) {
            if (entry.getValue().containsKey(languageTag)) {
                String lang = "";
                if (entry.getValue().containsKey(languageTag)) {
                    lang = languageTag;
                }
                switch (filter)
                {
                case READ:
                    entry.getValue().get(lang));
                    break;
                case ANNOUNCE:
                    if (m_AnnounceKeys.contains(entry.getKey()))
                    {
                        dataMap.put(entry.getKey(),
                        entry.getValue().get(lang));
                    }
                    break;
                }
            }
        }
    }
    
    @Override
    public void reset(String key, String languageTag) throws PropertyStoreException {}

    @Override
    public void resetAll() throws PropertyStoreException {}

    @Override
    public void update(String key, String languageTag, Object newValue) throws PropertyStoreException {}
    
    private String checkLanguage(String languageTag) throws PropertyStoreException
    {
        if (languageTag == null) {
            throw new PropertyStoreException(PropertyStoreException.INVALID_VALUE);
        }
        if (languageTag.isEmpty()) {
            return (String) m_DataMap.get("DefaultLanguage").get("");
        }
        if (((Set<String>)m_DataMap.get("SupportedLanguages").get("")).contains(languageTag)) {
            throw new PropertyStoreException(PropertyStoreException.UNSUPPORTED_LANGUAGE);
        }
        return languageTag;
    }
}
```

###4.  Provision PropertyStore instance with default values

In the application, the PropertyStore instance you created will be loaded with the default values. In the sample implementation above, the AboutStore instance is provided with a default values map.

```
Map<String, Map<String, Object> defaultMap = new HashMap<String, Map<String, Object>>();

// Populate map with fields names and values. 
String fieldname = "FieldName";
String languageTag = "";

Map<String, Object> defaultValue = new HashMap<String, Object>(); defaultValue.put("", "Value");// An empty string means non-language specific field.
defaultMap.put(fieldName, defaultValue);
PropertyStore aboutStore = new AboutStore(defaultMap);
```
 
The following subsections highlight provisioning fields according to their data type.

####4.1  AppId field

The AppId field is an array of bytes. It is a globally unique identifier (GUID) encoded as an array of 16 bytes.

```
UUID uuid = UUID.randomUUID();
Map <String, Object> defaultAppId = new HashMap <String, Object>(); 
defaultAppId.put("", TransportUtil.uuidToByteArray(uuid)); 
defaultMap.put("AppId", defaultAppId);
```

####4.2  SupportedLanguages field

The SupportedLanguages field is a list of text strings. Some fields can have
language-dependent value that must be provided for each of the supported languages.

```
String [] supportedLanguages = { "en", "fr" };
Map <String, Object> defaultSupportedLanguages = new HashMap <String, Object>();
defaultSupportedLanguages.put("", supportedLanguages);
```

####4.3  Non-language specific fields

Non-language-specific fields support a single supplied text string. Below is an example for the ModelNumber field on how to insert into the PropertyStore. The code below can be used with the field name being replaced by other field names listed in Table 3.

```
Map <String, Object> defaultModelNumber = new HashMap <String, Object>(); 
defaultModelNumber.put("", "MN-123");");// An empty string means non-language specific field.
defaultMap.put("ModelNumber", defaultModelNumber);
```

####4.4  Language-dependent fields

Language-dependent fields support a single supplied text string. Below is an example for the Description field on how to insert into the PropertyStore. The code below can be used with the field name being replaced by other field names listed in Table 3.

```
Map <String, Object> defaultDescription = new HashMap <String, Object>(); 
defaultDescription.put("en", "The description in English");
defaultDescription.put("fr", "La description en fran�ais");
defaultMap.put("AppId", defaultDescription);
```

###5. Create the AboutService object

For an application to send AboutData, it requires an instance of the AboutService class. AboutServiceImpl is an implementation wrapper around AllJoyn native calls that handle the interactions between About Server and About Client.

```
AboutService aboutService = AboutServiceImpl.getInstance();
```

###6. Start Server mode

Register the relevant BusObjects and add the relevant interfaces to the Announcements
ObjectDescription.  Then invoke `startAboutServer`.

```
aboutService.startAboutServer(mBus, sPort.value, aboutStore);
```

###7. Add an AboutIconService (optional)

An application that sends AboutData can be extended to broadcast a device. AboutServiceImpl is also an implementation wrapper around AllJoyn native calls that handle the interactions between applications that use the AboutIconClient class.

####7.1  Provision for the Icon content and URL

An Icon is published directly as a byte array or a reference URL, and must be provisioned as follows:

```
byte [] aboutIconContent = { 0x89, 0x50, 0x4E, 0x47, 0x0D /* Add relevant data here */
};
String mimeType("image/png"); /* This should correspond to the content */ 
String url("http://myurl"); /* An alternate access to the Icon */
```

####7.2  Register icon

Register the relevant BusObjects and add the relevant interfaces to the Announcements
ObjectDescription.  Then register the icon.

```
aboutService.registerIcon(mimeType, url, aboutIconContent);
```

###8. Advertise to allow connections

```
mBus.advertiseName(mBus.getUniqueName());
```

###9. Send the Announcement

```
aboutService.announce();
```

###10. Releasing resources

When your process is done with the AboutService and no longer wishes to send announcements, unregister the process from the AllJoyn bus.

```
if (null != aboutService) {
    aboutService.unregisterIcon(); 
    aboutService.stopServer();
}
if( null != mBus) {
    mBus.disconnect();
    mBus.release();
    mBus = null;
}
```

[android_setting_up_the_alljoyn_framework]: /develop/api-guides/android/about/android_setting_up_the_alljoyn_framework
