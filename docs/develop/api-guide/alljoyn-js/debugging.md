# Debugging AllJoyn.js
***

JavaScipt may be easy to write but can sometimes be hard to debug without tools like GDB. Since AllJoyn.js abstracts the underlying implementation it is sometimes difficult to find out why your AllJoyn.js script is not working properly. There are some tools that you can leverage to find out what is going wrong.

### Print Debugging
There is always the classic print debugging that you can use to figure out program flow or what variables are set to. As with most languages its as simple as calling print() in a location of interest

```javascript
var adc = IO.analogOut(IO.pin[1]);

/*...Some code manipulating 'adc'...*/

print(adc.value());
```

#### or
```
function myFunc(var) {
    if (cond) {
        /*Do something*/
        print("The condition was met");
    } else {
        /*Something else*/
        print("The condition was not met");
    }
```

### Pin information
If the problem your having comes from an incorrect pin configuration or an unknown pin type there is pin information that can be queried from JavaScript. They are mentioned in the IO Documentation as well. After you have created a pin object you can look at its pin properties to find out information about it.

```javascript
var mypin = IO.digitalOut(IO.pin[1]);

print(mypin.info.physicalPin);
print(mypin.info.schematicId);
print(mypin.info.datasheetId);
print(mypin.info.description);
```
This might print out something like:

```
62
GPIO_PD15
PD15
Blue LED
```
Now we know that pin 1 is a GPIO pin, its pin PD15 on the hardware your using, and its also a blue LED. Using the pin information can tell you if your using the pin for the right function.

### Console Application

The final tool at your disposal is the console application. It is a command line application that can be used to send scripts over the air (OTA) as well as send short JavaScript commands (evals) directly to the JavaScript engine. To get this setup you will also need to have AllJoyn Standard Library on your Linux, Mac, or Windows machine. This can either be done by downloading the SDK or building from source. Information about how to do this can be found at https://wiki.allseenalliance.org.

Once you have AllJoyn Standard Library up and running you will need to compile the console application. In the alljoyn-js directory navigate to the 'console' folder. From here it is as easy as running 'scons' as with building alljoyn-js. After running scons you should have an executable named 'ajs_console'. This can be run by iteslf or with a JavaScript script as a parameter. Doing this will send the script OTA to your AllJoyn.js device.
##### Sending a script OTA
Before we look at the eval feature we can try sending a script OTA to the AllJoyn.js device. To do this you simply run the console application with the script you want to send as the first parameter:
* ##### Linux/Mac
```
./console/ajs_console js/blinky.js
```
* ##### Windows
```
console\ajs_console.exe js\blinky.js
```
This command will then send the"blinky.js" script to the AllJoyn.js device, compile it, and execute it. For some devices that dont have any kind of shell or UI this is the only way to run scripts on them. The console will execute the entire script on the device. Next we will look at the eval feature where you can execute single lines of JavaScript.


Running the console application by itself without a script as a parameter will connect to the AllJoyn.js device but not execute any JavaScript. Once your connected you can type in lines of JavaScript you want to "evaluate" in the engine. This can be simple like 1+1 or more complex like actually manipulating the hardware.
##### Evaluate a simple expression:
```
1+1
Eval: 1+1;
Eval result=0: 2
```
##### Configure a pin:
This wil cause pin 15 to go high every 500 ms
```
setInterval(function(){IO.digitalOut(IO.pin[15]).toggle()}, 500);
```
The console application allows you to easily test out simple JavaScript code without having to compleatly write a script and run it on the platform your debugging. This is very useful for on the fly testing and debugging because you can talk, in real time, to the AllJoyn.js device.

