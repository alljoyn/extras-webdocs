# Linux - Running Control Panel Sample Apps

## Running ControlPanelSample, ControlPanelController Sample Apps

### Prerequisites

Open two terminal windows. In each, navigate to the AllJoyn&trade; root dir, then:

```sh
export AJ_ROOT=`pwd`

# Set $TARGET CPU to the "CPU=" value used when running scons, e.g. x86_64, x86.
export TARGET_CPU=x86

export LD_LIBRARY_PATH=$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/cpp/lib:$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/about/lib:$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/lib:$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/notification/lib:$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/services_common/lib:$LD_LIBRARY_PATH
```
  
### Run the Control Panel Sample App

In one of the terminal windows, run `ControlPanelSample` (Controllee):

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/bin/ControlPanelSample
```

### Run the Control Panel Controller Sample App

In the other terminal window, run `ControlPanelController` (Controller):

```sh
$AJ_ROOT/core/alljoyn/build/linux/$TARGET_CPU/debug/dist/controlpanel/bin/ControlPanelController
```

The output from ControlPanelSample should look similar to this:

```sh
   0.492 DEBUG    ControlPanel external         ...c/Widgets/Container.cc:176 | Adding childWidget named: CurrentTemp
   0.492 DEBUG    ControlPanel external         ...c/Widgets/Container.cc:176 | Adding childWidget named: heatProperty
   0.492 DEBUG    ControlPanel external         ...c/Widgets/Container.cc:176 | Adding childWidget named: ovenAction
   0.492 DEBUG    ControlPanel external         ...c/Widgets/Container.cc:176 | Adding childWidget named: lightAction
   0.492 DEBUG    ControlPanel external         ...ets/ActionWithDialog.cc:69 | Adding childDialog named: LightConfirm
   0.492 DEBUG    ControlPanel external         .../ControlPanelService.cc:78 | Initializing Controllee
   0.492 DEBUG    ControlPanel external         ...ontrolPanelBusObject.cc:59 | Created ControlPanelBusObject successfully
   0.493 DEBUG    ControlPanel external         ...s/ContainerBusObject.cc:67 | Created ContainerBusObject successfully
   0.493 DEBUG    ControlPanel external         ...s/ContainerBusObject.cc:67 | Created ContainerBusObject successfully
   0.493 DEBUG    ControlPanel external         ...s/ContainerBusObject.cc:67 | Created ContainerBusObject successfully
   0.494 DEBUG    ControlPanel external         ...jects/LabelBusObject.cc:66 | Created LabelBusObject successfully
   0.495 DEBUG    ControlPanel external         ...jects/LabelBusObject.cc:66 | Created LabelBusObject successfully
   0.495 DEBUG    ControlPanel external         ...jects/LabelBusObject.cc:66 | Created LabelBusObject successfully
   0.496 DEBUG    ControlPanel external         ...ts/PropertyBusObject.cc:70 | Created PropertyBusObject successfully
   0.496 DEBUG    ControlPanel external         ...ts/PropertyBusObject.cc:70 | Created PropertyBusObject successfully
   0.496 DEBUG    ControlPanel external         ...ts/PropertyBusObject.cc:70 | Created PropertyBusObject successfully
   0.496 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.497 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.497 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.497 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.497 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.498 DEBUG    ControlPanel external         ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.498 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.498 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.498 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.499 DEBUG    ControlPanel external         ...ationActionBusObject.cc:71 | Created NotificationActionBusObject successfully
   0.499 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.499 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.499 DEBUG    ControlPanel external         ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.500 DEBUG    ControlPanel external         ...ControlPanelService.cc:136 | Initialized Controllee successfully
