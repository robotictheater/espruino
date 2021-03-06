Pixelfx - A Neopixel Effects Module For The Espruino
==========================================

The Pixelfx module is meant to help take care of basic lighting effects using NeoPixels.

You can then use these basic building blocks to create more complex lighting effects specific to your project. 

Current Effects Methods
--------
### on(color)
This will simply turn on Neopixels and set them to the color defined.

To turn on all pixels the same color, simply pass in an array defining your RGB color.

```
pixelfx.on([255,0,0]);
```

If you wish to specify a different color for each pixel, pass in an array of arrays. In the example code below, if you have three pixels, they will each be set to a different color.  If you have more than three pixels, the pattern passed in will repeat to illuminate all LEDs.

```
pixelfx.on([[255,0,0],[0,50,0],[0,0,30]]);
```

--------------------------------------------------


### off()
Turns all pixels off.

```
pixelfx.off();
```

----------------------------------------------------

### blink(params, callback)

#### Params
  - **cnt** - (default: 1) - The number of times the pixels should blink.
  - **time_on** - (default: 1000) - The length of time in milliseconds that the pixel should stay on during a blink.
  - **time_off** - (default: 1000) -The length of time in milliseconds that the pixel should stay off during a blink.
  - **color** - To set a single color for all pixels pass in an array containing the RGB values.  If you wish to specify a different color for each pixel, pass in an array of arrays. In the example code below, if you have three pixels, they will each be set to a different color.  If you have more than three pixels, the pattern passed in will repeat to illuminate all LEDs.
  - **blink_fx** - (default: sync) - sync | sequence
    - **sync** - All pixels will blink at the same time.  
    - **sequence** - Each pixel will blink in sqeuence one at a time.
  
  ```
  pixelfx.blink({
    'cnt':5,
    'time_on':100,
    'time_off':100,
    'color':[[0,50,0],[50,0,0],[0,0,50]], 
    'blink_fx':'sync'
  }, function(r){ console.log(r); pixelfx.off(); });
  
  ```
  
  In the example below each pixel will blink on and off for 100ms. If you have a NeoPixel ring you will see each of the 16 or so pixels light up in sequence and cycle around the ring 2 times as set by the "cnt" parameter. 
  
   ```
  pixelfx.blink({
    'cnt':2,
    'time_on':10,
    'time_off':10,
    'color':[[50,0,0]], 
    'blink_fx':'sequence'
  }, function(r){ console.log(r); pixelfx.off(); });
  
  ```
-------------------------------------------------------

### fade(params, callback)

#### Params
 - **from** - The color array the pixels will start at.
 - **to** - The color array the pixels will end at.
 - **time** - The time in milliseconds the pixels will take to fade from the "from" color to the "to" color.

In this example, all pixels will fade from red to blue over a period of 2 seconds.
```
pixelfx.fade({
  "from":[10,0,0],
  "to":[0,0,10],
  "time":2000
},function(r){  });
```

In this example, all pixels will alternate the fade colors red, green, blue, red, green, blue, etc... They will all fade from off to either red, green or blue over a period of 5 seconds.
```
pixelfx.fade({
  "from":[[0,0,0],[0,0,0],[0,0,0]],
  "to":[[100,0,0],[0,100,0],[0,0,100]],
  "time":5000
},function(r){  });
```

-------------------------------------------------------

### pulse(params, callback)

#### Params
 - **from** - The color array the pixels will start at.
 - **to** -  The color array the pixels will end at.
 - **time_in** - The time in milliseconds the pixels will take to pulse **in** from the "from" color to the "to" color.
 - **time_out** - The time in milliseconds the pixels will take to pulse **out** from the "from" color to the "to" color.
 - **cnt** - The number of pulses. 

```
pixelfx.pulse({
  "from":[[0,0,0],[0,0,0]],
  "to":[[10,1,10],[5,100,7]],
  "time_in":2000,
  "time_out":100,
  "cnt":5
},function(r){ });
```

---------------------------------------------

### heartbeat(params, callback)

#### Params
 - **color** - The color array of the pixels heartbeat.
 - **rate** - (optional) A number you can send in to speed up or slow down the rate of the heartbeat.  The default is 1.
 - **cnt** - The number of heartbeats to perform. 

```
pixelfx.heartbeat({
  "color":[30,0,0],
  "cnt":5
},function(r){ pixelfx.off(); });
```

In the example below, the pixels will beat at half the rate as the default. 
```
pixelfx.heartbeat({
  "color":[30,0,0],
  "rate":0.5,
  "cnt":5
},function(r){ pixelfx.off(); });
```

In the example below, the pixels will beat twice as fast in one of two colors. 
```
pixelfx.heartbeat({
  "color":[[30,0,0],[0,30,0]],
  "rate":2,
  "cnt":5
},function(r){ pixelfx.off(); });
```

-----------------------------

Demo
--------

In the demo below you can see that the init function is being told that the neopixels are on pin B15 and there are 16 of them.  Adjust those two values to match your setup.

```
var pixelfx=require('https://github.com/jsrocket/espruino/blob/master/pixelfx/pixelfx.min.js').init(B15, 16);

pixelfx.blink({
    'cnt':2,
    'time_on':10,
    'time_off':10,
    'color':[[50,0,0]], 
    'blink_fx':'sequence'
  }, function(r){

    pixelfx.blink({
      'cnt':5,
      'time_on':100,
      'time_off':100,
      'color':[[0,50,0],[50,0,0],[0,0,50]], 
      'blink_fx':'sync'
    }, function(r){ console.log(r); pixelfx.off(); });
  
});

```
