# Building Thin – Arduino

## Setup

#### Arduino IDE
Download and install the Arduino IDE for your host development platform (Windows, Mac, Linux, etc).

#### AllJoyn&trade; Arduino SDK
Download the AllJoyn Arduino SDK from the AllSeen Alliance Website.

Extract the downloaded SDK.

#### Import the AllJoyn Library
In the Arduino IDE:
* Select __Sketch > Import Library > Add Library__.
* In the File selection dialog, navigate to the extracted AllJoyn Arduino SDK, and import the library.
* Upon successful importation, you should see an entry for _AllJoyn_ under the __Sketch > Import Library__ menu.

## Build the Samples
In the Arduino IDE:
* Select __File > Examples > AllJoyn > AJ_LedService__
* Use the _Verify_ button to make sure that the sample compiles.
* Repeat this process for each of the samples located at __AllJoyn > samples__

## Add the AllJoyn framework to an application

Link to the “Writing your own Thin App section”
