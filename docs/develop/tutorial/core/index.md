# My First AllJoyn&trade; Core Application

Congratulations again on realizing that the AllJoyn framework will 
solve all your proximity peer-to-peer issues. To better understand 
the application that will be explained here, we will discuss an analogy 
that should make  understanding the AllJoyn framework clear...

...Imagine you are in a room with lots of other people, a school 
cafeteria or public event. You have a group of people that you are 
with that you want to interact with. There are many people around 
all making noise and talking and having conversations, being social. 
An AllJoyn application is very much like a group setting. People in 
a group can "tell" someone something, "share" something to the group, 
or "broadcast" something for everyone to hear.

Let's look at the concept to "Tell" someone. We get a person's attention, 
direct what we want to say directly at that person, and normally get a 
response. In the AllJoyn framework, this is the equivalent of joining a 
session and executing a BusMethod call. We connect with another application, 
then send what we want it to know, and get a response.

The concept of "Share" allows us to communicate with the group we are with. 
When you want to let each person in your group know something important, 
you share with them by making an announcement. In the AllJoyn framework, 
this equates to joining a session and sending a Signal. We don't want a 
response to our announcement, we just have meaningful data we want people 
in the group to know about at the same time.

Lastly, the idea of "Broadcast". When you want everyone in the room to 
hear what you have to say, regardless of who they are, we scream at the 
top of our lungs something we feel is important. Some people will ignore 
this, others will hear and take action, others will hear it and ignore our 
message. In the AllJoyn framework, we call this a [Sessionless Signal][sessionless-signal].
This allows for an application to publish some data that it feels is 
meaningful across the network with a time to live expiration value. 
That message can be picked up by any application that may be interested 
and there is no logic needed to track a sessionId, figure out who binds/joins; 
the AllJoyn core handles this for you.

One thing that we have, as people, is the ability to see each other and 
recognize certain characteristics like height, eye color, male/female, etc. 
We also can recognize our friends in a crowed based on what they are wearing, etc.  
In the AllJoyn framework, we discover other applications through the [About Feature][about_feature] 
and this tells us characteristics about the device: name, make, model, etc. 
It also tells us, very specifically, the set of interfaces that are supported.  
These interfaces define the features that are exposed, and really the API set 
that we can interact with.

Let's get started building our first AllJoyn application by advertising our 
capabilities, looking for other compatible applicaitons, and performing the 
3 communication paths: 1-to-1 interactions with a specific application, 
1-to-many to a specific set of applications, and 1-to-many with any application.


Before we get started writing code, follow the environment setup guide for your platform:
<!-- * [Android][build_android] -->
* [Linux][build_linux]
<!-- * [Thin - Linux][build_thin_linux] -->
<!-- * [iOS/OSX][build_ios_osx] -->
* [Windows][build_windows]

Now that we have our environment set up, let's start writing some software!

## Code Walkthrough

[Follow our walkthrough to build your first AllJoyn application.][walkthrough]

You can skip the walkthrough and go straight to the source code in the 
[Hackfest project][hackfest].

[walkthrough]: /develop/tutorial/core/walkthrough
[hackfest]: https://git.allseenalliance.org/cgit/extras/hackfest.git
[sessionless-signal]: /learn/core#sessionless-signal
[about_feature]: /learn/core/about-announcement
[build_android]: /develop/building/android
[build_linux]: /develop/building/linux
[build_thin_linux]: /develop/building/thin_linux
[build_ios_osx]: /develop/building/ios_osx
[build_windows]: /develop/building/windows

