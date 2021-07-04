// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

// Declare local variables
const apig = new AWS.APIGateway()
const apiId = 'hcttlfmekc'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  const params = {
    restApiId: apiId,
    stageName: stageName
  }

  return new Promise((resolve, reject) => {
    apig.createDeployment(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
