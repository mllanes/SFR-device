'use strict'

const constants = require('lib/config/constants')

/**
 * Implementation of the Bernoulli's equation
 * Given that air mis ust another fluid; this equation takes into consideration the pressure, fluid speed, and height above an arbitrary level
 * Used to estimate the difference in fluid pressure between two points.
 *
 * More info can be found here: https://www.khanacademy.org/science/physics/fluids/fluid-dynamics/a/what-is-bernoullis-equation
 *
 */
class Bernoullis {
  constructor () {
    this.startTime = Date.now()
  }

  pressureAcrossAirFilter () {
    /**
     *
     * Note that the pressure values are given in mmH2O (Millimetres of Water Column). This is recommended to ventilation systems and small variation measurements
     * More info can be found here: https://www.sensorsone.com/mmh2o-millimetres-water-column-4-deg-c-pressure-unit/
     *
     * ----------
     *
     * Full Bernoulli's equation:
     *
     * P1 + 0.5 * d * (v1) ^ 2 + d * g * h1 = P2 + 0.5 * d * (v2) ^ 2 + d * g * h2
     *
     *
     * Considerations:
     * - the "1" sub-index refers to measurements InFront of the filter and the "2" sub-index refers to the measurements ACROSS the filter
     * - Air is not compressed
     * - Air density is the same on both sides
     * - Because the sensors are around the filter and close enough to each other, we can consider that their respective height values (h1, h2) are the same and arbitrary
     * - Also, because of the same height, the gravity value (g) is the same on both sides of the equation
     *
     * After these considerations, the equation becomes:
     *
     * P1 + 0.5 * d * (v1) ^ 2  = P2 + 0.5 * d * (v2) ^ 2
     *
     * So the pressure across the filter would be:
     *
     * P2 = P1 + 0.5 * d * (v1) ^ 2 - 0.5 * d * (v2) ^ 2
     *
     */

    let time = 0

    /**
     * The initialDelayBeforeFilterDegradation holds the value in ms for which we are going to consider the air filter "good"
     */
    if (Date.now() - this.startTime > constants.Bernoullis.initialDelayBeforeFilterDegradation) {
      time += (Date.now() - this.startTime) / 1000
    }

    /**
     * To simulate an air filter that is progressively degrading, we produce an decreasing air velocity in front of the filter as an arbitrary decreasing, non linear and asymptotic function of the time
     * The reason this works is because in real life, the pressure across the filter would decrease and in order to compensate for it, the air intake velocity has to drop
     * This function would go from normal air intake velocity to almost no air intake (filter fully clogged)
     * In simple words: "The dirtier the air filter is, the lower the air intake velocity is"
     *
     */
    const airVelocityInFrontOfFilter = Math.exp(-0.01 * time + 0.05) + constants.Bernoullis.fullyCloggedAirIntakeVelocity
    const pressureAcrossAirFilter = constants.Bernoullis.atmosphericPressure + (0.5 * constants.Bernoullis.airDensity * Math.pow(airVelocityInFrontOfFilter, 2)) - (0.5 * constants.Bernoullis.airDensity * Math.pow(constants.Bernoullis.factoryAirVelocityAcrossFilter, 2))
    return pressureAcrossAirFilter.toFixed(3)
  }
}

module.exports = Bernoullis
