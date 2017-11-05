'use strict'

/* global describe it expect */

require('rootpath')()
require('jasmine-expect')
const Sensor = require('lib/Sensor')

describe(`Bernoulli's data generation`, () => {
  it('should generate static pressure values in a non linear, asymptotic and decreasing function of the time ', () => {
    const sensorId = 123
    const sensor = new Sensor(sensorId)
    const sample = sensor.getSample()
    const props = ['serialNumber', 'collectedAt', 'pressure']
    expect(sample).toBeObject()
    props.forEach(prop => expect(sample.hasOwnProperty(prop)).toBeTrue())
  })
})
