// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-west-2'})

// Declare local variables
const ec2 = new AWS.EC2()

function listInstances () {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data.Reservations.reduce((i, r) => {
          return i.concat(r.Instances)
        }, []))
      } 
    })
  })
}

function terminateInstance (instanceId) {
  const params = {
    InstanceIds:[
      'i-0de04367b2ed27fd9'
    ]
  }
  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

listInstances()
.then(data => console.log(data))
// terminateInstance('i-0de04367b2ed27fd9')
//  .then(data => console.log(data))