Sent announce, waiting for Contollers
   3.421 DEBUG    ControlPanel lepDisp1_1       ...trolPanelBusListener.cc:52 | Accepting JoinSessionRequest
   3.424 DEBUG    ControlPanel lepDisp1_2       ...ntrolPanelBusObject.cc:135 | Get property was called - in ControlPanelBusObject class.
   3.428 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.429 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.429 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.429 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.434 TRACE    ControlPanel lepDisp1_1       ...jects/LabelBusObject.cc:74 | Get property was called - in LabelBusObject class.
   3.434 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.435 TRACE    ControlPanel lepDisp1_0       ...jects/LabelBusObject.cc:74 | Get property was called - in LabelBusObject class.
   3.435 TRACE    ControlPanel lepDisp1_0       ...jects/LabelBusObject.cc:74 | Get property was called - in LabelBusObject class.
   3.435 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.435 TRACE    ControlPanel lepDisp1_0       ...jects/LabelBusObject.cc:74 | Get property was called - in LabelBusObject class.
   3.435 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.435 TRACE    ControlPanel lepDisp1_0       ...jects/LabelBusObject.cc:74 | Get property was called - in LabelBusObject class.
   3.435 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.436 TRACE    ControlPanel lepDisp1_1       ...s/PropertyBusObject.cc:103 | Get property was called - in PropertyBusObject class.
   3.436 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.436 TRACE    ControlPanel lepDisp1_0       ...s/PropertyBusObject.cc:103 | Get property was called - in PropertyBusObject class.
   3.436 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.436 TRACE    ControlPanel lepDisp1_0       ...s/PropertyBusObject.cc:103 | Get property was called - in PropertyBusObject class.
   3.436 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.436 TRACE    ControlPanel lepDisp1_0       ...s/PropertyBusObject.cc:103 | Get property was called - in PropertyBusObject class.
   3.436 TRACE    ControlPanel lepDisp1_0       ...s/PropertyBusObject.cc:103 | Get property was called - in PropertyBusObject class.
   3.436 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.437 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.438 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.438 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.438 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.438 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.439 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.439 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.439 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.446 TRACE    ControlPanel lepDisp1_1       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.446 TRACE    ControlPanel lepDisp1_1       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.446 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.446 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.446 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.446 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.447 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.447 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.447 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:106 | Get property was called - in DialogBusObject class.
   3.447 TRACE    ControlPanel lepDisp1_0       ...cts/WidgetBusObject.cc:100 | Get property was called - in WidgetBusObject class:
   3.448 DEBUG    ControlPanel lepDisp1_1       ...ects/ActionBusObject.cc:90 | Execute was called
Starting the Oven. Execute was called
   3.448 DEBUG    ControlPanel lepDisp1_1       ...ects/ActionBusObject.cc:95 | Execute completed successfully
   3.448 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:121 | Execute was called
Execute Action1 was called
   3.448 DEBUG    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:127 | Execute Action 1 completed successfully
   3.449 TRACE    ControlPanel lepDisp1_1       ...cts/DialogBusObject.cc:121 | Execute was called
Execute Action2 was called
   3.449 DEBUG    ControlPanel lepDisp1_1       ...cts/DialogBusObject.cc:132 | Execute Action 2 completed successfully
   3.449 TRACE    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:121 | Execute was called
Execute Action3 was called
   3.449 DEBUG    ControlPanel lepDisp1_0       ...cts/DialogBusObject.cc:137 | Execute Action 3 completed successfully
   3.450 TRACE    ControlPanel lepDisp1_1       ...s/PropertyBusObject.cc:115 | Set property was called - in PropertyBusObject class.
   3.450 DEBUG    ControlPanel lepDisp1_1       ...rc/Widgets/Property.cc:532 | Set property succeeded - sending ValueChanged signal.
```

The output from ControlPanelController is quite verbose and should look similar to this (all of the output is not shown here):

```sh
Beginning ControlPanel Application. (Press CTRL+C to end application)
   0.263 TRACE    ControlPanel external         ...ControlPanelService.cc:182 | Initializing Controller
   0.263 DEBUG    ControlPanel external         ...ControlPanelService.cc:228 | Initialized Controller successfully
WhoImplements called.
Finished setup. Waiting for Contollees
*********************************************************************************
Announce signal discovered
	From bus :-SqKB563.2
	About version 1
	SessionPort 900
	ObjectDescription
<array type_sig="(oas)">
  <struct>
    <object_path>/ControlPanel/MyDevice/rootContainer</object_path>
    <array type_sig="s">
      <string>org.alljoyn.ControlPanel.ControlPanel</string>
    </array>
  </struct>
  <struct>
    <object_path>/About</object_path>
    <array type_sig="s">
      <string>org.alljoyn.About</string>
    </array>
  </struct>
</array>
	AboutData:
<array type_sig="{sv}">
  <dict_entry>
    <string>AppId</string>
    <variant signature="ay">
      <array type="byte">
        110 106 96 244 36 229 67 105 189 72 95 81 186 38 240 54
      </array>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>AppName</string>
    <variant signature="s">
      <string>testappName</string>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>DefaultLanguage</string>
    <variant signature="s">
      <string>en</string>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>DeviceId</string>
    <variant signature="s">
      <string>462A30C3455341B585503C9FAC7BB9D6</string>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>DeviceName</string>
    <variant signature="s">
      <string>testDeviceName</string>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>Manufacturer</string>
    <variant signature="s">
      <string>Company</string>
    </variant>
  </dict_entry>
  <dict_entry>
    <string>ModelNumber</string>
    <variant signature="s">
      <string>Wxfy388i</string>
    </variant>
  </dict_entry>
