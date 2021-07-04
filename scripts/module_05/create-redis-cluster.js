// Imports
const { EC2 } = require('aws-sdk')
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-west-2' })
const ec = new AWS.ElastiCache()

helpers.createSecurityGroup('hamster_redis_sg', 6379)
.then(sgId => createRedisCluster('hamster', sgId))
.then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  const params = {
    CacheClusterId: clusterName,
    CacheNodeType: 'cache.t2.micro',
    Engine: 'redis',
    NumCacheNodes: 1, // must bew 1 for redis
    SecurityGroupIds: [sgId]
  }

  return new Promise((resolve, reject) => {
    ec.createCacheCluster(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
