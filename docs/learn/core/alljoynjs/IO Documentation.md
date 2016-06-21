This work is licensed under a Creative Commons Attribution 4.0 International License.
http://creativecommons.org/licenses/by/4.0/

# IO
***

### Configuration Options (CO)

1. IO.pullDown

2. IO.pullUp

3. IO.openDrain



### Trigger Modes (TM)

1. IO.fallingEdge

2. IO.risingEdge

3. IO.disable



### Information From Pins

**pin.info.physicalPin:** Returns the physical pin number

**pin.info.schematicId:** Returns the schematic Id of the pin

**pin.info.datasheetId:** Returns the data sheet Id of the pin

**pin.info.description:** Returns the description of the pin
```javascript

var led1 = IO.digitalOut(...);

print(led1.pin.info...);```



### digitalIn()

**IO.digitalIn(IO.pin#, CO config)-**Construct a new digital input pin

\#: the number of the pin to be configured. Pin numbering starts from 1.

config: the Configuration Option of the pin

```javascript

var pb1 = IO.digitalIn(IO.pin1, IO.pullDown);```

**.setTrigger(TM mode, function(){})-**Enable or Disable the Trigger Mode for the pin

mode: the Trigger Mode of the pin

function(): the function that will execute when .setTrigger() is called

```javascript

pb1.setTrigger(IO.risingEdge, function(){print(pb1.level);});```

**.level-**Return the level on which the pin is on

```javascript

print(pb1.level) //Prints out 0```



### digitalOut()

**IO.digitalOut(IO.pin#, CO config)-**Construct a new digital output pin with a configuration option

\#: the number of the pin to be configured. Pin numbering starts from 1.

config: the configuration option of the pin, or can be replaced with 1 (on position) and 0 (off position). The pin
will automatically start in the on position if a configuration option is typed in

```javascript

var led1 = IO.digitalOut(IO.pin1, IO.pullUp);```

**IO.digitalOut(IO.pin#)-**Construct a new digital output pin that will start in the off position

\#: the number of the pin to be configured. Pin numbering starts from 1.

```javascript

var led2 = IO.digitalOut(IO.pin2);```

**.toggle()-**Toggle the pin

```javascript

led1.toggle();```

**.pwm(double dutyCycle, int freq)-**Set the PWM duty cycle on a pin (only if PWM functions are supported on the pin)

dutyCycle: A value between 0.0 and 1.0 to set the cycle

freq: the frequency to rotate the bit pattern

```javascript

led2.pwm(0.5, 4);```

**.level-**Return or set the level on which the pin is on
```javascript

print(led1.level); //prints out 1

led1.level = 0;

print(led1.level); //prints out 0```



### analogIn()

**IO.analogIn(IO.pin#)-**Construct a new analog input pin

\#: the number of the pin to be configured to an analog input. Pin numbering starts from 1.

```javascript

var sensor = IO.analogIn(IO.pin12);```

**.value-**Return the ADC value of the pin

```javascript

print(sensor.value);```



### analogOut()

**IO.analogOut(IO.pin#)-**Construct a new analog output pin

\#: the number of the pin to be configured to an analog output. Pin numbering starts from 1.

```javascript

var motor = IO.analogOut(IO.pin10);```

**.value(int num)-**Set the DAC value

num: the number to set
```javascript

motor.value(2);```


### IO.uart()
**IO.uart(IO.pin#1, IO.pin#2, baud)-** Create a new uart peripheral object

\#1: The pin number of the TX pin on the AllJoyn JS device.

\#2: The pin number of the RX pin on the AllJony JS device.

baud: The baud rate for the UART peripheral

uart() has 2 functions: write() and read(). The write() function will support many data types: Booleans, numbers, strings, buffers, and arrays of any of the previous types. The read() function takes a length parameter and returns a Duktape Buffer.

```javascript
var u = IO.uart(IO.pin4, IO.pin5, 115200);

u.write("Hello World");
u.write(["this", "is", "an", "array", "of", "strings"]);

/*Read 10 bytes*/
var r = IO.read(10);```


### IO.spi()
**IO.spi(IO.pin#1, IO.pin#2, IO.pin#3, IO.pin#4, prescaler, master, polarity, phase, data_bits)-** Create a new SPI peripheral object

\#1: MOSI pin (Master Out Slave In)

\#2: MISO pin (Master In Slave Out)

\#3: CS pin (Chip Select)

\#4: Clock pin

prescaler: The divisor of the CPU clock that will run the SPI peripheral. SPI Clock = (CPU Clock / prescaler)

master: Boolean specifying if the device is a slave or master in the SPI setup

polarity: The clock polarity. Values can be 0 (low) or 1 (high)

phase: The clock phase. Values can be 1 (1 Edge) or 2 (2 Edge)

data_bits: Number of data bits per SPI transfer. Can be 8, 16, 32 depending on the platform.

The spi object has two functions: read() and write(). The write() function will support many data types: Booleans, numbers, strings, buffers, and arrays of any of the previous types. The read() function takes a length parameter and returns a Duktape Buffer.

```javascript
var s = IO.spi(IO.pin4, IO.pin5, IO.pin6, IO.pin7, 4, true, 0, 1, 8);

s.write("Write to SPI");

/* Print out 40 bytes read back*/
print(s.read(40));
```

### IO.i2c()
**IO.i2c(IO.pin#1, IO.pin#2, clock, master, address)-** Create a new I2C peripheral object

\#1: SDA pin

\#2: SCL pin

clock: The clock rate for the I2C device

master: Mode for the I2C device. true for master, false for slave

address: The AllJoyn.js device address. If master this can be any value as it is not used.

The i2c object has one function, transfer(). This function handles sending and receiving all in one go. transfer() takes 6 parameters: address, tx buffer, tx length, rx buffer, rx length, and rx bytes. The first parameter is the address of the device your transfering to or from. tx/rx buffer is the data buffer where the data will be transfered to/from. tx/rx length is the size of the tx/rx buffer. rx bytes is the number of bytes actually received in the transfer.

```javascript
var i = IO.i2c(IO.pin5, IO.pin6, 100000, true, 0x00);

/*Send the device 2 bytes then receive 2 bytes*/
var send = 0x1234;
var recv;
var bytes_received;
i.transfer(0x4A, send, 2, recv, 2, bytes_received);
```


### IO.system(Sring cmd)

Emit the command to the underlying system. On supported systems (linux/darwin) the command line result is returned from the system call.

cmd: the command to emit

```javascript
IO.system('aplay DoorBell.wav')
```
