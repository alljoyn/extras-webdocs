# Thin Linux - Config Sample App


## Prerequisites
* Follow steps in "Building - Thin Linux" section (so samples have been built).
* Follow steps in "Building - Linux" section (so that AllJoyn router has been built). AllJoyn&trade; thin apps require an AllJoyn router to connect to in order to function properly.

## Run Config Sample
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

3. Launch the Config Sample (in a new terminal)
  
  ```sh
  cd $AJ_ROOT/services/sample_apps/build
  ./ConfigSample
  ```

4. Use one of the following Config client apps to interact with the Config service.

  * [iOS Config Sample][ios_config_sample]
  * [Android Config Sample][android_config_sample]
  * [Linux Config Client Sample][linux_config_sample]


## Common Issues


[ios_config_sample]: /develop/run_sample_apps/config/ios_osx
[android_config_sample]: /develop/run_sample_apps/config/android
[linux_config_sample]: /develop/run_sample_apps/config/linux
