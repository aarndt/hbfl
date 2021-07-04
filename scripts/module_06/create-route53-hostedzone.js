// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-weest2-2' })

// Declare local variables
const route53 = new AWS.Route53()
const hzName = 'apadax.com'

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  const params = {
    Name: hzName,
    CallerReference: `${Date.now()}`
  }

  return new Promise((resolve, reject) => {
    route53.createHostedZone(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// Id: '/hostedzone/Z10113297519WOFEXRBS'