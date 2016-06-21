# Notification

***

### Notification Types (NT)

**Emergency-**Emits a notification with an emergency type

**Warning-**Emits a notification with a warning type

**Info-**Emits a notification with an info type



### AJ.notification

**AJ.notification(NT type)-**Construct a new notifcation with the given type

```javascript

var notif = AJ.notification(AJ.notification.Emergency);

```

Note: Must contain a .text command before emitting.



**AJ.notification(NT type, String text)-**Construct a new notification with the given type and will emit the given text.

text: the text that will be emitted in the notification

```javascript

var notif2 = AJ.notification(AJ.notification.Warning, "Hello World");

```

**.text-**Return/Set the given text that the notification will emit

```javascript

notif.text = {"EN":"Hello World",

	      "SP":"Hola Mundo"

};

print(notif.text); //[object Object]

print(Object.keys(notif.text)); //EN, SP

```

Note: If provide more than one text for a single language, then notification will only emit the last instance.

Note: If provide text in the constructor and do a .text with the same language, then notification will emit the String from .text.



**.type-**Return the type of notification emitted with 0=Emergency, 1=Warning, and 2=Info

```javascript

print(notif.type); //0

```


**.send(int ttl)-**Send the notification with a time to live property

ttl: the time to live or hop limit for the notification in seconds. Maximum value of 43200 seconds and minimum value of 30 seconds

```javascript

notif.send(1000);

```

**.cancel()-**Cancel the notification that was emitted

```javascript

notif.cancel();

```

### Notification Attributes

**audioUrls-**Return/Attach an Url to an audio recording to be played when the notification is sent

```javascript

notif.audioUrls = {"EN":"http://.../.../...", "SP": "http://..."};

print(notif.audioUrls); //[object Object]

print(Object,keys(notif.audioUrls)); //EN, SP

```

**audioPath-**Return/Attach a file path to an audio recording to be played when the notification is sent

```javascript

notif.audioPath = "/path/to/audio/file";

print(notif.audioPath); // /path/to/audio/file

```

**iconUrl-**Return/Attach an Url to an icon to be displayed when the notification is sent

```javascript

notif.iconUrl = "http://url/to/icon";

print(notif.iconUrl); //http://url/to/icon

```

**iconPath-**Return/Attach a file path to an icon to be displayed when the notification is sent

```javascript

notif.iconPath = "/file/path/to/icon";

print(notif.iconUrl); // /file/path/to/icon
```

**controlPanelPath-**Return/Attach a path to the control panel

```javascript

notif.controlPanelPath = "/path/to/control/panel";

print(notif.controlPanelPath); // /path/to/control/panel

```

Note: Best to use .path from a control panel widget versus hardcoding the actual control panel path


**attributes-**Return/Attach custom attributes to the notification that are not displayed on the notification itself

```javascript

notif.attributes = {"IP Address":"192.168.240.124",

		    "Name":"Personal Device",

		    "Model Number":"XP239-VPN"

};

print(notif.attributes); //[object Object]

print(Object.keys(notif.attributes)); //IP Address, Name, Model Number

```

Note: (Name of attribute):(Value of attribute)
