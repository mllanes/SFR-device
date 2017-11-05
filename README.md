# AWS IoT Challenge 2017 - [HVAC Smart Filter Replacement (SFR) project](http://aws-iot-challenge-2017.marcos.io)

### What is this app for?

It's a service meant to be run in a raspberry pi (or elsewhere) and that simulates pressure measurements as if it were connected to real pressure sensors [like this one](http://a.co/fDYtNr3).
The implementation is decoupled enough to allow an easy replacement of the simulated values by actual values coming from sensors.

It also takes into consideration the real life need for automatic **on-boarding** procedures for commercial IoT solutions which are satisfied by the [SFR-lambda-data-access-provisioning application](https://github.com/mllanes/SFR-lambda-data-access-provisioning.git)

#### How are those pressure values *"simulated"*?

Air flow across an HVAC Air Filter follows the [Bernoulli's principle](https://en.wikipedia.org/wiki/Bernoulli%27s_principle): 

*"...an increase in the speed of a fluid occurs simultaneously with a decrease in pressure or a decrease in the fluid's potential energy..."*

The equation that derives from this principle and reasonable assumptions, are the basis for the simulated values. Details about the implementation of the Bernoulli's equation [can be found in the Bernoullis class file](https://github.com/mllanes/SFR-device/blob/master/lib/Bernoullis.js)

The simulated values also take into consideration the progressive, delayed, non linear and asymptotic clogging of an HVAC Air Filter under normal conditions 

### What do I need to run this?

* Node.JS

### How do I start *"collecting"* data samples?:

    npm install --production

**Note:** You are going to need now the **SFRApiBaseURL** variable that was produced during the deployment of the [SFR-lambda-data-access-provisioning application](https://github.com/mllanes/SFR-lambda-data-access-provisioning.git).
I would look like this:
                                                                                                                                                                                                                                           
    https://xxxx.execute-api.{your_region}.amazonaws.com/dev
    
#### Simulating an HVAC Air Filter clogging progressively (it would reach the critic point in a couple minutes so we can get the alert fast):
  
    SFRApiBaseURL={SFRApiBaseURL} npm run NormalWear 

#### Simulating an HVAC Air Filter with a drastic and sudden pressure drop:

    SFRApiBaseURL={SFRApiBaseURL} npm run DrasticPressureDrop

#### Simulating a broken or non functional HVAC Air Filter:

    SFRApiBaseURL={SFRApiBaseURL} npm run NoAirFilter

