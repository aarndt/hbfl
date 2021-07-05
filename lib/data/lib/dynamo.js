const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

const client = new AWS.DynamoDB.DocumentClient()

// scan - 1 MB at a time
// need to do multiple scans to get all the data

function getAll (tableName) {
  const params = {
    TableName: tableName
  }

  return new Promise((resolve, reject) => {
    client.scan(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.Items)
    })
  })
}

function get (tableName, id) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': +id
    }
  }

  return new Promise((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.Items[0])
    })
  })
}

function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}
