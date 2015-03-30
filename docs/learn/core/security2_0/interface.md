# Security 2.0 Interface Definitions

## Release History

|Release version | Date | What changed |
|---|---|---|
| initial release | 3/03/2015 | Security 2.0 interface version 1 was added. |

<!--TODO this is a place holder for the PermissionMgmt interface document -->
## AllJoyn Introspection XML

```xml
<node
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://allseenalliance.org/schemas/introspect.xsd">
    <interface name="org.allseen.Security.PermissionMgmt">
        <method name="Claim">
            <arg name="publicKey" type="(yv)" direction="in"/>
            <arg name="identityCert" type="(yay)" direction="in"/>
            <arg type="(yv)" direction="out"/>
        </method>
        <method name="InstallPolicy">
            <arg name="authorization" type="(yv)" direction="in"/>
        </method>
        <method name="InstallEncryptedPolicy">
            <arg name="encryptedAuthorization" type="ay" direction="in"/>
        </method>
        <method name="GetPolicy">
            <arg type="(yv)" direction="out"/>
        </method>
        <method name="RemovePolicy">
        </method>
        <method name="InstallMembership">
            <arg name="certChain" type="a(yay)" direction="in"/>
        </method>
        <method name="InstallMembershipAuthData">
            <arg name="serialNum" type="s" direction="in"/>
            <arg name="issuer" type="ay" direction="in"/>
            <arg name="authorization" type="(yv)" direction="in"/>
        </method>

        <method name="RemoveMembership">
            <arg name="serialNum" type="s" direction="in"/>
            <arg name="issuer" type="ay" direction="in"/>
        </method>
        <method name="InstallIdentity">
            <arg name="cert" type="(yay)" direction="in"/>
        </method>
        <method name="GetIdentity">
	    <arg name="cert" type="(yay)" direction="out"/>
        </method>
        <method name="InstallGuildEquivalence">
            <arg name="cert" type="(yay)" direction="in"/>
        </method>
        <method name="RemoveGuildEquivalence">
            <arg name="serialNum" type="ay" direction="in"/>
            <arg name="issuer" type="ay" direction="in"/>
        </method>
        <method name="GetManifest">
            <arg type="(yv)" direction="out"/>
        </method>
        <method name="Reset">
        </method>
        <method name="GetPublicKey">
            <arg type="(yv)" direction="out"/>
        </method>
        <method name="InstallCredential">
            <arg name="type" type="y" direction="in"/>
            <arg name="credential" type="v" direction="in"/>
        </method>
         <method name="RemoveCredential">
            <arg name="type" type="y" direction="in"/>
            <arg name="credentialID" type="v" direction="in"/>
        </method>
     </interface>
     <interface name="org.allseen.Security.PermissionMgmt.Notification">
        <signal name="NotifyConfig">
            <arg name="version" type="q"/>
            <arg name="publicKeyInfo" type="a(yv)"/>
            <arg name="claimableState" type="y"/>
            <arg name="trustAnchors" type="a(yv)"/>
            <arg name="serialNumber" type="u"/>
            <arg name="memberships" type="a(ayay)"/>
        </signal>
    </interface>
</node>
```

[about-data-interface-fields]: #about-data-interface-fields
[signals]: #signals