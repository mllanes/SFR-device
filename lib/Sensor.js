'use strict'

const Bernoullis = require('lib/Bernoullis')
const onBoarding = require('on-boarding-config.json')

/**
 * Interfaces with the real word and collects the static differential pressure across an HVAC air filter
 */
class Sensor {
  constructor () {
    this.measurement = new Bernoullis()
  }

  getSample () {
    return {
      serialNumber: onBoarding.SerialNumber,
      customerId: onBoarding.CustomerId,
      collectedAt: Date.now(),
      pressure: parseFloat(this.measurement.pressureAcrossAirFilter())
    }
  }
}

module.exports = Sensor
