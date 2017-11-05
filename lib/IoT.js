'use strict'

const Device = require('aws-iot-device-sdk').device
const constants = require('lib/config/constants')

class Iot {
  constructor (privateKeyPath, certPath, caPath, clientId) {
    const options = {
      keyPath: privateKeyPath,
      certPath: certPath,
      caPath: caPath,
      clientId: clientId,
      baseReconnectTimeMs: constants.IotDevice.baseReconnectTimeMs,
      keepalive: constants.IotDevice.keepAlive,
      protocol: constants.IotDevice.protocol,
      host: process.env.IOT_ENDPOINT,
      debug: process.env.DEBUG || false
    }

    this.device = Device(options)
  }

  publish (topic, data) {
    data = JSON.stringify(data, null, 2)
    this.device.publish(topic, data)
    console.log(`Data sent:`, data)
  }
}

module.exports = Iot
