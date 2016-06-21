## AllJoyn Signals, Methods, and Properties
***

### Message Types

**AJ.METHOD-**A message that has specific arguments included and requires a return value

```javascript

AJ.interfaceDefinition["org.alljoyn.marshal_test"] = {

    method:{type:AJ.METHOD, args:[DT], returns:[DT]}
};

```

**AJ.SIGNAL-**A message that can have specific arguments included with no return value

```javascript

AJ.interfaceDefinition["org.alljoyn.marshal_test"] = {

    signal:{type:AJ.SIGNAL, args:[DT]}
};

```

**AJ.PROPERTY-**A message that has a signature and a read/write state

```javascript

AJ.interfaceDefinition["org.alljoyn.marshal_test"] = {

    property:{type:AJ.PROPERTY, signature: DT, access: DT}
};

```

### Message Methods

**AJ.interfaceDefinition[String interface]-**List all of the different methods/signals/properties within the given interface

interface: A String that dictates the interface that the messages will be travelling on

```javascript

AJ.interfaceDefinition["org.alljoyn.marshal_test"] = {messages};

```

**AJ.objcectDefinition[String object]-**List all of the different interfaces and other information within one object

object: Path for the object

```javascript

AJ.objectDefinition['/test'] = {

    interfaces:['org.alljoyn.test']

};

```

**AJ.onAttach-**This function is called when the program has attached to an Alljoyn Bus

```javascript

AJ.onAttach = function()
{

    print("AJ.onAttach");

}

```

**AJ.onDetach-**This function is called when the program has been detached from an Alljoyn Bus

```javascript

AJ.onDetach = function()
{

    print("AJ.onDetach");

}

```

### Sending Message Methods

**AJ.findService(String interface, function() {})-**Find the service that is using the given interface and perform the given function once the service has been found.
interface: the interface name from the interface definition

```javascript

AJ.findService('org.alljoyn.test', function(svc) {});

```

**AJ.onPeerConnected-**Find the service that the program is going to be using once the program has found another message service

```javascript

AJ.onPeerConnected = function(svc) {

    return true;

}

```

Note: Must return true after performing the function



**.method(String name)-**Create a method message using the information provided in the interface definition on the service fround from AJ.findService

name: the name of the message from interfaceDefinition

```javascript

var name = svc.method('method');

```

**.call(raw DT)-**Call the method message with the given parameters which must be in the form as declared in the interface definition

```javascript

AJ.interfaceDefinition["org.alljoyn.test"] = {

    method1:{type:AJ.METHOD, args:["v"], returns:["s"]}

};

...

var name = svc.method('method1');

name.call({"s":"Hello"});

```

**.onReply-**This function is called when the message receives a reply. Can only be used for method and property messages

```javascript

name.onReply = function(arg) {print(arg);}

```

**.signal(String objectDef, String interfaceDef, String name)-**Create a signal message using the information provided in the interface definition and the object definition on the service found from AJ.findService.

objectDef: the path for the object from objectDefinition

interfaceDef: the name of the interface definition from interfaceDefinition

name: the name of the signal from InterfaceDefinition
```javascript

var signal = svc.signal('/test', 'org.alljoyn.test', 'signal1');
```

Note: the objectDefinition as declared must contain the name of the interfaceDefinition that was also declared


**.send(raw DT)-**Send the signal message with the given parameters which must be in the form as declared in the interface definition

```javascript

AJ.interfaceDefinition['org.alljoyn.test'] = {

    signal1:{type:AJ.SIGNAL, args["d"]}
};

...

signal.send(3.14159265358979);
```

**.getProp(String name)-**Gets the property value from other programs on the same interface who declare the property's value

name: the name of the property from InterfaceDefinition

```javascript

svc.getProp('property1');
```

Note: Can only be called if the property is a Read/Write or Read-Only



**.setProp(String name, raw DT)-**Sets the property value from other programs on the same interface who declare the property's value and it must be in the form as declared in the interface definition
name: the name of the property from InterfaceDefinition

```javascript

AJ.interfaceDefinition['org.alljoyn.test'] = {

    property1:{type:AJ.PROPERTY, signature: "av", access: "R"}
};

...

svc.setProp('property1', [{"s":"July"},{"v":{"i":4}},{"av":[{"i":1776},{"i":2014}]}]);

```

Note: Can only be called if the property is a Read/Write or Write-Only



**.getAllProps(String iface)-**Gets all the properties from a specific interface in the form a{sv}

```javascript

svc.getAllProps("org.alljoyn.marshal_test").onReply = function() {

    print(arguments[0]);

}
```



### Receiving Message Methods

**AJ.onMethodCall-**This function is called when the program receives a method message