</array>
*********************************************************************************
AnnounceHandlerImpl::Announced()
Calling AnnounceHandler Callback
Got announceHandlerCallback
   0.277 TRACE    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:41 | ControlPanelController::createControllableDevice
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:61 | numPaths=2
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:64 | paths[0]=/About
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:64 | paths[1]=/ControlPanel/MyDevice/rootContainer
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:74 | numInterfaces=1
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:77 | interfaces[0]=org.alljoyn.ControlPanel.ControlPanel
   0.277 DEBUG    ControlPanel lepDisp1_1       .../ControlPanelDevice.cc:189 | ObjectPath contains ControlPanel
   0.277 DEBUG    ControlPanel lepDisp1_1       .../ControlPanelDevice.cc:256 | Creating new unit MyDevice
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:81 | Adding ControlPanelUnit for objectPath: /ControlPanel/MyDevice/rootContainer
   0.277 DEBUG    ControlPanel lepDisp1_1       ...ntrolPanelController.cc:91 | Calling startSession for device :-SqKB563.2
   0.281 DEBUG    ControlPanel lepDisp1_0       ...lPanelSessionHandler.cc:70 | Joining session succeeded. SessionId: 2960640656
   0.281 DEBUG    ControlPanel lepDisp1_0       ...ontrolPanelBusObject.cc:59 | Created ControlPanelBusObject successfully
   0.283 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:227 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.alljoyn.ControlPanel.Container
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.allseen.Introspectable
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Peer
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Properties
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.284 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:227 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/de_AT
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.alljoyn.ControlPanel.Container
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.allseen.Introspectable
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Peer
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Properties
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.285 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:227 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/zh_Hans_CN
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.alljoyn.ControlPanel.Container
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.allseen.Introspectable
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Peer
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:245 | InterfaceName is : org.freedesktop.DBus.Properties
   0.286 DEBUG    ControlPanel lepDisp1_0       ...ntrolPanelBusObject.cc:253 | Ignoring interface - not a container interface
Session has been established with device: :-SqKB563.2
Now parsing unit: MyDevice
Now parsing panelName: rootContainer
Now parsing language: en
   0.286 DEBUG    ControlPanel lepDisp1_0       ...s/ContainerBusObject.cc:67 | Created ContainerBusObject successfully
   0.288 DEBUG    ControlPanel lepDisp1_0       ...s/ContainerBusObject.cc:98 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en/CurrentTemp
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.alljoyn.ControlPanel.LabelProperty
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.allseen.Introspectable
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.allseen.Introspectable
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Introspectable
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Peer
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Peer
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Properties
   0.289 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Properties
   0.289 DEBUG    ControlPanel lepDisp1_0       ...s/ContainerBusObject.cc:98 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en/heatProperty
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.alljoyn.ControlPanel.Property
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.allseen.Introspectable
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.allseen.Introspectable
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Introspectable
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Peer
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Peer
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Properties
   0.290 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Properties
   0.290 DEBUG    ControlPanel lepDisp1_0       ...s/ContainerBusObject.cc:98 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en/ovenAction
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.alljoyn.ControlPanel.Action
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.allseen.Introspectable
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.allseen.Introspectable
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Introspectable
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Peer
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Peer
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Properties
   0.291 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Properties
   0.291 DEBUG    ControlPanel lepDisp1_0       ...s/ContainerBusObject.cc:98 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en/lightAction
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.alljoyn.ControlPanel.Action
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.allseen.Introspectable
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.allseen.Introspectable
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Introspectable
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Introspectable
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Peer
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Peer
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:116 | InterfaceName is : org.freedesktop.DBus.Properties
   0.292 DEBUG    ControlPanel lepDisp1_0       .../ContainerBusObject.cc:149 | Ignoring interfaceName: org.freedesktop.DBus.Properties
   0.292 DEBUG    ControlPanel lepDisp1_0       ...jects/LabelBusObject.cc:66 | Created LabelBusObject successfully
   0.293 DEBUG    ControlPanel lepDisp1_0       ...c/Widgets/Container.cc:176 | Adding childWidget named: CurrentTemp
   0.293 DEBUG    ControlPanel lepDisp1_0       ...ts/PropertyBusObject.cc:70 | Created PropertyBusObject successfully
   0.295 DEBUG    ControlPanel lepDisp1_0       ...c/Widgets/Container.cc:176 | Adding childWidget named: heatProperty
   0.295 DEBUG    ControlPanel lepDisp1_0       ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.296 DEBUG    ControlPanel lepDisp1_0       ...c/Widgets/Container.cc:176 | Adding childWidget named: ovenAction
   0.296 DEBUG    ControlPanel lepDisp1_0       ...ects/ActionBusObject.cc:78 | Created ActionBusObject successfully
   0.299 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:152 | ObjectPath is: /ControlPanel/MyDevice/rootContainer/en/lightAction/LightConfirm
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:170 | InterfaceName is org.alljoyn.ControlPanel.Dialog
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:170 | InterfaceName is org.allseen.Introspectable
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:178 | Ignoring interfaceName:  org.allseen.Introspectable
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:170 | InterfaceName is org.freedesktop.DBus.Introspectable
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:178 | Ignoring interfaceName:  org.freedesktop.DBus.Introspectable
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:170 | InterfaceName is org.freedesktop.DBus.Peer
   0.300 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:178 | Ignoring interfaceName:  org.freedesktop.DBus.Peer
   0.302 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:170 | InterfaceName is org.freedesktop.DBus.Properties
   0.302 DEBUG    ControlPanel lepDisp1_0       ...cts/ActionBusObject.cc:178 | Ignoring interfaceName:  org.freedesktop.DBus.Properties
   0.302 DEBUG    ControlPanel lepDisp1_0       ...ets/ActionWithDialog.cc:69 | Adding childDialog named: LightConfirm
   0.302 DEBUG    ControlPanel lepDisp1_0       ...ects/DialogBusObject.cc:97 | Created DialogBusObject successfully
   0.304 DEBUG    ControlPanel lepDisp1_0       ...c/Widgets/Container.cc:176 | Adding childWidget named: lightAction
