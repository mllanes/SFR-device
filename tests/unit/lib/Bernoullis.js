'use strict'

/* global describe it expect */

require('rootpath')()
require('jasmine-expect')
const Bernoullis = require('lib/Bernoullis')
const constants = require('lib/config/constants')

describe(`Bernoulli's data generation`, () => {
  it('should generate static pressure values', done => {
    const measurement = new Bernoullis()
    measurement.startTime = 0
    const value = measurement.pressureAcrossAirFilter()
    /**
     * We can't have a pressure across the filter higher than the atmospheric one; it has to be lower otherwise there is no air flow
     */
    expect(value).toBeLessThan(constants.Bernoullis.atmosphericPressure)
    expect(value).toBeGreaterThan(0)
    done()
  })
})
