This work is licensed under a Creative Commons Attribution 4.0 International License.
http://creativecommons.org/licenses/by/4.0/

# Control Panel

***

### Placement Constants (PC)

**VERTICAL-**Adds new widgets vertically within a container widget

**HORIZONTAL-**Adds new widgets horizontally within a container widget

### Layout Constants (LC)

**SWITCH-**Two-state buttons allowing the end-user to toggle the state of a single settings option

**CHECK_BOX-**Widget for multi-select. It allows the end user to select multiple options from a list.

**SPINNER-**Widget for single-select. It allows the end user to select a single option from a list.

**RADIO_BUTTON-**Widget for single-select. It allows the end user to select a single option from a list.

**SLIDER-**Allows the end user to select a value from a continuous or discrete range. The appearance is linear, either horizontal or vertical.

**TIME_PICKER-**Allows the end user to specify a time value

**DATE_PICKER-**Allows the end user to specify a date value

**NUMBER_PICKER-**Allows the end user to specify a numeric value

**KEYPAD-**Provides the end user with a numeric entry field and buttons for 0-9 digits, to enter a numeric value. Max digit is 32767

**ROTARY_KNOB-**An alternate way to represent a slider

**TEXT_VIEW-**Read-only text label

**NUMERIC_VIEW-**Provides a read-only, numeric field with an optional label and numbers

**EDIT_TEXT-**Provides the end user with a text entry field and keyboard. Max characters is 64 per word



### AJ.controlPanel()

Construct a new control panel

```javascript

var cp = AJ.controlPanel();```

**.load()-**Run the control panel

```javascript

cp.load();```

**.path-**Return the file path to the control panel.

```javascript

cp.path; // /Controlpanel```



### containerWidget()

**.containerWidget(PC, PC)-**Construct a new container widget that is able to store other widgets with a set of vertical and horizontal attributes. Can contain either vertical, horizontal, or both.

```javascript

var cw = cp.containerWidget(cp.VERTICAL, cp.HORIZONTAL);

var cw2 = cw.containerWidget(cp.HORIZONTAL);

var cw3 = cw.containerWidget(cp.VERTICAL);```

Note: the container widget can be built off the control panel or another container widget



**.enabled-**Set whether or not widgets within the container are enabled

```javascript

cw.enabled = false;

cw.enabled = true;```

**.path-**Return the file path to the control panel.

```javascript

cw.path; // /Controlpanel/CONTAINER1```



### labelWidget()

**.labelWidget(String phrase)-**Construct a new label widget which is like a text box
phrase: the phrase that the label widget will display

```javascript

var lw = cw.labelWidget("Hello World");```

Note: the label widget is built off a container widget



**.label-**Return/Set the phrase the label displays

```javascript

lw.label = "Goodbye World";

print(lw.label); //Goodbye World```

**.path-**Return the file path to the control panel.

```javascript

lw.path; // /Controlpanel/CONTAINER1/LABEL2```



### propertyWidget()

**.propertyWidget(LC layout)-**Construct a new property widget, which is an input widget based on the layout chosen

layout: a Layout Constant that determines the method of input

```javascript

var pw = cw.propertyWidget(cp.SWITCH);```

Note: the property widget is built off a container widget



**.propertyWidget(LC layout, value, String label)-**Construct a new property widget, which is an input widget based on the layout chosen and contains a starting value and a label

layout: a Layout Constant that determines the method of input

value: the inital starting value for the widget

label: the label for the widget

**See below for constructor examples for each LC**



**.label-**Return/Set the label of the widget

```javascript

pw.label = "Please make a selection:";

print(pw.label); //Please make a selection:```

**.value-**Return/Set the value of the widget

```javascript

pw.value = 5;

print(pw.value); //5```

**.choices-**Set the choices for the widget

```javascript

pw.choices = ["One", "Two", "Three", "Four"];```

Note: the choices must be Strings

Note: must call this function if LC is SPINNER, or RADIO_BUTTON



**.range-**Set the range for the widget

```javascript

pw.range = {min: 0, max: 100, increment: 5, units: "Celsius"};```

Note: must have labels min, max, increment, and units

Note: min, max, and increment are integers while units is a String

Note: must call this function if LC is SLIDER or ROTARY_KNOB



**.onValueChanged-**this function is called when a property widget's value has been changed

```javascript

pw.onValueChanged = function(val){print(val);}```

Note: val is the value that was just changed



**.enabled-**Set whether or not the widget is running

```javascript

pw.enabled = false;

pw.enabled = true;```

**.path-**Return the file path to the control panel.

```javascript

pw.path; // /Controlpanel/CONTAINER1/PROPERTY2```



### actionWidget()

**.actionWidget(String phrase)-**Construct a new action widget which is a button that needs to be pressed before further action can be taken
phrase: the phrase that the widget will display on the button

```javascript

var aw = cw.actionWidget("Click Me");```

Note: the action widget is build off a container widget



**.label-**Return/Set the label of the widget

```javascript

aw.label = "Click Me";

print(aw.label); //Click Me```

