// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-0d752532a9b075d4a'
const instanceId = 'i-023d8727c679f12de'

// detachVolume(volumeId)
// .then(() => 
attachVolume(instanceId, volumeId)//)

function detachVolume (volumeId) {
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  const params = {
    VolumeId: volumeId,
    InstanceId: instanceId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
