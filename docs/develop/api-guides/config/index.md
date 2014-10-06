# Configuration API Guides

## Configuration

* [Android][config-android]
* [Linux][config-linux]
* [iOS][config-ios]
* [Thin Linux][config-thin-linux]

## Best Practices

### Update individual configuration fields

When attempting to update specific configuration data fields 
using a Config Client, it is recommended that the developer 
perform the following steps:

1. Use the GetConfigurations API call to retrieve the current 
configuration values for a given language.
2. Update the desired value(s) in the retrieved object.
3. Use the UpdateConfigurations API call to give the updated 
object and the given language back to the Configuration service framework.

See the Configuration API Guide listed at the top of this page 
for the platform you are targeting for specific code examples.

This approach will ensure that the Config Client receives the 
current values for the provided language for the set of fields 
that are actually updatable.

### Maximum size for configuration fields

Depending on the device and implementation, there may be a 
maximum length for string/character based configuration fields, 
such as the device name, on an embedded device application. 
This maximum length is optional for an OEM to supply and 
therefore may not always be present. A developer can check 
for the existence of this constraint by doing the following:

* Use the getAbout API call to retrieve the object containing 
the About values.
* Check the About data object for a "MaxLength" field.

If the field exists, the maximum length is specified in bytes, 
not characters. Therefore, when providing a user the option to 
modify a Config field via a UI, the input value must first 
be encoded as string and then checked against the maximum byte 
length requirement.

### How to use remote Restart API call

A remote Restart call is propagated to the application via a 
callback. It is up to the application developer to add the 
appropriate logic to actually perform the restart.
 
### How to use remote FactoryReset API call

A remote FactoryReset call is propagated to the application 
via a callback. The ConfigService performs the resetting of 
the PropertyStore by calling its `resetAll()` method. It is 
up to the application developer to perform other factory reset 
tasks such as clearing the device password and network configuration 
(if any), which are out of the scope of the Configuration service 
framework.

### Extending the PropertyStore implementation

The application writer may choose to extend the PropertyStore 
implementation to manage the device passphrase and network 
configurations. This can be done by adding appropriate getters 
and setters and a flag for each property so that the PropertyStore 
interface call `readAll()` will only return interface/public fields.


[config-android]: /develop/api-guides/config/android
[config-linux]: /develop/api-guides/config/linux
[config-ios]: /develop/api-guides/config/ios
[config-thin-linux]: /develop/api-guides/config/thin-linux
[config-api-guide]: /docs/develop/api-guides/index