Finished loading widget: rootContainer
Container name: rootContainer
Container version: 1
Container is not secured
Container is enabled
Container label: My Label of my container
Container bgColor: 512
Container hints: VERTICAL_LINEAR, HORIZONTAL_LINEAR
Print ChildWidgets:
  Label name: CurrentTemp
  Label version: 1
  Label is not secured
  Label is enabled
  Label label: Current Temperature:
  Label bgColor: 624485
  Label hints: TEXTLABEL

  Property name: heatProperty
  Property version: 1
  Property is not secured
  Property is enabled
  Property label: Oven Temperature
  Property bgColor: 1280
  Property hints: SPINNER
  Property is a UINT16 Property.
  Property Value: 0
  Property is writable
  Property unitOfMeasure: Degrees
  Property has ConstraintList:
    ConstraintList 0 Display: Regular
    ConstraintList 0 Value: 175
    ConstraintList 1 Display: Hot
    ConstraintList 1 Value: 200
    ConstraintList 2 Display: Very Hot
    ConstraintList 2 Value: 225

  Action name: ovenAction
  Action version: 1
  Action is not secured
  Action is enabled
  Action label: Start Oven
  Action bgColor: 1024
  Action hints: ACTIONBUTTON

  Action name: lightAction
  Action version: 1
  Action is not secured
  Action is enabled
  Action label: Turn on oven light
  Action bgColor: 1024
  Action hints: ACTIONBUTTON
  Printing ChildDialog:
    Dialog name: LightConfirm
    Dialog version: 1
    Dialog is not secured
    Dialog is enabled
    Dialog label: Are you sure?
    Dialog bgColor: 1929
    Dialog hints: ALERTDIALOG
    Dialog message: Are you sure you want to turn on the light
    Dialog numActions: 3
    Dialog Label for Action1: Yes
    Dialog Label for Action2: No
    Dialog Label for Action3: Cancel

Going to execute all Actions now
Execute Action for ovenAction
    Action execution succeeded

Going to execute all Dialog Actions now
Execute Actions for LightConfirm which has 3 actions:
    Action 1 execution succeeded
    Action 2 execution succeeded
    Action 3 execution succeeded

Going to call setValue for all Properties now
Setting Value for Property heatProperty
    Setting Value to 130
   0.307 TRACE    ControlPanel lepDisp1_0       ...s/PropertyBusObject.cc:126 | Set Value was called
   0.308 DEBUG    ControlPanel lepDisp1_2       ...s/PropertyBusObject.cc:184 | Received ValueChanged signal
Received ValueChanged Signal for Widget heatProperty
  Property is a UINT16 Property.
  Property Value: 130
    Set Value succeeded
```