**.enabled-**Set whether or not the button can be pressed

```javascript

aw.enabled = false;

aw.enabled = true;```

**.path-**Return the file path to the control panel.

```javascript

aw.path; // /Controlpanel/CONTAINER1/ACTION2```



### dialogWidget()

**.dialogWidget(String phrase)-**Construct a new dialog widget, which is a widget that pops up a dialog box and provides 1-3 choices with actions

phrase: the phrase that the widget will display

```javascript

var dw = aw.dialogWidget("Please choose:");```

Note: the dialog widget is built off an action widget



**.buttons-**Set the buttons for the widget

```javascript

dw.buttons = [

	{label: "Yes", onClick: function(){print("Yes");}},

	{label: "No", onClick: function(){print("No");}}

];```

Note: must have labels label and onClick, must call this function in order to run the dialog widget, and must have 1-3 buttons

Note: label is a String and onClick is a function



**.path-**Return the file path to the control panel.

```javascript

dw.path; // /Controlpanel/CONTAINER1/ACTION2/DIALOG3```



### Constructor Examples for Layout Constants

**SWITCH**

```javascript

var sw = cw.propertyWidget(cp.SWITCH, true, "Bedroom Lights");```

Note: value is a boolean



**CHECK_BOX**

```javascrip
t
var cb = cw.propertyWidget(cp.CHECK_BOX, true, "Hot");```

Note: value is a boolean



**SPINNER**

```javascript

var sp = cw.propertyWidget(cp.SPINNER, 0, "Mood Lighting Color");```

Note: value is an integer and refers to the index of the .choices array

Note: must assign .choices in order for LC to work



**RADIO_BUTTON**

```javascript

var rb = cw.propertyWidget(cp.RADIO_BUTTON, 2, "Lighting Options");```

Note: value is an integer and refers to the index of the .choices array

Note: must assign .choices in order for LC to work



**SLIDER**

```javascript

var sl = cw.propertyWidget(cp.SLIDER, 21, "Room Temperature");```

Note: value is an integer within the range set by .range

Note: must assign .range in order for LC to work



**TIME_PICKER**

```javascript

var tp = cw.propertyWidget(cp.TIME_PICKER);```



**DATE_PICKER**

```javascript

var dp = cw.propertyWidget(cp.DATE_PICKER);```



**NUMBER_PICKER**

```javascript

var np = cw.propertyWidget(cp.NUMBER_PICKER);```



**KEYPAD**

```javascript

var kp = cw.propertyWidget(cp.KEYPAD, 0, "Please enter your password");```

Note: value is an integer



**ROTARY_KNOB**

```javascript

var rk = cw.propertyWidget(cp.ROTARY_KNOB, 30, "Sound Volume");```

Note: value is an integer within the range set by .range

Note: must assign .range in order for LC to work



**TEXT_VIEW**

```javascript

var tv = cw.propertyWidget(cp.TEXT_VIEW, "Green", "Mood Lighting Color:");```

Note: value is a String



**NUMERIC_VIEW**

```javascript

var nv = cw.propertyWidget(cp.NUMERIC_vIEW, 45, "Time left on Washing Machine:");```

Note: value is an integer



**EDIT_TEXT**

```javascript

var et = cw.propertyWidget(cp.EDIT_TEXT, "", "Please Type in Name for Appliance");```

Note: value is a String



### Control Panel Example-Washing Machine

```javascript

var cp = AJ.controlPanel();

var root = cp.containerWidget(cp.VERTICAL, cp.HORIZONTAL);

var title = root.labelWidget("Washing Machine Settings");



var label = root.propertyWidget(cp.TEXT_VIEW, "Water Temperature:");

var temp = root.containerWidget(cp.HORIZONTAL);

var hot = temp.propertyWidget(cp.CHECK_BOX, false, "Hot");

var warm = temp.propertyWidget(cp.CHECK_BOX, false, "Warm");

var cold = temp.propertyWidget(cp.CHECK_BOX, false, "Cold");



var speed = root.containerWidget(cp.HORIZONTAL);

var spin = speed.propertyWidget(cp.RADIO_BUTTON, 0, "Spin Speed:");

spin.choices = ["Fast", "Medium", "Slow"];



var size = root.containerWidget(cp.VERTICAL);

var load = size.propertyWidget(cp.SPINNER, 0, "Load Size:");

load.choices = ["Extra-Large", "Large", "Medium", "Small"];



var time = root.containerWidget(cp.VERTICAL);

var delay = time.propertyWidget(cp.SLIDER, 0, "Time Delay:");

delay.range = {min: 0, max: 120, increment: 1, units: "Minutes"};



var submit = root.actionWidget("SUBMIT")
;
var confirm = submit.dialogWidget("Are you sure?");

confirm.buttons = [

	{label: "Yes", onClick: function(){
		root.enabled = false;

		hot.enabled = false;

		warm.enabled = false;

		cold.enabled = false;

		submit.enabled = false;

		speed.enabled = false;}},

	{label: "No", onClick: function(){}}

];

cp.load();```