#### Real time debugging:
This section goes over using the debugging client to remotely debug AllJoyn.js applications in real time. At your disposal are a command line based tool as well as a Python GUI. The command line tool requires no additional dependencies and is much eaiser to use if you have some experience with using gdb from the command line, though it is much more limited than gdb. The Python GUI allows you to visualize everything. You can see your source code, the line your on, local variables etc. all in one screen. The GUI is more geared towards someone who is just starting out debugging and/or writing AllJoyn.js programs.
##### Text console:
To use the text debug text console is built into the console application. Simply run using the --debug flag and it will connect to your AllJoyn.js program in debug mode, haulting execution as soon as its connected.
```
./console/ajs_console --debug
```
You will see a similar connection routine as without the --debug flag but after a sucessful connection the program will be paused or haulted, waiting for you to input a command. All debug commands are prefixed with '$' to distinguish between Evals. Here is a list of all debug commands:
```
$in         // Step in
$out        // Step out
$over       // Step over
$resume     // Resume debugging
$pause      // Pause debugging
$attach     // Attach the debugger
$detach     // Detach the debugger
$addbreak   // Add a breakpoint
$delbreak   // Remove a breakpoint
$lb         // List breakpoints
$bt         // See a current stack trace
$getvar     // Get a variable
$eval       // Do an Eval (different from standard eval)
```
###### Stepping
The commands $in, $out, and $over are all stepping commands. Executing $in will result in a single step. If the line of code is on a funcion it will step into that funcion, otherwise it will just step to the next line. Using $out will cause the debugger to step out of the current scope. If your in a function you will step out of that function as if it has returned. Executing $over will result in stepping over a single line of code.
###### Pause/Resume/Attach/Detach
These 2 sets of commands may seem similar but they are quite different. Attach/Detach will disconnect or re-connect you to the debug target. If you execute $detach while debugging the AllJoyn.js target will execute as if no debugger is attached, meaning you cannot hault, step, or do anything until you call $attach again. Using $pause and $resume leave the debugger attached but hault or resume execution while still allowing you to use the debugger. For example calling $resume will cause the debugger to begin running but you still can add a breakpoint or call $pause to hault the program in its current location.
###### Add Break, Delete Break and List break
These three commands all pertain to using breakpoints. A breakpoint is something that can be added to a line of code and if that line of code is reached the debugger will immediatly hault, or break, at that line of code. To add a breakpoint...
```
$addbreak myfile.js 25
```
This will add a breakpoint and store it at index zero. If you add another it will be at index 1 etc. To see all breakpoints you have added use the $lb command (list breakpoints)
```
$lb
```
This shows all breakpoints and their index. To delete a breakpoint use $delbreak
```
$delbreak <index>
```
###### Backtrace
A backtrace is very important for determining where you are in your AllJoyn.js program. It will list all new program scopes in order so you can see where you have been and where you currently are in the program.
```
$bt
```
###### Get var and Eval
When your at some point in your code you may want to inspect a variable and see its value. This is done using $getvar.
```
$getvar <name>
```
This will output the variables value. Here you will be able to see if its been initialized, and if it has what exists in that variable. Some complex data types like objects require an extra step to fully inspect their elements. While debugging you must use 'Eval' but not the same Eval as the regular console (without debugging). Its very similar to use...
```
$eval <statement>
```
For example say you have an object 'obj'
```
var obj = {
    val1:12
    val2:"twelve"
}
```
If you want to inspect val1 or val2 $getvar will not work. You must use Eval like:
```
$eval obj.val1
12
$eval obj.val2
"twelve"
```
This covers the basics of the text debugger client but some users may want a more visual tool, the debugger GUI
### Python debugger GUI
This tool gives the user a visual, easy to use tool for debugging AllJoyn.js programs. All the debug functions described previously are present as buttons and things like breakpoints and stack traces are viewed in a window. If you have used any debugger GUI before this should come natural to you and if not its still very intuative. Along the left column are your control buttons: Stepping, Attach/Detach, Pause/Resume and installing a new script. The main window will show your script and highlight the current line your on. Current breakpoints highlight the line number red in the source window. Local variables can be viewed in the top right window. Below locals are your current breakpoints. Your stack trace is located under the breakpoint view. There is a text entry section under the source viewer for evals and below that is a console window for looking at prints, debug messages and eval output. There is a help button that will bring up a new window which explains the usage more in depth.

To use the Python GUI you must first build the AJSConsole library for Python by running setup.py
```
cd console/
python setup.py build
python setup.py install
```
This will build AJSConsole.so and put it in your Python library directory. You may need to run the installer as a root user if you get a permission error. After those commands were run sucessfully you can launch the Python GUI.
```
python pydebugger.py
```
This will behave the same way as the standard console in that it will look for a AllJoyn.js application running on the network and connect to it. You should then see the source window populated with the script installed on the target device.
