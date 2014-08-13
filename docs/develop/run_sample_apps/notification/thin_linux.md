# Running Notification Sample - Thin Linux

## Prerequisites
* Follow steps in "Building - Thin Linux" section (so samples have been built).
* Follow steps in "Building - Linux" section (so that the AllJoyn&trade; router has been built). AllJoyn thin apps need an AllJoyn router to connect to in order to function properly.

## Run Notification Producer and Consumer
1. Create a text file called config.xml that contains the following:
  ```xml
  <!DOCTYPE busconfig PUBLIC "-//freedesktop//DTD D-Bus Bus Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
  <!--

        Copyright (c) 2013-2014, AllSeen Alliance. All rights reserved.

           Permission to use, copy, modify, and/or distribute this software for any
           purpose with or without fee is hereby granted, provided that the above
           copyright notice and this permission notice appear in all copies.

           THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
           WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
           MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
           ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
           WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
           ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
           OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  -->

  <busconfig>

      <!--  Our well-known bus type, do not change this  -->
      <type>alljoyn</type>
  
      <user>dbus</user>
      <property name="router_advertisement_prefix">org.alljoyn.BusNode</property>

      <!-- Only listen on a local socket. (abstract=/path/to/socket
         means use abstract namespace, don't really create filesystem
         file; only Linux supports this. Use path=/whatever on other
         systems.)  -->
      <listen>unix:abstract=alljoyn</listen>
      <listen>tcp:r4addr=0.0.0.0,r4port=0</listen>

      <limit name="auth_timeout">5000</limit>
      <limit name="max_incomplete_connections">100</limit>
      <limit name="max_completed_connections">100</limit>
      <limit name="max_untrusted_clients">100</limit>
      <flag name="restrict_untrusted_clients">false</flag>

      <ip_name_service>
          <property interfaces="*"/>
          <property disable_directed_broadcast="false"/>
          <property enable_ipv4="true"/>
          <property enable_ipv6="true"/>
      </ip_name_service>

      <!--  Allow everything, D-Bus socket is protected by unix filesystem
         permissions -->
      <policy context="default">
          <allow send_interface="*"/>
          <allow receive_interface="*"/>
          <allow own="*"/>
          <allow user="*"/>
          <allow send_requested_reply="true"/>
          <allow receive_requested_reply="true"/>
      </policy>

  </busconfig>
  ```
2. Launch the AllJoyn daemon using the config file to allow thin apps to connect.
  ```sh
  # <TARGET CPU> can be either x86_64, x86, or whatever value you set for CPU= when running SCons.
  export TARGET_CPU=<TARGET CPU>
  cd $AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/release/dist/cpp/bin
   
     
   export LD_LIBRARY_PATH=`pwd`/../lib:$LD_LIBRARY_PATH
   # This sets the library path to load the liballjoyn.so shared library.
    
   ./alljoyn-daemon --config-file=$HOME/config.xml &
   # Provide the correct path to the config.xml you created
   ```
3. Launch NotificationConsumerSample (in a new terminal).
  ```sh
  cd $AJ_ROOT/services/sample_apps/build/
  ./NotificationConsumerSample
  ```

4. Launch NotificationProducerSample (in a new terminal).
  ```sh
  cd $AJ_ROOT/services/sample_apps/build/
  ./NotificationProducerSample
  ``` 

The output from NotificationProducerSample should look like this:
```
./NotificationProducerSample 
000.000 PropertyStore.c:201 Set key [DeviceId] defaultValue [e7471a6ad4761b17ad169a3146fe6d1a]
000.000 PropertyStore.c:148 Has key [DeviceName] default Value []
000.000 PropertyStore.c:201 Set key [DeviceName] defaultValue [COMPANY GENERIC BOARD 6fe6d1a]
000.000 PropertyStore.c:144 Has key [DeviceName] runtime Value [COMPANY GENERIC BOARD 6fe6d1a]
Attempting to connect to bus 'org.alljoyn.BusNode'
Connected to Routing Node with BusUniqueName=:yEmGBABV.3
001.084 NotificationProducer.c:512 In SendNotification
001.084 PropertyStore.c:144 Has key [DeviceId] runtime Value [e7471a6ad4761b17ad169a3146fe6d1a]
001.084 PropertyStore.c:148 Has key [DefaultLanguage] default Value [en]
001.084 PropertyStore.c:144 Has key [DeviceName] runtime Value [COMPANY GENERIC BOARD 6fe6d1a]
001.084 PropertyStore.c:144 Has key [AppId] runtime Value [e7471a6ad4761b17ad169a3146fe6d1a]
001.084 PropertyStore.c:148 Has key [AppName] default Value [Notifier]
001.084 NotificationProducer.c:560 Generating random number for notification id
001.084 NotificationProducer.c:481 In SendNotifySignal
001.084 NotificationProducer.c:493 ***************** Notification id 860073951 delivered successfully with serial number 5 *****************
AllJoyn disconnect
```

The output from NotificationConsumerSample should look like this:
```
./NotificationConsumerSample 
Attempting to connect to bus 'org.alljoyn.BusNode'
Connected to Routing Node with BusUniqueName=:yEmGBABV.2
000.000 NotificationConsumer.c:167 In SetSignalRules()
000.000 NotificationConsumer.c:168 Adding Dismisser interface match.
000.000 NotificationConsumer.c:176 Adding Notification interface match.
000.000 NotificationConsumer.c:208 Adding Superagent interface match.
000.099 aj_msg.c:1087 Discarding bad message AJ_ERR_NO_MATCH
000.136 aj_msg.c:1087 Discarding bad message AJ_ERR_NO_MATCH
000.136 aj_msg.c:1087 Discarding bad message AJ_ERR_NO_MATCH
024.480 NotificationConsumer.c:749 Received Producer signal.
024.480 NotificationConsumer.c:287 Received notification signal from sender :yEmGBABV.3
024.480 aj_msg.c:1195 AJ_UnmarshalMsg(): AJ_ERR_NO_MORE
024.480 aj_msg.c:1195 AJ_UnmarshalMsg(): AJ_ERR_NO_MORE
024.480 aj_msg.c:1195 AJ_UnmarshalMsg(): AJ_ERR_NO_MORE
024.480 aj_msg.c:1195 AJ_UnmarshalMsg(): AJ_ERR_NO_MORE
******************** Begin New Message Received ********************
Message Id: 860073951
Version: 2
Device Id: e7471a6ad4761b17ad169a3146fe6d1a
Device Name: COMPANY GENERIC BOARD 6fe6d1a
App Id: BC096200000000001F01000003000000
App Name: Notifier
Message Type: 2
OriginalSender bus unique name: :yEmGBABV.3
Language: en  Message: Hello AJ World.
Language: de-AT  Message: Hallo AJ Welt.
Other parameters included:
Custom Attribute Key: On  Custom Attribute Value: Hello
Custom Attribute Key: Off  Custom Attribute Value: Goodbye
Rich Content Icon Url: http://www.getIcon1.org
******************** Begin Rich Audio Content ********************
Language: en  Audio URL http://www.getAudio1.org
Language: de-AT  Audio URL http://www.getAudio2.org
******************** End Rich Audio Content ********************
Rich Content Icon Object Path: /icon/MyDevice
Rich Content Audio Object Path: /audio/MyDevice
******************** End New Message Received ********************
036.490 aj_guid.c:76 LookupName(): NULL
036.491 aj_guid.c:76 LookupName(): NULL
```
