'use strict'

module.exports = {

  veriSignRootCAUri: 'https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem',

  IoTTopic: 'SFR-SENSOR-DATA-TOPIC',

  Bernoullis: {
    /**
     * in ms
     */
    initialDelayBeforeFilterDegradation: 10000,

    /**
     * Atmospheric pressure. Standard value is 101325 Pascal (10332 mmH2O)
     * 1 Pa = 0.10197162129779 mmH2O
     */
    atmosphericPressure: 10332,

    /**
     *
     * According to the West Midlands Public Health Observatory (UK), an adequate standard of warmth is 21 °C for a living room
     * At that temperature, the air density is approximately 1.2 kg/m3
     *
     */
    airDensity: 1.2,

    /**
     * The "Air Conditioning Contractors of America" recommends 600 feet/min in branch ducts so we are going to assume this value (in meters per second)
     */
    factoryAirVelocityAcrossFilter: 3.05,

    /**
     * Almost zero; the filter can't pass barely any air flow through it
     */
    fullyCloggedAirIntakeVelocity: 0.05
  },

  IotDevice: {
    baseReconnectTimeMs: 4000,
    keepAlive: 30,
    protocol: 'mqtts'
  }
}
