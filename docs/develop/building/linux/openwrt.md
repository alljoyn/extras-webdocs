# Building OpenWRT

The OpenWRT build process uses the [Linux build environment](https://allseenalliance.org/framework/documentation/develop/building/linux/build-source).

The AllJoyn&trade; framework supports the following OpenWRT platform releases:

* Attitude Adjustment
* Barrier breaker - current stable release
* Chaos Calmer - current development version

## Download OpenWRT Source

Download the OpenWRT project source code by running the following command:

```sh
~/ajn_openwrt/$ git clone git://github.com/openwrt/openwrt.git -b chaos_calmer
```

**Note:** This will download the source for the Chaos Calmer release of OpenWRT. The OpenWRT source is needed even when building the AllJoyn framework as installable modules.


## Building OpenWRT With AllJoyn Built In

This section will cover building a full OpenWRT image for installation on a supported router with the AllJoyn framework built in.

### Add The AllJoyn Feed

The feed for the required AllJoyn version must be added to the `feeds.conf` file:

```sh 
~/ajn_openwrt/ $ cp feeds.conf.default feeds.conf
~/ajn_openwrt/ $ gedit feeds.conf

# Add the following line to the end of the file and save the changes:
src-git alljoyn https://git.allseenalliance.org/gerrit/core/openwrt_feed;16.04-stable
```
**Note:** AllJoyn versions that are available for OpenWRT can be found in the [OpenWRT Feed](https://cgit.allseenalliance.org/core/openwrt_feed.git/refs/heads?h=master) repository.

After adding the AllJoyn feed, update the feeds and install the AllJoyn package definitions:

```sh
~/ajn_openwrt/ $ ./scripts/feeds update -a
~/ajn_openwrt/ $ ./scripts/feeds install -a -p alljoyn
```

### Enable the AllJoyn packages to build

```sh
make menuconfig
        Networking --->
                < > alljoyn --->
                        < > alljoyn-about
                        < > alljoyn-c
                        < > alljoyn-config --->
                                < > alljoyn-config-samples
                        < > alljoyn-controlpanel --->
                                < > alljoyn-controlpanel-samples
                        < > alljoyn-notification --->
                                < > alljoyn-notification-samples
                        < > alljoyn-sample_apps
                        < > alljoyn-services_common
```

### Build The OpenWRT Image

After setting up the build process with `make menuconfig`, the OpenWRT image can be built by running the following command:

```sh
~/ajn_openwrt/ $ make -j5   #Replace '5' with the number of CPU cores in your system for a faster build
```

The build process can take 30 minutes or more, depending on the computer being used.

### Install The Image

The compiled OpenWRT image can be found in `~/ajn_openwrt/bin/mvebu/`. Note that the directory `mvebu` will change depending on which router OpenWRT was compiled for. For more detailed OpenWRT installation instructions, search for your router on [OpenWRT's website](https://openwrt.org/).

Alternatively, if OpenWRT is already installed on the router, the AllJoyn framework can be installed to the router by copying a set of packages onto the router and using OpenWRT's package manager system to install them. The packages can be found in `~/ajn_openwrt/bin/mvebu/packages/alljoyn/`. Note that the directory `mvebu` will change depending on which router OpenWRT was compiled for.

The packages can be copied to the router and installed using the following commands:

```sh
~/ajn_openwrt/ $ scp ./bin/mvebu/packages/alljoyn/alljoyn_16.04-1_mvebu.ipk root@192.168.1.1:/tmp/

# Connect to the router over SSH and run the following commands to install the package:
~/ajn_openwrt/ $ ssh root@192.168.1.1
root@openwrt:~$ cd /tmp/
root@openwrt:/tmp/$ opkg update
root@openwrt:/tmp/$ opkg install alljoyn_16.04-1_mvebu.ipk
```

AllJoyn libs will be installed in `/usr/lib/` and binaries
will be installed in `/usr/bin/`.

**Note:** The package `alljoyn_16.04-1_mvebu.ipk` will only install the AllJoyn Daemon and the libraries for the Daemon. To install the sample applications, the rest of the `*.ipk` files found in `~/ajn_openwrt/bin/mvebu/packages/alljoyn/` will also need to be installed. This should consist of the following packages:
* alljoyn-about_16.04-1_mvebu.ipk
* alljoyn-c_16.04-1_mvebu.ipk
* alljoyn-config_16.04-1_mvebu.ipk
* alljoyn-controlpanel_16.04-1_mvebu.ipk
* alljoyn-notification_16.04-1_mvebu.ipk

Start the AllJoyn daemon by running the following command on the router:

```sh
root@openwrt:~/$ /etc/init.d/alljoyn start
```

Optionally, enable the AllJoyn daemon to start at boot-up.

```sh
root@openwrt:~/$ /etc/init.d/alljoyn enable
```

## Run Sample Apps

Follow the Linux instructions to [run sample apps][running-sample-apps].
Note that since AllJoyn binaries and libs are installed in `/usr/bin/`
and `/usr/lib/`, that the AllJoyn apps can run directly from any path
without setting `LD_LIBRARY_PATH`.

[aa-branch]: https://dev.openwrt.org/browser/branches/attitude_adjustment?rev=39585
[aa-patch]: http://patchwork.openwrt.org/patch/4802/

[bb-branch]: https://dev.openwrt.org/browser?rev=39048
[bb-patch]: http://patchwork.openwrt.org/patch/4576/

[running-sample-apps]: /develop/run-sample-apps