```javascript

AJ.onMethodCall = function(arg)

{

    if(this.member == method1) {

        print(arg);

        this.reply("Hello to you too");

    }

}

```
Note: if the method message's interface definition has a returns: DT, then the this.reply() parameter must be in the form that was declared.



**AJ.onSignal-**This function is called when the program receives a signal message

```javascript

AJ.onSignal = function()

{

    if(this.member == 'signal1') {
        print("Signal Received");

    } else {

        throw('rejected');

    }

}

```

**AJ.onPropGet-**This function is called when the program receives a property message that requests to get the property value

```javascript

AJ.onPropGet = function(iface, prop) {

    if (iface == 'org.alljoyn.marshal_test') {

        this.reply(properties[prop]);

    } else {

        throw('rejected');

    }

}

```

**AJ.onPropSet-**This function is called when the program receives a property message that requests to set the property value

```javascript

AJ.onPropSet = function(iface, prop, value) {

    if (iface == 'org.alljoyn.marshal_test') {

        properties[prop] = value;

        this.reply();

    } else {

        throw('rejected');

    }

}

```

**AJ.onPropGetAll-**This function is called when the program receives a get all property message and returns all the properties within a given interface in the format a{sv}

```javascript

AJ.onPropGetAll = function(iface) {

    if(iface == 'org.alljoyn.marshal_test') {

        this.reply(properties);

    } else {

        throw('rejected');

    }

}

```

Note: It is recommended that properties are stored as an object, making this reply simply the ojbect name.



**AJ.addMatch(String iface, String name)-**Adds the signal message and matches to make sure that the message is on the given interface

iface: interface name listed in interface definition

name: name of the signal message to be matched

```javacript

AJ.addMatch('org.alljoyn.test', 'signal1');

```


### Data Types (DT)

**"y"-**Byte (8-bit unsigned integer)

**"b"-**Boolean value

**"n"-**16-bit signed integer

**"q"-**16-bit unsigned integer

**"i"-**32-bit signed integer

**"u"-**32-bit unsigned integer

**"x"-**64-bit signed integer

**"t"-**64-bit unsigned integer
**"d"-**IEEE 754 double
**"s"-**UTF-8 string

**"o"-**Object Path: Name of an object instance

**"a"-**Array

**"()"-**Struct: Like an array but maintains the order of the elements contained within the struct

**"v"-**Variant: A data type which contains another data type and its value as a dictionary entry
**"{}"-**Entry in a dictionary or map

**"r"/"R"-**Read-Only, used for access: in property message

**"w"/"W"-**Write-Only, used for access: in property message



**Data Type Usage Examples**

```javascript

AJ.interfaceDefinition["org.alljoyn.test"] = {

    method1:{type:AJ.METHOD, args:["v"], returns:["s"]},

    method2:{type:AJ.METHOD, args:["ai"], returns:["dbs"]},

    method3:{type:AJ.METHOD, args:["ay"], returns:["(ii)"]},

  method4:{type:AJ.METHOD, args:["a{is}"], returns:["a{is}"]},

    signal1:{type:AJ.SIGNAL, args:["d"]},

    property1:{type:AJ.PROPERTY, signature: "av", access: "RW"}
};

...

(On sending side)

svc.method('method1').call({"s":"Hello"});

svc.method('method2').call([1, 2, 3]);

svc.method('method3').call(Duktape.Buffer('foo'));

svc.method('method4').call({3: "Three", 4: "Four"});

svc.signal('/test', 'org.alljoyn.test', 'signal1').send(3.14159265358979);

svc.setProp('property1', [{"s":"July"},{"v":{"i":4}},{"av":[{"i":1776},{"i":2014}]}]);
.
..

(On receiving side)

AJ.onMethodCall = function()

{

    if(this.member == 'method1'){

        this.reply("Hello to you too");

    } else if(this.member == 'method2'){

        this.reply(4.0, false, "GPA");

    } else if(this.member == 'method3'){

        this.reply([1, 2]);

    } else if(this.member == 'method4'){

        var array = [];

        array[3] = "Three";

        array[4] = "Four";

        this.reply(array);

    } else{

        throw('rejected');

    }

}

AJ.onSignal = function(arg)

{

    if(this.member == 'signal1'){

        print(arg);

    } else {

        throw('rejected');

    }

}

AJ.onPropSet = function(iface, prop, value)

{

    if (iface == 'org.alljoyn.marshal_test') {

        properties[prop] = value;

        this.reply();

    } else {

        throw('rejected');

    }
}

```

Note: if using dictionary entry then must have "a{}"

Note: "ay" is a buffer and needs to be called with Duktape.Buffer

Note: Can have a variant inside of a variant

Note: if access: is blank, then the property is both readable and writeable.



**To see more examples of message sending and receiving, look at client_test.js and server_test.js in the js folder in alljoyn-js.**
