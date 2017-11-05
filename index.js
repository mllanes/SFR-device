'use strict'

require('rootpath')()
const Sensor = require('lib/Sensor')
const sensor = new Sensor()
const Provisioning = require('lib/Provisioning')
const IoT = require('lib/IoT')
const constants = require('lib/config/constants')

if (!process.env.SFRApiBaseURL) {
  console.error('Missing definition of the SFRApiBaseURL environment variable')
  process.exit(1)
}

Provisioning.getConfig(process.env.SFRApiBaseURL)
  .then(res => {
    const IoTClient = new IoT(res.privateKeyPath, res.certPemPath, res.rootCAPath, res.clientId)
    collectSample(IoTClient, process.argv[2])
  })

function collectSample (IoTClient, type) {
  setTimeout(() => {
    const sample = sensor.getSample()

    /**
     * Simulated anomalies
     * - Drastic pressure drop because of broken sensor or the air filter got totally clogged or the air duct got totally obstructed
     * - There is no filter or the filter broke and the air if flowing directly without resistance
     */
    switch (type) {
      case 'DrasticPressureDrop':
        sample.pressure = 500
        break

      case 'NoAirFilter':
        sample.pressure = constants.Bernoullis.atmosphericPressure
        break

      default:
        break
    }

    IoTClient.publish(constants.IoTTopic, sample)
    collectSample(IoTClient, type)
  }, randomDelay(1000, 5000))
}

function randomDelay (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
