'use strict'

const Request = require('request-promise')
const onBoarding = require('on-boarding-config.json')
const fs = require('fs-extra')
const constants = require('lib/config/constants')
const path = require('path')

class Provisioning {
  static getConfig (SFRApiBaseURL) {
    const certPemPath = path.resolve(`${__dirname}/../.certificatePem`)
    const privateKeyPath = path.resolve(`${__dirname}/../.privateKey`)
    const rootCA = path.resolve(`${__dirname}/../.root-CA.crt`)
    const envFilePath = path.resolve(`${__dirname}/../.env`)

    return Promise.all([
      fs.pathExists(certPemPath),
      fs.pathExists(privateKeyPath),
      fs.pathExists(rootCA),
      fs.pathExists(envFilePath)
    ])
      .then(pathExists => {
        if (!pathExists[0] || !pathExists[1] || !pathExists[2] || !pathExists[3]) {
          const options = {
            method: 'POST',
            uri: `${SFRApiBaseURL}/files`,
            headers: {
              'Content-Type': 'application/json',
              'x-serial-number': onBoarding.SerialNumber,
              'x-customer-id': onBoarding.CustomerId
            },
            json: true
          }

          return Request(options)
            .then(res => Promise.all([
              fs.outputFile(certPemPath, res.certificatePem),
              fs.outputFile(privateKeyPath, res.privateKey),
              fs.outputFile(`${__dirname}/../.env`, `IOT_ENDPOINT=${res.endpoint}`),
              Request({
                method: 'GET',
                uri: constants.veriSignRootCAUri
              })
                .then(cert => fs.outputFile(rootCA, cert))
            ]))
            .then(() => require('dotenv').config())
            .then(() => {
              return {
                certPemPath: certPemPath,
                privateKeyPath: privateKeyPath,
                rootCAPath: rootCA,
                clientId: onBoarding.SerialNumber
              }
            })
        }

        console.log(`Reusing existing cert, key and env config...`)
        require('dotenv').config()
        return Promise.resolve({
          certPemPath: certPemPath,
          privateKeyPath: privateKeyPath,
          rootCAPath: rootCA,
          clientId: onBoarding.SerialNumber
        })
      })
  }
}

module.exports = Provisioning
